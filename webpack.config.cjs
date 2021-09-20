const HtmlWebPackPlugin = require("html-webpack-plugin");
// const NodeExternals = require("webpack-node-externals");
const ESLintPlugin = require("eslint-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});
const eslintPlugin = new ESLintPlugin();
module.exports = {
  mode: isDevelopment ? "development" : "production",
  devServer: {
    port: 8080,
    static: ["./src", "./public"], // both src and output dirs
    hot: true,
  },
  // target: "node",
  // externalsPresets: { node: true },
  // externals: [NodeExternals()],
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    htmlPlugin,
    eslintPlugin,
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: require.resolve("file-loader"),
      },
    ],
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".json"],
  },
};
