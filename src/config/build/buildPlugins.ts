import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { BuildOptions } from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { mode, paths, analyzer } = options;

  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({ template: paths.html }),
  ];

  if (isDev) {
    plugins.push(
      new webpack.ProgressPlugin(),
      new ESLintPlugin({
        extensions: ["ts", "tsx"], // Проверяем только TS файлы
        fix: isDev, // Автоматически исправлять ошибки в режиме разработки (опционально)
        failOnError: !isDev, // Останавливать сборку в продакшене при ошибках
        emitWarning: true,
      })
    );
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
