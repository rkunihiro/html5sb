const { resolve } = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const fullpath = (name) => resolve(__dirname, name);

const entry = {
    main: fullpath("./src/main.tsx"),
};
const output = {
    path: fullpath("./dist"),
    filename: "[name].js",
};
const babelConfig = {
    presets: [
        ["@babel/preset-env", {
            modules: false,
            targets: {
                chrome: 85,
            },
            useBuiltIns: "usage",
            corejs: 3,
            debug: true,
        }],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
};
const tsRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
            options: babelConfig,
        }
    ],
};

module.exports = (_, args) => {
    const prod = args.mode === "production";
    const mode = prod ? "production" : "development";
    return {
        mode,
        entry,
        output,
        module: {
            rules: [tsRule],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
            plugins: [
                new TsconfigPathsPlugin(),
            ],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: fullpath("./public"),
                        to: fullpath("./dist"),
                    },
                ],
            }),
        ],
        optimization: {
            minimize: prod,
            minimizer: [
                new TerserPlugin(),
            ],
            splitChunks: {
                name: 'vendor',
                chunks: 'initial',
            },
        },
        devtool: "source-map",
        target: "web",
        devServer: {
            port: 3000,
            contentBase: fullpath("./public"),
        },
    };
};
