const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
        hot: true,
        open: true,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ['html-loader']
             },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('build'),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack Demo',
            template: './src/index.html',
            filename: 'index.html',
            minify: devMode && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            }
            // filename: path.resolve(__dirname, 'build/index.html'),
            // template: path.resolve(__dirname, 'src/index.html'),
        })
    ]
};
