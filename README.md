# ts-node-fast

Run [TypeScript](https://www.typescriptlang.org/) code on [Node.js](https://nodejs.org/), transpiling with [esbuild](https://esbuild.github.io/).

May or may not be fast. Don't know.


## API

```js
import { exec } from "@fal-works/ts-node-fast";

const options = {};        // not required
const esbuildOptions = {}; // notrequired

run("scripts/dev.ts", options, esbuildOptions);
```
