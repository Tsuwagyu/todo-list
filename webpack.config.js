// webpack.config.js
import BrowserSyncPlugin from "browser-sync-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/template.html",
    }),
    new BrowserSyncPlugin({
      host:'localhost',
      port: 3000,
      server: {baseDir: ['dist']}
    })
  ],

  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {   test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },

    ],
  },
};
