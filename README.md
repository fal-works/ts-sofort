# ts-sofort

Run [TypeScript](https://www.typescriptlang.org/) code on [Node.js](https://nodejs.org/) quickly.

- It first tranpiles and bundles your TypeScript code using [esbuild](https://esbuild.github.io/) (which should be quite fast), then immediately runs the output JavaScript code.
- It also prints the time taken for both code conversion and execution. If your entry point has a default export of any `Promise` type, `ts-sofort` awaits until the `Promise` is resolved.

## API

```js
import { run } from "ts-sofort";

const entryPoint = "path/to/your/script.ts";
const options = {};         // not required
const esbuildOptions = {};  // not required

run(entryPoint, options, esbuildOptions);
```


## CLI

Use `ts-sofort` command and pass the entry point filepath of your TypeScript code.

E.g. in your `package.json`, something like this:

```json
{
  "scripts": {
    "my-script": "ts-sofort my-script.ts",
  }
}
```
