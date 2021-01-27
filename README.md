# ts-sofort

Run [TypeScript](https://www.typescriptlang.org/) code on [Node.js](https://nodejs.org/) quickly.

It first tranpiles and bundles your TypeScript code using [esbuild](https://esbuild.github.io/), then immediately runs the output code.


## API

```js
import { run } from "ts-sofort";

const options = {};        // not required
const esbuildOptions = {}; // notrequired

run("scripts/dev.ts", options, esbuildOptions);
```
