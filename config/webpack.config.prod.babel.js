import path from 'path';
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

export default {
    mode: "production",
    entry: path.join(__dirname, '../src/client/index.js'),
    output: {
        path: path.join(__dirname, '../src/server/public/js/'),
        filename: 'bundle.js'
    },
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
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }]
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
    plugins: [
        new VueLoaderPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};