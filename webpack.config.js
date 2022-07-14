// webpack.config.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.tsx', // our entry point, as mentioned earlier
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/, // matches .js, .ts, and .tsx files
                loader: 'babel-loader', // uses babel-loader for the specified file types (no ts-loader needed)
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // matches .css files only (i.e. not .scss)
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js', // our output bundle

    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public/'),
        },
        port: 3000,
        devMiddleware: {
            publicPath: 'http://localhost:3000/dist/',
        },
        hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()], // used for hot reloading when developing
    devtool: 'eval-source-map', // builds high quality source maps
}