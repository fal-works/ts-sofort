import esbuild from "esbuild";

/**
 * Options for ts-node-fast.
 */
export type Options = {
  /**
   * Regular expression that match module paths to be marked as external
   * (not bundled). Defaults to `/^[^\\.]/` so that only the modules with
   * relative paths (starts with a dot) will be bundled.
   */
  externalModule?: RegExp;

  /** Defaults to a function that calls `console.warn()`. */
  onWarn?: (message: esbuild.Message) => void;

  /**
   * If set to `true`, the transpiled and bundled JavaScript code (`*.tmp.js`)
   * will not be removed after the execution.
   */
  preserveTmpFile?: boolean;
};

/**
 * Default values of options.
 */
export const defaultOptions: Readonly<Required<Options>> = Object.freeze({
  externalModule: /^[^\\.]/,
  onWarn: (s: unknown) => console.warn(s),
  preserveTmpFile: false,
});

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
