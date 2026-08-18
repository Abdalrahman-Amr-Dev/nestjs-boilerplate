/**
 * Base entity with common fields shared by all entities.
 *
 * The matching database schema is defined in `app-base.schema.ts` (abstract,
 * so it is inlined into every concrete entity that extends this class).
 * Note: the installed MikroORM v7 (7.1.x) does not ship the legacy `@Entity`
 * decorators, so entities are described with `EntitySchema` instead.
 */
export abstract class AppBaseEntity {
  /** Unique identifier (UUID). */
  id!: string;

  /** Timestamp when created. */
  createdAt!: Date;

  /** Timestamp when last updated. */
  updatedAt!: Date;

  /** Soft-delete timestamp (nullable). */
  deletedAt?: Date | null;

  static get permissionsTarget(): string {
    return this.name;
  }
}
