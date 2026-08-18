import type { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { defineConfig } from '@mikro-orm/postgresql';
import { config } from 'dotenv';
import { get } from 'env-var';
import { join } from 'path';
import { appBaseEntitySchema } from './entities/app-base.schema';

config();

/**
 * MikroORM database configuration (PostgreSQL driver).
 *
 * Merges the old TypeORM `typeorm.config.ts` / `app.datasource.ts` (which
 * lived in `src/config/database`) into the core `app-database` module.
 */
export const MikroOrmConfig: MikroOrmModuleOptions = {
  ...defineConfig({
    host: get('DB_HOST').required().asString(),
    port: get('DB_PORT').required().asIntPositive(),
    user: get('DB_USERNAME').required().asString(),
    password: get('DB_PASSWORD').required().asString(),
    dbName: get('DB_NAME').required().asString(),
    driverOptions: {
      // Passed directly to the pg connection pool client options.
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      keepAlive: true,
    },
    entities: [appBaseEntitySchema],
    discovery: {
      /**
       * A fresh boilerplate registers only the abstract `AppBaseEntity` (or no
       * entities yet). MikroORM normally throws "No entities found" /
       * "Only abstract entities were discovered" in that state, so validation
       * is relaxed. The abstract base stays registered and is inlined into
       * concrete entities defined via `defineAppEntitySchema` as they appear.
       */
      warnWhenNoEntities: false,
    },
    pool: {
      min: 3,
      max: 30,
      idleTimeoutMillis: 15_000,
    },
    migrations: {
      path: join(__dirname, 'migrations'),
      glob: '!(*.d).{js,ts}',
    },
    debug: process.env.NODE_ENV !== 'production',
  }),
  /**
   * Per the official NestJS MikroORM docs, `autoLoadEntities: true` lets each
   * feature module register its entities via `MikroOrmModule.forFeature()` and
   * have them discovered automatically (this also avoids webpack/glob issues).
   * Base entities must still be listed in `entities` and never in `forFeature`.
   */
  autoLoadEntities: true,
  /**
   * The NestJS integration registers a request-scoped `EntityManager` fork per
   * HTTP request. Kept explicit so the "one request, one EntityManager"
   * behaviour documented for `@CreateRequestContext()`/`@EnsureRequestContext()`
   * is visible in one place.
   */
  registerRequestContext: true,
};
