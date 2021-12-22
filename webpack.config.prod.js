const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

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
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       // Lossless optimization with custom option
      //       // Feel free to experiment with options for better result for you
      //       plugins: [
      //         // ["gifsicle", { interlaced: true }],
      //         // ["mozjpeg", { progressive: true }],
      //         ["optipng", { optimizationLevel: 5 }],
      //         // Svgo configuration here https://github.com/svg/svgo#configuration
      //       ],
      //     },
      //   },
      // }),
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
        use: [
          {
            loader: "img-optimize-loader",
            options: {
              compress: {
                // loseless compression for png
                optipng: {
                  optimizationLevel: 4,
                },
                // lossy compression for png. This will generate smaller file than optipng.
                pngquant: {
                  quality: [0.2, 0.8],
                },
                // Compression for webp.
                // You can also tranform jpg/png into webp.
                webp: {
                  quality: 100,
                },
                // Compression for svg.
                svgo: true,
                // Compression for gif.
                gifsicle: {
                  optimizationLevel: 3,
                },
                // Compression for jpg.
                mozjpeg: {
                  progressive: true,
                  quality: 60,
                },
              },
            },
          },
        ],
        type: "asset",
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
