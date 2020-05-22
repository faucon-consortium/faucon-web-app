const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: ["./src/client/index.jsx"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".webpack.js", ".web.js", ".js", ".jsx", ".json"]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
};
