import type { EntityName } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { MikroOrmConfig } from './mikro-orm.config';

/**
 * AppDatabaseModule — the single core database module.
 *
 * Merges the old `src/config/database` (datasource + TypeORM config) and
 * `src/modules/core/app-database` (module, base entity, custom repository)
 * into one module backed by **MikroORM** instead of TypeORM.
 *
 * - `forRoot()`  — registers the global MikroORM connection. `forRoot` resolves
 *   to `MikroOrmCoreModule` (marked `@Global`), so `MikroORM` / `EntityManager`
 *   are injectable project-wide without re-exporting anything here.
 * - `forFeature(entities)` — registers `AppRepository` instances for entities,
 *   injectable via `@InjectRepository(Entity)` (get the test mock token from
 *   `getRepositoryToken(Entity)`). Per the official docs, base entities must be
 *   listed in `forRoot()` and must **not** be passed to `forFeature()`. Because
 *   `AppRepository` is a single generic repository shared by every entity, the
 *   documented "inject the custom repository class directly" pattern would be
 *   ambiguous across entities — use `@InjectRepository(Entity)` instead.
 */
@Module({})
export class AppDatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: AppDatabaseModule,
      imports: [MikroOrmModule.forRoot(MikroOrmConfig)],
    };
  }

  static forFeature(entities: EntityName<any>[]): DynamicModule {
    return {
      module: AppDatabaseModule,
      imports: [MikroOrmModule.forFeature(entities)],
      exports: [MikroOrmModule],
    };
  }
}
