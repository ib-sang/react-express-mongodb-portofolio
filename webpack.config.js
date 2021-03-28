// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const dev = process.env.NODE_ENV==="development";
// const urlDEV = 'http://localhost:3000';
// const appEntry = ['babel-polyfill', './src/client/main.scss', './src/client/index.js'];

// const loaders= [
//     {
//       loader: 'style-loader'
//     },
//     {
//       loader: MiniCssExtractPlugin.loader,
//       options: {
//         esModule: false,
//       },
//     },
//     {
//       loader: 'css-loader'
//     },
//     {
//       loader: 'resolve-url-loader'
//     },
//     {
//       loader : 'sass-loader'
//     }, 
//     {
//       loader: 'postcss-loader'
//     }
// ];

// const config ={
//     entry:{
//         app: appEntry
//     },
//     output:{
//         path: path.resolve(__dirname, 'public/assets'),
//         filename: 'bundle.dev.js',
//         publicPath: (!dev ? urlDEV : '')+"/assets/"
//     },
//     devtool: !dev ?"cheap-module-source-map" :"source-map", 
//     devServer:{
//         contentBase: path.resolve('./public'),
//         inline: true,
//         open: true,
//         port:3000,
//         historyApiFallback: true,
//         publicPath: (!dev ? urlDEV : '')+"/assets/",
//         proxy: {
//             '/api': 'http://localhost:3000'
//         }
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx|ts|tsx)$/,
//                 exclude: /(node_modules|bower_components)/,
//                 use: {
//                   loader: 'babel-loader',
//                   options: {
//                     presets: ['@babel/preset-env']
//                   }
                    
//                 },
//             },
//             {
//                 test: /\.(css|scss)$/i,
//                 use: loaders
//             },
//             {
//                 test: /\.html$/i,
//                 loader: 'html-loader',
//             },
//             {
//                 test: /\.(png|jpe?g|gif|svg)$/i,
//                 use: [
//                   'file-loader',
//                   { loader: 'image-webpack-loader' },
//                   {loader: 'url-loader',}
//                   ]
//             },
//             {
//                 test: /\.(eot|ttf|woff|woff2)$/,
//                 loader: 'file-loader',
//                 options: {
//                   name: 'fonts/[name].[hash].[ext]'
//                 }
//             },
//         ]
//     },
//     resolve: {
//          extensions: ['*', '.js', '.jsx']
//     },
//     plugins: [
//         new MiniCssExtractPlugin()
//     ]
// }

// module.exports = config;
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dev = process.env.NODE_ENV==="development";
const urlDEV = 'http://localhost:3000';

const appEntry = ['babel-polyfill', './src/client/main.scss', './src/client/index.js'];

const loaders= [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'resolve-url-loader'
    },
    {
      loader : 'sass-loader'
    }, 
    {
      loader: 'postcss-loader'
    }
  ];

console.log(path.resolve(__dirname, "dist"))
const config = {

    entry: {
        app: appEntry
    },
    output: {
        path: path.resolve(__dirname, "public/assets"),
        filename: 'bundle.dev.js',
    },
    devtool : 'source-map',
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
                use: loaders
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '/'
                },
            },
            {
                test:  /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                    publicPath: '/'
                },
            },
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
            '/api': 'http://localhost:9000'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = config