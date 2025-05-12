import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    module: true,
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  target: "node",
  mode: "production",
};
