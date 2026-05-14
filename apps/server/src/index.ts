import { Context, Effect, Layer } from 'effect';

class FakeRedis {
  url: string;
  constructor(url: string) {
    this.url = url;
    console.log(`Connecting to Redis at ${url}`);
  }

  connect(): Promise<void> {
    console.log(`Connected to Redis at ${this.url}`);
    return Promise.resolve();
  }

  publish(channel: string, message: string): Promise<void> {
    console.log(`Publishing to ${channel}: ${message}`);
    return Promise.resolve();
  }
}

const make = Effect.gen(function* make() {
  const url = process.env['REDIS_URL'];

  const redis = new FakeRedis(String(url));

  yield* Effect.promise(() => redis.connect());

  return {
    publish: (channel: string, message: string) =>
      Effect.promise(() => redis.publish(channel, message)),
  };
});

export type RedisService = Effect.Success<typeof make>;

class Redis extends Context.Service<Redis, RedisService>()('Redis') {
  // static layer = Layer.effect(this)(make);
}

const RedisLayer = Layer.effect(Redis)(make);
console.log(RedisLayer);

const runtime = Effect.gen(function* runtime() {
  const redis = yield* Redis;
  yield* redis.publish('test', 'test');
}).pipe(Effect.provide(RedisLayer));

runtime.pipe(Effect.runFork);
