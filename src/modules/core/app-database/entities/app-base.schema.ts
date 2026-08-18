import { EntitySchema } from '@mikro-orm/core';
import { AppBaseEntity } from './app-base.entity';

/**
 * Abstract `EntitySchema` for `AppBaseEntity`.
 *
 * Marking it `abstract` makes MikroORM inline these properties into every
 * concrete entity schema that extends it (`defineAppEntitySchema`). The
 * `id` defaults to Postgres 18's native `uuidv7()`.
 */
export const appBaseEntitySchema = new EntitySchema<AppBaseEntity>({
  name: 'AppBaseEntity',
  abstract: true,
  properties: {
    id: {
      type: 'uuid',
      primary: true,
      defaultRaw: 'uuidv7()',
    },
    createdAt: {
      type: 'timestamptz',
      onCreate: () => new Date(),
    },
    updatedAt: {
      type: 'timestamptz',
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
    deletedAt: {
      type: 'timestamptz',
      nullable: true,
    },
  },
});
