const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve('./public'),
        filename: 'script.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    "style-loader",
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'less-loader', options: { javascriptEnabled: true, sourceMap: true } }

                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './config-template/index.html',
            filename: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    filename: 'vendor.[hash].js',
                    priority: 10,
                    enforce: true
                }
            }
        }
    }
};