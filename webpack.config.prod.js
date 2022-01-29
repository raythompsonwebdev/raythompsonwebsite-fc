const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
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
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
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
            presets: ["@babel/preset-env"],
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     autoprefixer: {
          //       browsers: ["last 2 versions"],
          //     },
          //     plugins: () => [autoprefixer],
          //   },
          // },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
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
