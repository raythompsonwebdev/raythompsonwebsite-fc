import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import StyleLintPlugin from "stylelint-webpack-plugin";

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

export default {
  mode: "development",
  entry: {
    main: "./src/index",
  },
  watch: true,
  target: "web",
  devtool: "inline-source-map",
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // rules for css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      // rules for sass
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          "postcss-loader",
        ],
      },
      // rules for fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"],
      },
      // rules for images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
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
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
            ],
          },
        },
      }),
    ],
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
    alias: {
      Images: path.resolve(__dirname, "./src/images/"),
      Fonts: path.resolve(__dirname, "./src/fonts/"),
    },
  },
};
