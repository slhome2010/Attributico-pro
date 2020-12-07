const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack');
const path = require('path');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    public: path.join(__dirname, '../public')
};

let optimization = {}
if (process.env.npm_lifecycle_event === 'build:chunk') {
    optimization = {
        /* runtimeChunk: 'single', */
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    /* test: 'vendor', */
                    test: /[\\/]node_modules[\\/]/,
                    filename: 'vendors.js',
                    enforce: true,
                },
            }
        }
    }
}

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: {
        app: `${PATHS.src}/attributico.js`,
    },
    output: {
        path: PATHS.dist,
        filename: 'attributico.js',
        publicPath: './'
    },
    optimization: optimization,
    resolve: {
        extensions: ['.js', '.jsx', '.jsm', ".ts", ".tsx"],
        alias: {
            styles: path.resolve(__dirname, '../src/styles')
        }
    },
    module: {
        rules: [
            {
                test: /.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: 'dashes'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    'plugins': [
                        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                        ['@babel/plugin-proposal-class-properties', { 'loose': true }]
                    ]
                }
            },
            {
                test: /\.(jpg|png)$/,
                use: 'file-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        /* new HtmlWebpackPlugin({
            template: '../node_modules/html-webpack-template/index.ejs',
            title: 'Webpack 4 Demo',
            favicon: '../src/favicon.ico',
            meta: [
                {
                    name: 'robots',
                    content: 'index,follow'
                },
                {
                    name: 'description',
                    content: 'Webpack 4 demo using ES6, React, SASS'
                },
                {
                    name: 'keywords',
                    content: 'webpack,webpack-4,webpack.config.js,html5,es6+,react,sass'
                }
            ],
            appMountIds: ['app'],
            inject: false,
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                useShortDoctype: true,
                html5: true
            },
            mobile: true,
            scripts: ['./static.js']
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(PATHS.src, 'favicon.ico'),
                to: path.join(PATHS.dist, 'favicon.ico')
            },
            {
                from: path.join(PATHS.src, 'demo/static.js'),
                to: path.join(PATHS.dist, 'static.js')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
        }), */
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('1.2.0'),
            DEBUG: false
        }),
        new webpack.ProvidePlugin({
            // Make jQuery / $ available in every module:
            $: 'jquery',
            jQuery: 'jquery',
            // NOTE: Required to load jQuery Plugins into the *global* jQuery instance:
            jquery: 'jquery'
        }),
        new TerserPlugin({
            test: /\.js(\?.*)?$/i,
          }),
    ]
};
