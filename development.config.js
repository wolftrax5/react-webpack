// -- Global Requires -- //
const path = require("path");
const webpack = require("webpack");
const sass = require('sass');
const webpackDashboard = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// -- Development Configuration -- //
module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    { loader: 'babel-loader', options: { presets: ['@babel/preset-react','@babel/env'] } },
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader', options: { implementation: sass, sourceMap: true } }
                ]
            }
        ]
    },
    resolve: { 
        alias: { 'react-dom': '@hot-loader/react-dom' },
        extensions: ['*', '.js', 'jsx'] 
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    }, 
    /* 
    *  If on Mac and want to test on mobile:
    *  Add host: '0.0.0.0' before port.
    *  Change localhost to 0.0.0.0 on publicPath.
    */
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'https://localhost:3000/dist/',
        hotOnly: true,
        open: true,
        quiet: true,
        noInfo: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpackDashboard(),
        new FriendlyErrorsWebpackPlugin(),
    ]
};
