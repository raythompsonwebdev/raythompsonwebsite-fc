import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import StyleLintPlugin from "stylelint-webpack-plugin";
// import { fileURLToPath } from "url";
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// eslint-disable-next-line no-underscore-dangle
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const postcssPresetEnv = require("postcss-preset-env");

export default {
  mode: "development",
  entry: {
    main: "./src/index",
  },
  watch: true,
  target: "web",
  devtool: "source-map",
  output: {
    // serves build from memory
    path: path.resolve(__dirname, "./src"),
    publicPath: "/",
    filename: "bundle.js",
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // rules for css
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({
                    /* use stage 3 features + css nesting rules */
                    stage: 3,
                    features: {
                      "nesting-rules": true,
                    },
                  }),
                ],
              },
            },
          },
        ],
      },
      // rules for sass
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({
                    /* use stage 3 features + css nesting rules */
                    stage: 3,
                    features: {
                      "nesting-rules": true,
                    },
                  }),
                ],
              },
            },
          },
        ],
      },
      // rules for fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"],
      },
      // rules for images
      {
        test: /\.(png|jpe?g|webp|gif|svg|)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
            ],
          },
        },
      }),
    ],
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: "./src/index.html",
      filename: "index.html",
    }),
    new StyleLintPlugin({
      configFile: "./.stylelintrc.json",
      files: "./src/sass/*.scss",
      syntax: "scss",
    }),
  ],

  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      Images: path.resolve(__dirname, "./src/images/"),
      Fonts: path.resolve(__dirname, "./src/fonts/"),
    },
  },
};
