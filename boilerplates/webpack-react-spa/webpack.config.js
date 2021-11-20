const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const distPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");
const templatePath = path.resolve(__dirname, "src/index.html");
const entryFile = srcPath + "/index.tsx";

module.exports = (env) => {
  env = env || {};

  return {
    mode: env.development ? "development" : "production",
    devtool: env.development ? "eval-cheap-module-source-map" : undefined,

    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            maxSize: 240000,
          },
        },
      },
    },

    entry: entryFile,
    output: {
      filename: env.development ? "[name].js" : "[name].[contenthash].js",
      path: distPath,
      publicPath: "/",
      clean: env.clean === "true",
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                babelrc: false,
                presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],

                plugins: [
                  ...(env.development
                    ? [
                        "react-refresh/babel",
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-optional-chaining",
                      ]
                    : ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-optional-chaining"]),
                ],
              },
            },
          ],
          exclude: /node_modules/,
        },

        {
          test: /\.css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: { localIdentName: "[name]__[local]__[contenthash:base64:5]" },
              },
            },
            "postcss-loader",
          ],
          exclude: /node_modules/,
        },

        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
              options: {
                insert: function insertAtTop(element) {
                  var head = document.querySelector("head");
                  var firstScriptEl = document.querySelector("script");
                  head.insertBefore(element, firstScriptEl);
                },
              },
            },
            "css-loader",
          ],
          include: /node_modules/,
        },

        {
          test: /\.(jpg|png)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/img/[name].[ext]",
          },
        },

        {
          test: /\.(ttf|otf)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[ext]",
          },
        },
      ],
    },

    devServer: {
      hot: true,
      port: process.env.PORT || 3000,
      static: "dist/",
      historyApiFallback: true,
      client: {
        overlay: {
          warnings: false,
        },
      },
    },

    plugins: [
      new HtmlWebpackPlugin({ template: templatePath }),
      new ForkTsCheckerWebpackPlugin(),
      env.development && new ReactRefreshWebpackPlugin(),
      new MiniCSSExtractPlugin({ ignoreOrder: true }),
      new webpack.DefinePlugin({
        __CONFIG: JSON.stringify(env.config),
        __DEV: !!env.development,
      }),
    ].filter(Boolean),

    stats: {
      hash: false,
      version: false,
      chunks: false,
      modules: false,
      children: false,
      colors: true,
    },
  };
};
