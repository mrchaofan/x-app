/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('@rspack/cli')
const path = require('path')
const { baseDir, getExternals } = require('./util')

module.exports = defineConfig({
    mode: 'none',
    devtool: 'source-map',
    optimization: {
        minimize: false,
    },
    target: 'electron-main',
    entry: {
        main: './src/main.ts',
    },
    output: {
        path: path.resolve(baseDir, 'dist'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(baseDir, 'src'),
        },
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'builtin:swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                            },
                        },
                    },
                },
                type: 'javascript/auto',
            },
        ],
    },
    externals: getExternals(),
    node: {
        __dirname: false,
        __filename: false,
    },
})