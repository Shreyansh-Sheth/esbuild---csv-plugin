import * as esbuild from "esbuild";
import CSV_PLUGIN from "./plugins/CSV-plugin.mjs";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/out.js",
  plugins: [CSV_PLUGIN],
});
