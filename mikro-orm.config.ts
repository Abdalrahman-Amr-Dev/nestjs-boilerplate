import { defineConfig } from '@mikro-orm/postgresql';
import { MikroOrmConfig } from './src/modules/core/app-database/mikro-orm.config';

/**
 * MikroORM CLI configuration (used by `npx mikro-orm migration:*`).
 *
 * The CLI does not honour `autoLoadEntities`, so glob-based discovery is added
 * here following the official NestJS MikroORM docs:
 *  - `entities`   -> compiled output (used when the CLI runs from `dist`)
 *  - `entitiesTs` -> TypeScript sources (used in dev, where `preferTs` is on)
 *
 * Both globs pick up every `*.entity.ts` defined via `defineAppEntitySchema`.
 */
export default defineConfig({
  ...MikroOrmConfig,
  entities: [...(MikroOrmConfig.entities ?? []), './dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
});