var webpack = require('webpack');
var $ = require('jquery');
var path = require('path')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
    ],
    entry: {
        addplayer: "./app/static/scripts/js/addplayer.js",
        addplay: "./app/static/scripts/js/addplay.js",
        edit_game: "./app/static/scripts/js/edit_game.js",
        gameList: "./app/static/scripts/js/gameList.js",
        games: "./app/static/scripts/js/games.js",
        game_play: "./app/static/scripts/js/game_play.js",
        game_player: "./app/static/scripts/js/game_player.js",
        game_play_player: "./app/static/scripts/js/game_play_player.js",
        home: "./app/static/scripts/js/home.js",
        navbar: "./app/static/scripts/js/navbar.js",
        newgame: "./app/static/scripts/js/newgame.js",
        offense: "./app/static/scripts/js/offense.js",
        play: "./app/static/scripts/js/play.js",
        playList: "./app/static/scripts/js/playList.js",
        season_play_player: "./app/static/scripts/js/season_play_player.js",
        season_player: "./app/static/scripts/js/season_player.js",
        signin: "./app/static/scripts/js/signin.js",
        signup: "./app/static/scripts/js/signup.js",
    },
    node: {
        console: false,
        fs: false,
        net: false,
        tls: false
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, './app/static/scripts/jsx'),
    },
    module: {
        rules: [
            {
                test: /\.bundle\.js$/,
                use: 'bundle-loader'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']

                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, 
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },

        ]
    },

}