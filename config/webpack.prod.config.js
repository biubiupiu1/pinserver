var path = require('path')
var webpack = require('webpack')

process.noDeprecation = true;

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: [
        path.join(__dirname, 'src/client/index.js')
    ],
    output: {
        path: path.join(__dirname, 'src/server/public/'),
        filename: 'build.js'
    },
    stats: 'errors-only',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, './src/client'),
                query: {presets: ['es2015']}
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
            },
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
    ],
}
