// -- Global Requires -- //
const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const miniCssExtractPlugin = require('mini-css-extract-plugin')


// -- Production Configuration -- //
module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-react', '@babel/env'] }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss/,
                use: [
                    { loader: miniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader', options: { implementation: sass, sourceMap: false } },
                    { loader: 'postcss-loader' }
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
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};
