let path = require("path");
let webpack = require("webpack");
let baseWpConfig = require("./webpack.base.config");

const configDev = {
    mode: 'none',
    ...{

        module: {
            rules: [

                {
                    test: /\.(css|scss)$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/
                }
            ]
        },
        performance: {
            hints: false
        },
    }
}

let config = {
    ...baseWpConfig,
    ...configDev
}

console.log(config)
console.log(baseWpConfig)

module.exports = config;
