import mri from "mri";
import { help } from "./help.js";
import { run } from "../lib/index.js";
import packageInfo from "../package-info.js";

const args = mri(process.argv.slice(2), {
  alias: {
    help: "h",
    version: "v",
  },
});
const entryPoint = args._[0];

if (args.version) {
  console.log(`${packageInfo.name} v${packageInfo.version}\n`);
  process.exit(0);
}

if (args.help || !entryPoint) {
  help();
  process.exit(0);
}
if (1 < args._.length) {
  console.error(`Too many arguments: ${args._}`);
  process.exit(1);
}

const externalModule =
  args.external === undefined ? undefined : new RegExp(args.external);
const preserveTmpFile =
  args.preserveTmp === undefined ? undefined : args.preserveTmp !== undefined;

run(entryPoint, {
  externalModule,
  preserveTmpFile,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
