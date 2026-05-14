import { Config, Context, Layer } from 'effect';

import { PgClient } from '@effect/sql-pg';
import * as PgDrizzle from 'drizzle-orm/effect-postgres';
import { relations } from '#schema';

export const Pg = PgClient.layerConfig({
  url: Config.redacted('PG_URL'),
});

export class Db extends Context.Service<Db>()('Db', {
  make: PgDrizzle.make({ relations }),
}) {
  static layer = Layer.effect(this, this.make).pipe(
    Layer.provide(PgDrizzle.DefaultServices),
    Layer.provide(Pg),
  );
}
