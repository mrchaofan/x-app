/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('@rspack/cli')
const path = require('path')
const { rspack } = require('@rspack/core')
const { VueLoaderPlugin } = require('rspack-vue-loader')
const { baseDir, getExternals } = require('./util')

module.exports = defineConfig({
    mode: 'none',
    // target: 'electron-renderer',
    target: 'web',
    optimization: {
        minimize: false,
    },
    devtool: 'source-map',
    entry: {
        window: path.resolve(baseDir, 'src/packages/window/renderer/index.ts'),
        modal: path.resolve(baseDir, 'src/packages/modal/renderer/index.ts'),
        floatBall: path.resolve(baseDir, 'src/packages/float-ball/renderer/index.ts'),
    },
    output: {
        path: path.resolve(baseDir, 'dist/renderer'),
        filename: '[name].js',
        publicPath: './',
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(baseDir, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'rspack-vue-loader', // 使用 rspack 优化的 vue-loader
                options: {
                    experimentalInlineTemplate: true,
                    experimentalInlineMatchResource: true,
                },
            },
            {
                test: /\.ts$/,
                loader: 'builtin:swc-loader',
                options: {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                        },
                    },
                },
                type: 'javascript/auto',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'sass-loader',
                        options: {
                            api: 'modern',
                        },
                    },
                ],
                type: 'css',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },

    plugins: [
        new rspack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new VueLoaderPlugin(),
        new rspack.HtmlRspackPlugin({
            filename: 'window.html',
            template: path.resolve(baseDir, 'src/index.html'),
            chunks: ['window'],
        }),
        new rspack.HtmlRspackPlugin({
            filename: 'modal.html',
            template: path.resolve(baseDir, 'src/index.html'),
            chunks: ['modal'],
        }),
        new rspack.HtmlRspackPlugin({
            filename: 'float-ball.html',
            template: path.resolve(baseDir, 'src/index.html'),
            chunks: ['floatBall'],
        }),
    ],
    experiments: {
        css: true,
    },
    externals: getExternals(),
    node: {
        __dirname: false,
        __filename: false,
    },
})