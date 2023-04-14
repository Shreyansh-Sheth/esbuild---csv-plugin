import * as esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs";
import csv from "csvtojson";
const cmsRegex = /\.csv$/i;
const namespace = "CSV-Plugin";
let CSV_PLUGIN = {
  name: namespace,
  setup(build) {
    // On Files Name End With .CMS or ignoring letter case
    build.onResolve({ filter: cmsRegex }, (args) => {
      return {
        path: path.resolve(args.resolveDir, args.path),
        namespace: namespace,
      };
    });
    build.onLoad({ filter: cmsRegex }, async (args) => {
      try {
        console.log("Loading CSV File: ", args.path);
        let text = await fs.readFileSync(args.path, "utf8");
        // console.log(text);
        const json = await csv().fromString(text);

        return {
          contents: JSON.stringify(json),
          loader: "json",
          //   namespace: namespace,
        };
      } catch (e) {
        console.log(e);
      }
    });
  },
};

//

export default CSV_PLUGIN;
