/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const dotenvFlow = require("dotenv-flow");
dotenvFlow.config({
  silent: true,
});

const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
  return new Promise((resolve, reject) => {
    resolve();
  }).then(() => {
    return {
      stats: "minimal",
      target: "node",
      mode: process.env.NODE_ENV,
      entry: ["@/index.ts"],
      devtool: process.env.NODE_ENV === "production" ? false : "source-map",
      output: {
        hashFunction: "xxhash64",
        hashDigest: "base64url",
        path: path.resolve(__dirname, "build"),
        filename: "index.js",

        chunkFilename:
          process.env.NODE_ENV === "production"
            ? "[contenthash].js"
            : "js/[name][id].js",
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "src"),
          "§": path.resolve(__dirname, "resources"),
        },
        extensions: [".tsx", ".ts", ".mjs", ".js", ".jsx", ".json", ".wasm"],
      },
      module: {
        rules: [
          {
            test: /.node$/,
            loader: "node-loader",
            options: {
              name: "[name].[ext]",
            },
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            loader: "babel-loader",
            exclude:
              process.env.NODE_ENV === "development"
                ? /(node_modules)/
                : () => false,
            options: {
              cacheDirectory: process.env.NODE_ENV !== "production",
              cacheCompression: process.env.NODE_ENV === "production",
              compact: process.env.NODE_ENV === "production",
            },
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({}),
        new webpack.ProvidePlugin({}),
      ].filter(Boolean),

      optimization: {
        chunkIds: "total-size",
        concatenateModules: process.env.NODE_ENV === "production",
        emitOnErrors: false,
        flagIncludedChunks: process.env.NODE_ENV === "production",
        innerGraph: process.env.NODE_ENV === "production",
        mangleExports: process.env.NODE_ENV === "production" ? "size" : false,
        mangleWasmImports: process.env.NODE_ENV === "production",
        mergeDuplicateChunks: process.env.NODE_ENV === "production",

        minimize: process.env.NODE_ENV === "production",

        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            include: undefined,
            exclude: undefined,
            parallel: true,
            minify: TerserPlugin.terserMinify,
            terserOptions: {
              ecma: 2016,
              enclose: false,
              parse: {
                bare_returns: true,
                html5_comments: true,
                shebang: true,
                spidermonkey: false,
              },
              compress: {
                defaults: true,
                arrows: true,
                arguments: true,
                booleans: true,
                booleans_as_integers: false,
                collapse_vars: true,
                comparisons: true,
                computed_props: true,
                conditionals: true,
                dead_code: true,
                directives: true,
                drop_console: false,
                drop_debugger: false,
                ecma: 2016,
                evaluate: true,
                expression: false,
                global_defs: {},
                hoist_funs: true,
                hoist_props: true,
                hoist_vars: true,
                if_return: true,
                inline: true,
                join_vars: true,
                keep_classnames: false,
                keep_fargs: false,
                keep_fnames: false,
                keep_infinity: false,
                loops: true,
                module: false,
                negate_iife: true,
                passes: 10,
                properties: true,
                pure_funcs: [],
                pure_getters: "strict",
                reduce_vars: true,
                reduce_funcs: true,
                sequences: true,
                side_effects: true,
                switches: true,
                toplevel: false,
                top_retain: null,
                typeofs: true,

                // unsafe: true, //!will break up
                unsafe_arrows: true,
                unsafe_comps: true,
                unsafe_Function: true,
                unsafe_methods: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                unsafe_undefined: true,
                unused: true,
              },
              mangle: true,
              module: true,
              output: {
                comments: false,
              },
              format: null,
              sourceMap: false,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_classnames: undefined,
              keep_fnames: false,
              safari10: false,
            },
            extractComments: false,
          }),
        ],
        moduleIds: process.env.NODE_ENV === "production" ? "size" : "named",
        portableRecords: true,
        providedExports: process.env.NODE_ENV === "production",
        realContentHash: process.env.NODE_ENV === "production",
        removeAvailableModules: process.env.NODE_ENV === "production",
        removeEmptyChunks: process.env.NODE_ENV === "production",
        runtimeChunk: false,
        sideEffects: process.env.NODE_ENV === "production",
        splitChunks: false,
        usedExports: process.env.NODE_ENV === "production",
      },
    };
  });
};
