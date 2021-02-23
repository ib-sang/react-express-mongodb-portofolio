const webpack = require("webpack");
const path = require('path');
const outputDirectory = 'dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appEntry = ['babel-polyfill', './src/client/index.js']

module.exports = {

    entry: {
        app: appEntry
    },
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

            },
            {
                test: /\.(css|scss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        inline: true,
        port: 3000,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}