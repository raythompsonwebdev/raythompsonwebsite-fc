import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import StyleLintPlugin from "stylelint-webpack-plugin";

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
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          "postcss-loader",
        ],
      },
      // file loader for fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"],
      },
      // file loader for images
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      Images: path.resolve(__dirname, "./src/images/"),
      Fonts: path.resolve(__dirname, "./src/fonts/"),
    },
  },
};
