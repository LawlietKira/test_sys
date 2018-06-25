
let webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./index.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                loader: 'url-loader?limit=819200&name=build/image/[name].[hash:8].[ext]'
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
    	host:'0.0.0.0',
        // hot: true,
        inline: true,
        port: 3000
    }
};