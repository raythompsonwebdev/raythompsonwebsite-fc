/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

/* eslint-disable no-console */

import jsf from "json-schema-faker";
import fs from "fs"; // imported from node.
import chalk from "chalk";
import { schema } from "./mockDataSchema";

// passed to json schemer faker via jsf().
const json = JSON.stringify(jsf(schema));

// eslint-disable-next-line consistent-return
fs.writeFile("./src/api/db.json", json, (err) => {
  if (err) {
    return console.log(chalk.red(err));
  }
  console.log(chalk.green("Mock data generated."));
});
