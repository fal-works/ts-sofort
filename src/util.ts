import { performance } from "perf_hooks";

const prefix = "[ts-node-fast] ";

/**
 * Create a logging function which also prints elapsed time from the last call.
 */
export const createTimeLogger = (
  entryPoint: string
): ((message: string) => void) => {
  let lastTime = performance.now();

  return (message: string): void => {
    const currentTime = performance.now();
    const duration = currentTime - lastTime;

    process.stdout.write(prefix);
    process.stdout.write(entryPoint);
    process.stdout.write(" > ");
    process.stdout.write(message);
    process.stdout.write(` (${Math.round(duration)} ms)\n`);

    lastTime = currentTime;
  };
};
