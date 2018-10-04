const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    entry: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    ],
    output: {
        publicPath: '/public/js/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});