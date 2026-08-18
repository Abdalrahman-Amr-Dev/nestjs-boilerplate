import {
  EntityRepository,
  type EntityData,
  type FilterQuery,
  type FindOptions,
  type QueryOrderMap,
} from '@mikro-orm/core';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export interface PaginatedResult<Entity> {
  items: Entity[];
  pageInfo: {
    limit: number;
    page: number;
    hasPrevious: boolean;
    hasNext: boolean;
    totalCount: number;
  };
}

/**
 * Custom base repository extending MikroORM's `EntityRepository`.
 *
 * Replaces the old TypeORM `AppRepository`; registers via
 * `schema.setCustomRepository(() => AppRepository)` (see `defineAppEntitySchema`),
 * so `@InjectRepository(SomeEntity)` returns an `AppRepository` instance.
 *
 * The casts below are needed only because this repository is generic
 * (`Entity extends object`) — MikroORM's index-query (`using`) types cannot be
 * resolved for a non-concrete entity type.
 */
export class AppRepository<
  Entity extends object,
> extends EntityRepository<Entity> {
  /** Find one entity matching `where` or throw `NotFoundException`. */
  override async findOneOrFail(where: any, options?: any): Promise<any> {
    const result = await this.findOne(where, options);
    if (!result) {
      throw new NotFoundException(`${this.getEntityName()} not found`);
    }
    return result;
  }

  /** Throw `ForbiddenException` when an entity matching `where` exists. */
  async findOneAndFail<
    Hint extends string = never,
    Fields extends string = never,
  >(
    where: FilterQuery<Entity>,
    options?: FindOptions<Entity, Hint, Fields>,
  ): Promise<void> {
    const result = await this.findOne(where, options as never);
    if (result) {
      throw new ForbiddenException(`${this.getEntityName()} already exists`);
    }
  }

  /** Find entities with pagination, sorting, population, and column selection. */
  async findPaginated(
    where?: FilterQuery<Entity>,
    orderBy?: QueryOrderMap<Entity> | QueryOrderMap<Entity>[],
    page = 1,
    limit = 15,
    populate?: string[],
    fields?: string[],
  ): Promise<PaginatedResult<Entity>> {
    const offset = (page - 1) * limit;
    const [items, total] = await this.findAndCount(
      (where ?? {}) as never,
      {
        populate: populate as FindOptions<Entity>['populate'],
        orderBy,
        limit,
        offset,
        fields,
      } as FindOptions<Entity>,
    );

    return {
      items: items,
      pageInfo: {
        limit,
        page,
        hasPrevious: page > 1,
        hasNext: offset + limit < total,
        totalCount: total,
      },
    };
  }

  /** Bulk update entities matching `where`; returns the number of affected rows. */
  updateMany(
    where: FilterQuery<Entity>,
    input: EntityData<Entity>,
  ): Promise<number> {
    return this.nativeUpdate(where, input);
  }

  /** Soft-delete entities matching `where` (sets `deletedAt`). */
  softDeleteWithUpdate(
    where: FilterQuery<Entity>,
    input: EntityData<Entity>,
  ): Promise<number> {
    return this.nativeUpdate(where, { ...input, deletedAt: new Date() });
  }

  /** Create and persist a single entity. */
  async createOne(input: EntityData<Entity>): Promise<Entity> {
    const entity = this.create(input, { partial: true });
    await this.getEntityManager().flush();
    return entity;
  }

  /** Bulk create and persist multiple entities in a single statement. */
  async bulkCreate(inputs: EntityData<Entity>[]): Promise<Entity[]> {
    const entities = inputs.map((input) =>
      this.create(input, { partial: true }),
    );
    await this.getEntityManager().flush();
    return entities;
  }

  /** Update an existing managed model instance and flush it. */
  async updateOneFromExistingModel(
    model: Entity,
    input: Partial<Entity>,
  ): Promise<Entity> {
    Object.assign(model, input);
    await this.getEntityManager().flush();
    return model;
  }

  /** Delete entities matching `where`; returns the number of affected rows. */
  deleteMany(where: FilterQuery<Entity>): Promise<number> {
    return this.nativeDelete(where);
  }
}
