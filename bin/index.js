import { run } from "../lib/index.js";

const arg = process.argv[2];

if (!arg || arg === "--help") {
  console.log("Command usage:\n  ts-node-fast (filename)\n");
  process.exit(0);
}

run(arg).catch((err) => {
  console.error(err);
  process.exit(1);
});
