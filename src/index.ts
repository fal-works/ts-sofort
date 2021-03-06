import * as fs from "fs";
import * as path from "path";
import esbuild from "esbuild";
import { regexpExternals } from "@fal-works/esbuild-plugin-regexp-externals";
import { createTimeLogger, getCoalescedValue } from "./util.js";
import { defaultOptions } from "./options.js";

import type { Options, EsbuildOptions } from "./options";

/**
 * Target environment to be passed to `esbuild.build()`.
 */
const target = `node${process.version.slice(1)}`;

/**
 * Transpile and bundle given source code files and then run them immediately.
 *
 * @param entryPoint Filepath to the entry point of source code.
 * @param esbuildOptions esbuild options.
 */
export const run = async (
  entryPoint: string,
  options?: Options,
  esbuildOptions: EsbuildOptions = {}
): Promise<void> => {
  const log = createTimeLogger(entryPoint);

  const getOption = getCoalescedValue(options || {}, defaultOptions);
  const externalModule = getOption("externalModule");
  const onWarn = getOption("onWarn");
  const preserveTmpFile = getOption("preserveTmpFile");

  const file = await fs.promises.open(entryPoint, "r"); // throw if absent
  await file.close();
  const outfile = `${entryPoint}.tmp.mjs`;

  const buildResult = await esbuild.build({
    target,
    bundle: true,
    outfile,
    platform: "node",
    format: "esm",
    entryPoints: [entryPoint],
    ...esbuildOptions,
    plugins: [regexpExternals(externalModule)].concat(
      esbuildOptions.plugins || []
    ),
  });
  buildResult.warnings.forEach(onWarn);
  const cleanup = () => fs.promises.unlink(outfile);

  log("Conversion complete.");

  try {
    const file = "file:///" + path.resolve(outfile);
    const { default: exported } = (await import(file)) as { default?: unknown };
    await Promise.resolve(exported);
  } catch (err: unknown) {
    if (!preserveTmpFile) await cleanup();
    throw err;
  }

  log("Execution complete.");

  if (!preserveTmpFile) await cleanup();
};
