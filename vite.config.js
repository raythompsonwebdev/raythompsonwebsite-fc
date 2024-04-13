/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import sass from "sass";
import stylelint from "vite-plugin-stylelint";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgr from "vite-plugin-svgr";

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false, // https://github.com/svg/svgo/issues/1128
          },
          cleanupIDs: {
            minify: false,
            remove: false,
          },
          convertPathData: false,
        },
      },
      "sortAttrs",
      {
        name: "addAttributesToSVGElement",
        params: {
          attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
        },
      },
    ],
  },
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 100,
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100,
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 100,
  },
  tiff: {
    // https://sharp.pixelplumbing.com/api-output#tiff
    quality: 100,
  },
  // gif does not support lossless compression
  // https://sharp.pixelplumbing.com/api-output#gif
  gif: {},
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    lossless: true,
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    lossless: true,
  },
};

/* OPTIONS */
export default defineConfig({
  plugins: [
    stylelint({
      // recommend to enable auto fix
      fix: true,
      build: true,
      dev: true,
    }),
    svgr(),
    ViteImageOptimizer({
      /* pass your config */
      DEFAULT_OPTIONS,
    }),
  ],
  // base: "./",
  clearScreen: false,
  logLevel: "info", // info, warn, error, silent
  envDir: "./", // direct to specified env folder.
  envPrefix: "RAY_THOMP",
  css: {
    devsourceMap: true, // source map for scss file
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  server: {
    port: 3000,
  },
});
