import * as fs from "fs";
import * as path from "path";
import esbuild from "esbuild";
import { regexpExternals } from "@fal-works/esbuild-plugin-regexp-externals";
import { createTimeLogger } from "./util.js";

import type { Options, EsbuildOptions } from "./options.js";

const absoluteAsExternal = regexpExternals(/^[^\\.]/);
const target = `node${process.version.slice(1)}`;

/**
 * Transpile and bundle given source code files and then run them immediately.
 *
 * @param entryPoint Filepath to the entry point of source code.
 * @param esbuildOptions esbuild options.
 */
export const run = async (
  entryPoint: string,
  options: Options = {},
  esbuildOptions: EsbuildOptions = {}
): Promise<void> => {
  const log = createTimeLogger(entryPoint);

  await fs.promises.open(entryPoint, "r"); // throw if absent
  const outfile = `${entryPoint}.tmp.mjs`;

  const buildResult = await esbuild.build({
    target,
    bundle: true,
    outfile,
    platform: "node",
    format: "esm",
    entryPoints: [entryPoint],
    ...esbuildOptions,
    plugins: [absoluteAsExternal].concat(esbuildOptions.plugins || []),
  });
  const onWarn = options.onWarn || ((s: unknown) => console.warn(s));
  buildResult.warnings.forEach(onWarn);
  const cleanup = () => fs.promises.unlink(outfile);

  log("Conversion complete.");

  try {
    await import("file:///" + path.resolve(outfile));
  } catch (err: unknown) {
    if (!options.preserveTmpFile) await cleanup();
    throw err;
  }

  log("Execution complete.");

  if (!options.preserveTmpFile) await cleanup();
};
