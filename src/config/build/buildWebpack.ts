import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, port, paths } = options;
  const isDev = mode === "development";

  const devServer = {
    port: port ?? 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  };
  return {
    mode: mode || "development",
    entry: paths.entry,
    module: {
      rules: buildLoaders(options),
    },

    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(options),
    devtool: isDev && "inline-source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
