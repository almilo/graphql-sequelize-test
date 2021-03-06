var path = require('path'), ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: client('index.js'),
    output: {
        path: 'dist',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css')},
            {test: /\.(woff|woff2|ttf|eot|svg)$/, loader: 'file?name=font/[name].[ext]'}
        ]
    },
    plugins: [
        new ExtractTextPlugin(path.join('app.css')),
        new HtmlWebpackPlugin({
            template: client('index.html'),
            inject: 'body'
        })
    ]
};

function client(fileName) {
    return path.join(__dirname, 'client', fileName);
}
