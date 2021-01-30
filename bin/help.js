const printCommandUsage = () => {
  console.log("ts-sofort [options] <filepath>");
  console.log("ts-sofort < -h | --help | -v | --version >");
};

const printOptions = () => {
  const argMap = {
    "external <pattern>":
      "Regular expression string (escaped) for external module paths. (optional)",
    preserveTmp: "Do not remove temporal file. (optional)",
  };
  for (const [name, description] of Object.entries(argMap))
    console.log(`--${name.padEnd(20)}${description}`);
};

/**
 * @param {string} name
 * @param {() => void} printCallback
 */
const printBlock = (name, printCallback) => {
  console.log(`${name}:`);
  console.group();
  printCallback();
  console.groupEnd();
};

export const help = () => {
  printBlock("Command", printCommandUsage);
  printBlock("options", printOptions);
  console.log();
};
