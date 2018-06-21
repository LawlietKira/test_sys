
let webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/build',
        //publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader?limit=819200&name=build/images/[name].[hash:8].[ext]'
            },
            {
                test: /\.s?css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [ 'es2015', 'react','stage-2'],
                    plugins: [['import', {
                        libraryName: 'antd',
                        style: 'css'
                    }]]
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),

        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        // hot: true,
        inline: true,
        port: 3000
    }
};