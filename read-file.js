import path from "path";
import * as fs from "fs";

const filePath = process.argv[2];
let data = null;

data = fs.readFileSync(path.join(filePath)).toString();

export { data };
