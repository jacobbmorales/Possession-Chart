var webpack = require('webpack');
var $ = require('jquery');
var path = require('path')
var injectTapEventPlugin = require('react-tap-event-plugin');
module.exports = {
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
        path: path.join(__dirname, './app/static/scripts/jsx'),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
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
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }

        ]
    },
    plugins: []
}