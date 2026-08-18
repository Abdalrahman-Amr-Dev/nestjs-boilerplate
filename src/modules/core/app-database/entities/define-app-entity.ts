import {
  EntitySchema,
  type EntityCtor,
  type EntitySchemaMetadata,
} from '@mikro-orm/core';
import { AppRepository } from '../repositories/app.repository';
import { AppBaseEntity } from './app-base.entity';
import { appBaseEntitySchema } from './app-base.schema';

export type AppEntitySchemaMetadata<
  Entity extends AppBaseEntity,
  Class extends EntityCtor<Entity> = EntityCtor<Entity>,
> = Omit<
  EntitySchemaMetadata<Entity, AppBaseEntity, Class>,
  'abstract' | 'extends'
>;

/**
 * Create a domain `EntitySchema` extended from the shared `AppBaseEntity`
 * schema and served by the custom `AppRepository`.
 *
 * Pass the linked `class` so feature modules can register the entity with
 * `AppDatabaseModule.forFeature([SomeEntity])` and inject it via
 * `@InjectRepository(SomeEntity)`.
 *
 * @example
 * export const UserSchema = defineAppEntitySchema<User>({
 *   name: 'User',
 *   class: User,
 *   properties: {
 *     name: { type: 'string' },
 *     email: { type: 'string', unique: true },
 *   },
 * });
 */
export function defineAppEntitySchema<
  Entity extends AppBaseEntity,
  Class extends EntityCtor<Entity> = EntityCtor<Entity>,
>(
  meta: AppEntitySchemaMetadata<Entity, Class>,
): EntitySchema<Entity, AppBaseEntity, Class> {
  const { class: entityClass, ...rest } = meta;
  const schema = new EntitySchema<Entity, AppBaseEntity, Class>({
    ...rest,
    ...(entityClass ? { class: entityClass } : {}),
    extends: appBaseEntitySchema,
  } as unknown as EntitySchemaMetadata<Entity, AppBaseEntity, Class>);
  schema.setCustomRepository(() => AppRepository);
  return schema;
}
