import fs from "fs";
import path from "path";

function getJsonFile<T>(pathName: string) {
  const patentsFile = path.join(
    process.cwd(),
    "public",
    "json",
    `${pathName}.json`
  );
  const data: T = JSON.parse(fs.readFileSync(patentsFile, "utf-8"));
  return data;
}

export default getJsonFile;
