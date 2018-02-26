const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonConfig = require('../utilities/webpack.common.js');

module.exports = merge(CommonConfig, {
    entry: {
        sample: path.resolve(__dirname, './assets/js/index.js'),
        vendor: [
            'lodash'
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: 'sample/template.html',
            filename: 'sample.html',
            thunks: ['sample'],
            // excludeChunks: ['vendor', 'runtime'],
            inject: false
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new webpack.ProvidePlugin({
            // _: 'lodash'
            join: ['lodash', 'join']
        }),
        new ExtractTextPlugin("sample.[contenthash].css")
    ]
});
