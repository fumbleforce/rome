import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
import svelte from "rollup-plugin-svelte";
import { eslint } from "rollup-plugin-eslint";
import sveltePreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";

const mode = process.env.NODE_ENV || "development";
const dev = mode === "development";

console.log("[Client] Mode", mode, dev);

const preprocess = sveltePreprocess({ postcss: true });
const css = css => css.write("dist/public/bundle.css");

export default {
  input: "src/app/index.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "dist/public/bundle.js"
  },
  plugins: [
    eslint({
      fix: true
    }),
    replace({
      "process.browser": true,
      "process.env.NODE_ENV": JSON.stringify(mode)
    }),

    svelte({
      dev,
      preprocess,
      css
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"]
    }),
    commonjs(),

    copy({
      targets: [
        { src: "src/static/*", dest: "dist/public/" }
      ]
    }),

    dev && livereload(),

    !dev && terser({ module: true }),

    dev && serve({
      contentBase: ["dist/public"],

      port: 3000,
    })
  ],

  watch: {
    clearScreen: false
  }
};
