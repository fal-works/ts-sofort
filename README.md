# ts-sofort

Run [TypeScript](https://www.typescriptlang.org/) code on [Node.js](https://nodejs.org/) quickly.

It first tranpiles and bundles your TypeScript code using [esbuild](https://esbuild.github.io/) (which should be quite fast), then immediately runs the output JavaScript code.


## API

```js
import { run } from "ts-sofort";

const entryPoint = "path/to/your/script.ts";
const options = {};         // not required
const esbuildOptions = {};  // not required

run(entryPoint, options, esbuildOptions);
```
