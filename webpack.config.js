var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [
        "webpack-hot-middleware/client",
        path.join(__dirname, 'src/client/index.js')
    ],
    output: {
        path: path.join(__dirname, 'src/server/public/javascripts/'),
        publicPath: '/javascripts/',
        filename: 'build.js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {presets: ['es2015']}
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]'
                }
            },
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
