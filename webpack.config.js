//path モジュールの読み込み
const path = require('path');
//MiniCssExtractPlugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    // mode: "production",
    mode: "development",
    module: {
        rules: [
            {
                // 対象となるファイルの拡張子(scss)
                test: /\.(sa|sc|c)ss$/,
                // Sassファイルの読み込みとコンパイル
                use: [
                    // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // CSSをバンドルするためのローダー
                    {
                        loader: "css-loader",
                        options: {
                            //URL の解決を無効に
                            url: false,
                            // ソースマップを有効に
                            sourceMap: true,
                        },
                    },
                    // Sass を CSS へ変換するローダー
                    {
                        loader: "sass-loader",
                        options: {
                            // dart-sass を優先
                            implementation: require('sass'),
                            sassOptions: {
                                // fibers を使わない場合は以下で false を指定
                                fiber: require('fibers'),
                            },
                            // ソースマップを有効に
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: "ts-loader"
            },
        ]
    },
    //プラグインの設定
    plugins: [
        new MiniCssExtractPlugin({
            // 抽出する CSS のファイル名
            filename: "[name].css",
        }),
        new VueLoaderPlugin(),
    ],
    // ES5(IE11等)向けの指定
    target: ["web", "es5"],
    devServer: {
        static: "dist",
        open: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js'
        },
        extensions: ['.ts', '.js', '.vue', '.json'],
    },
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: './[name].min.js',
        path: __dirname + '/dist'
    },
};