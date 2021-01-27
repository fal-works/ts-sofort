import esbuild from "esbuild";

/**
 * Options for ts-node-fast.
 */
export type Options = {
  /** Defaults to `console.warn()`. */
  onWarn?: (message: esbuild.Message) => void;

  /**
   * If set to `true`, the transpiled and bundled JavaScript code (`*.tmp.js`)
   * will not be removed after the execution.
   */
  preserveTmpFile?: boolean;
};

/**
 * Options for esbuild.
 */
export type EsbuildOptions = Pick<
  esbuild.BuildOptions,
  /* CommonOptions */
  | "minify"
  | "jsxFactory"
  | "jsxFragment"
  | "define"
  | "pure"
  | "logLevel"
  | "errorLimit"
  /* BuildOptions */
  | "external"
  | "loader"
  | "resolveExtensions"
  | "mainFields"
  | "tsconfig"
  | "publicPath"
  | "inject"
  | "stdin"
  | "plugins"
>;
