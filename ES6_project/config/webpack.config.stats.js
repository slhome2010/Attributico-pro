const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./webpack.config.prod');

let optimization = {}
if(process.env.npm_lifecycle_event === 'stats:chunk') { optimization = {
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
}}

module.exports = {
    ...config,
    plugins: [
        ...config.plugins,
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            generateStatsFile: true
        })
    ],
    optimization: optimization
};
