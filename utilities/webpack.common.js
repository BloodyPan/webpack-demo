const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif)\??.*$/,
                loader: 'url-loader',
                query: {
                    // 图片大小限制;<8KB转成base64,减少http请求
                    limit: 8192
                }
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
};