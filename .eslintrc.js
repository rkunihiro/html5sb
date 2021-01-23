module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    // globals: {
    //     Atomics: "readonly",
    //     SharedArrayBuffer: "readonly",
    // },
    parser: "@typescript-eslint/parser",
    // parserOptions: {
    //     project: "./tsconfig.json",
    //     ecmaFeatures: {
    //         jsx: true,
    //     },
    //     ecmaVersion: 2018,
    // },
    plugins: [
        "@typescript-eslint",
        "react",
    ],
    // settings: {
    //     react: {
    //         version: "detect",
    //     },
    // },
    rules: {
        curly: "error",
    },
};
