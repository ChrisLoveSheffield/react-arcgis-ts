const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'
const path = require('path')
const CopyWebpackPlugin = require('copyWebpackPlugin')
const webpack = require('webpack')

module.exports = {
    resolve: {
        alias: {
            '@cesium': path.resolve(cesiumSource),
        },
    },
    plugins: [
        // 复制素材到打包最终目录，相当于静态文件拷贝
        // 需要注意页面中会自动引入这些
        new CopyWebpackPlugin([
            {
                from: path.join(cesiumSource, cesiumWorkers),
                to: 'Workers',
            },
            {
                from: path.join(cesiumSource, 'Assets'),
                to: 'Assets',
            },
            {
                from: path.join(cesiumSource, 'Widgets'),
                to: 'Widgets',
            },
            {
                from: path.join(cesiumSource, 'Core'),
                to: 'Core',
            },
        ]),
        // 配置一个全局变量，不然会有个错误
        new webpack.DefinePlugin({
            CESIUM_BASE_URL: JSON.stringify(''),
        }),
    ],
}
