import { performance } from "perf_hooks";

const prefix = "[ts-sofort] ";

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

/**
 * @returns `value` if not undefined, otherwise `defaultValue`.
 */
export const coalesce = <T>(value: T | undefined, defaultValue: T): T =>
  value === undefined ? defaultValue : value;

/**
 * Creates a function which receives any property key and returns the value
 * that has been verified as not `undefined`.
 */
export const getCoalescedValue = <T>(
  srcObject: T,
  defaultObject: Required<T>
) => {
  return <K extends keyof T>(key: K): Required<T>[K] =>
    coalesce(srcObject[key], defaultObject[key]);
};
