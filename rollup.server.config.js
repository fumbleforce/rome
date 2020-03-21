import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import builtins from "rollup-plugin-node-builtins";
import globals from 'rollup-plugin-node-globals';
import pkg from "./package.json";

const mode = process.env.NODE_ENV || "development";
const dev = mode === "development";

console.log("[Client] Mode", mode, dev);

export default {
  input: "src/server/index.js",
  output: {
    sourcemap: true,
    format: "cjs",
    name: "app",
    file: "dist/server.js",
    globals: {
      "socket.io": "socket.io",
      "sirv": "sirv",
      "polka": "polka",
      "compression": "compression",
      // "fs": "fs",
    }
  },
  plugins: [
    // eslint({ fix: true }),
    builtins(),
    globals(),
    replace({
      "process.browser": false,
    }),
    commonjs({
      exclude: "**/*.css",
    }),
    resolve({
      // modulesOnlty: true,
      preferBuiltins: true,
      // customResolveOptions: {
      //   moduleDirectory: ["src/dummy_modules", "node_modules"]
      // }
    }),
    json(),

    !dev && terser({ module: true })
  ],

  external: Object.keys(pkg.dependencies).concat(
    require("module").builtinModules || Object.keys(process.binding("natives"))
  ),

  watch: {
    clearScreen: false,
  }
};
