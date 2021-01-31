const printCommandUsage = () => {
  console.log("ts-sofort [options] <filepath>");
  console.log("ts-sofort < -h | --help | -v | --version >");
};

const printOptions = () => {
  const options = [
    {
      name: "external <pattern>",
      description:
        "Regular expression string (escaped) for external module paths. (optional)",
    },
    {
      name: "preserveTmp",
      description: "Do not remove temporal file. (optional)",
    },
  ];
  const maxLen = Math.max(...options.map((option) => option.name.length));
  for (const option of options)
    console.log(`--${option.name.padEnd(maxLen + 2)}${option.description}`);
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
