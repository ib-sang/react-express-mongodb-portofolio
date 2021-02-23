const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const outputDirectory = 'dist';

module.exports = {
    entry: ['babel-polyfill', './src/client/index.js'],
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