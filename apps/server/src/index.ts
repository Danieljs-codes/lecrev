import { Effect } from 'effect';

const randomNumber = Effect.sync(() => Math.random());

console.log(Effect.runSync(randomNumber));
