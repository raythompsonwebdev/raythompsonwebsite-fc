// import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";

import path from "path";

// const dirname = path.dirname(fileURLToPath(import.meta.url));
const postcssPresetEnv = require("postcss-preset-env");

export default {
  mode: "production",
  devtool: "source-map",
  entry: {
    main: path.join(__dirname, "src/index"),
    vendor: path.join(__dirname, "src/vendor"),
  },
  target: "web",
  output: {
    filename: "bundle.[chunkhash].js",
    chunkFilename: "bundle.[chunkhash].[id].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  optimization: {
    // splitChunks replaces CommonsChunkPlugin
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      // Minify JS
      new TerserPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                // That setting might be close to lossless, but it’s not guaranteed
                // https://github.com/GoogleChromeLabs/squoosh/issues/85
                quality: 100,
              },
              webp: {
                lossless: 1,
              },
              avif: {
                // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
                cqLevel: 0,
              },
            },
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      // frules for javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // rules for html
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // rules for sass
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({
                    /* use stage 3 features + css nesting rules */
                    stage: 3,
                    features: {
                      "nesting-rules": false,
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
        test: /\.(png|jpe?g|webp|git|svg|)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // new ImageminWebpWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
      chunkFilename: "style.[id].css",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: path.join(__dirname, "src/index.html"),
    }),
  ],
};
