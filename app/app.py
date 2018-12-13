from flask import Flask
from flask import Flask, render_template, request, jsonify, json, redirect, url_for, abort
from flask_login import current_user, LoginManager, login_user, logout_user, login_required
from flaskext.mysql import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
import os
from models import User, app, login, Plays, Players, Game, NewGame
from collections import Counter

@login.user_loader
def load_user(user_id):
    user = User()
    username = user.get_username(str(user_id))
    user = User(username = username, id = user_id)
    return user

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == "GET":
        if current_user.is_authenticated:
            return redirect(url_for('home', username = str(current_user.username)))
        else:
            return render_template('index.html')
    elif request.method == "POST":
        username = str(request.form.get('user'))
        password = str(request.form.get('password'))       
        user = User(username = username)
        my_hash = user.get_password(username)
        if user.check_password(my_hash, password):
            my_id = user.get_user_id(username)
            user = User(username = username, id = my_id)
            login_user(user)
            return redirect(url_for('home', username = str(current_user.username)))
        else:
            abort(401)
    
@app.route("/<username>", methods=['GET', 'POST'])
@login_required
def home(username):
    if request.method == "GET":
        games, game_id = [],[]
        game_list = NewGame()
        game = Game()
        players = Players()
        first, last, number, player_id = players.get_players(current_user.id)
        total , efficient, individual, ind_used = game.data(current_user.id, player_id)
        total = total.most_common(1)[0][0]
        efficient = efficient.most_common(1)[0][0]
        play = Plays()
        total = play.get_play(total)
        efficient = play.get_play(efficient)
        data = []
        data.append(str(total))
        data.append(str(efficient))
        games, game_id = game_list.list_games(current_user.id)
        return render_template('home.html', games = games, game_id = game_id, data = data)
    elif request.method == "POST":
        if (str(request.form.get('signout')) == 'true'):
            logout_user()
            return redirect(url_for('index'))
        else:
            game = str(request.form.get('game'))
            g = NewGame()
            return redirect(url_for('game', game = game))

@app.route("/game/<game>", methods=['GET', 'POST'])
@login_required
def game(game):
    if request.method == "GET":
        g = Game()
        players = Players()
        first, last, number, player_id = players.get_players(current_user.id)
        total , efficient, individual, ind_used = g.individual_data(current_user.id, game, player_id)
        play = Plays()
        most_used, most_efficient, used_name, efficient_name, player_names, player_values, ind_names, ind_values, used_play_id, used_player_id, eff_play_id, eff_player_id = [], [], [], [], [], [], [], [], [], [], [], []
        for key, value in sorted(efficient.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            most_efficient.append(play.get_play(key))
            efficient_name.append(str(value))
            eff_play_id.append(key)
        for key, value in sorted(total.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            most_used.append(play.get_play(key))
            used_name.append(str(value))
            used_play_id.append(key)
        for key, value in sorted(individual.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            player_names.append(players.get_player(key))
            player_values.append(str(value))
            eff_player_id.append(key)
        for key, value in sorted(ind_used.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            ind_names.append(players.get_player(key))
            ind_values.append(str(value))
            used_player_id.append(key)
        ng = NewGame()
        my_game = ng.get_game_name(game)
        return render_template('gameList.html', my_game = my_game, most_used = most_used, most_efficient = most_efficient, used_name = used_name, efficient_name = efficient_name, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values, used_play_id = used_play_id, eff_player_id = eff_player_id, eff_play_id = eff_play_id, used_player_id = used_player_id)    
    if request.method == "POST":
        play = str(request.form.get('play'))
        print(game)
        return redirect(url_for('game_play', game = game, play = play))

@app.route("/plays", methods=['GET', 'POST'])
@login_required
def playList():
    if request.method == "GET":
        game = Game()
        players = Players()
        first, last, number, player_id = players.get_players(current_user.id)
        total , efficient, individual, ind_used = game.data(current_user.id, player_id)
        play = Plays()
        most_used, most_efficient, used_name, efficient_name, player_names, player_values, ind_names, ind_values, used_play_id, used_player_id, eff_play_id, eff_player_id = [], [], [], [], [], [], [], [], [], [], [], []
        for key, value in sorted(efficient.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            most_efficient.append(play.get_play(key))
            efficient_name.append(str(value))
            eff_play_id.append(key)
        for key, value in sorted(total.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            most_used.append(play.get_play(key))
            used_name.append(str(value))
            used_play_id.append(key)
        for key, value in sorted(individual.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            player_names.append(players.get_player(key))
            player_values.append(str(value))
            eff_player_id.append(key)
        for key, value in sorted(ind_used.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            ind_names.append(players.get_player(key))
            ind_values.append(str(value))
            used_player_id.append(key)
        return render_template('playList.html', most_used = most_used, most_efficient = most_efficient, used_name = used_name, efficient_name = efficient_name, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values, used_play_id = used_play_id, eff_player_id = eff_player_id, eff_play_id = eff_play_id, used_player_id = used_player_id)    
    if request.method == "POST":
        play_id = str(request.form.get('play'))
        return redirect(url_for('play', play = play_id))

@app.route("/plays/<play>", methods=['GET'])
@login_required
def play(play):
    game = Game()
    players = Players()
    first, last, number, player_id = players.get_players(current_user.id)
    individual, ind_used = game.play_data(current_user.id, play, None, player_id)
    player_names, player_values, ind_names, ind_values, used_player_id, eff_player_id = [], [], [], [], [], []
    for key, value in sorted(individual.iteritems(), key=lambda (k,v): (v,k), reverse=True):
        player_names.append(players.get_player(key))
        player_values.append(str(value))
        eff_player_id.append(key)
    for key, value in sorted(ind_used.iteritems(), key=lambda (k,v): (v,k), reverse=True):
        ind_names.append(players.get_player(key))
        ind_values.append(str(value))
        used_player_id.append(key)
    p = Plays()
    my_play = p.get_play(play)
    return render_template('play.html', my_play = my_play, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values,  eff_player_id = eff_player_id,  used_player_id = used_player_id)

@app.route("/<game>/plays/<play>", methods=['GET'])
@login_required
def game_play(game, play):
    players = Players()
    first, last, number, player_id = players.get_players(current_user.id)
    individual, ind_used = game.play_data(current_user.id, play, None, player_id)
    player_names, player_values, ind_names, ind_values, used_player_id, eff_player_id = [], [], [], [], [], []
    for key, value in sorted(individual.iteritems(), key=lambda (k,v): (v,k), reverse=True):
        player_names.append(players.get_player(key))
        player_values.append(str(value))
        eff_player_id.append(key)
    for key, value in sorted(ind_used.iteritems(), key=lambda (k,v): (v,k), reverse=True):
        ind_names.append(players.get_player(key))
        ind_values.append(str(value))
        used_player_id.append(key)
    p = Plays()
    my_play = p.get_play(play)
    return render_template('game_play.html', my_play = my_play, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values,  eff_player_id = eff_player_id,  used_player_id = used_player_id)

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == "GET":
        return render_template('signup.html')
    elif request.method == "POST":
        username = str(request.form.get('user'))
        password = str(request.form.get('password'))
        user = User()
        success = user.create_user(username, password)
        if success == True:
            my_id = user.get_user_id(username)
            user = User(username = username, id = my_id)
            login_user(user)
            return redirect(url_for('home', username =current_user.username))
        else:
            abort(401)     
                 

@app.route("/offense/<game>", methods=['GET', 'POST'])
@login_required
def offense(game):
    if request.method == "GET":
        first, last, number, plays, play_id = [],[],[],[], []
        plays = Plays()
        playlist, play_id = plays.get_plays(current_user.id)
        players = Players()
        first, last, number, player_id = players.get_players(current_user.id)
        gamereturn = []
        gamereturn.append(str(game))
        return render_template('offense.html', last = last, play = playlist, player_id = player_id, play_id = play_id,game = gamereturn)
    elif request.method == "POST":
        playName = request.form.get('play')
        player = request.form.get('player')
        zone = request.form.get('zone')
        result = request.form.get('result')
        possession = request.form.get('possession')
        if possession == 'None':
            possession = '0'
        my_game = Game()
        get_game = NewGame()
        game_id = get_game.get_game(game, current_user.id)
        my_game.add_possession(str(game_id), str(possession), str(playName), str(player), str(zone), str(result), str(current_user.id))
        abort(401)
    

@app.route("/addplayer", methods=['GET', 'POST'])
@login_required
def addplayer():
    first = str(request.form.get('first'))
    last = str(request.form.get('last'))
    number = str(request.form.get('number'))
    players = Players()
    players.add_player(first, last, number, current_user.id)
    return render_template('addplayer.html')

@app.route("/addplay", methods=['GET', 'POST'])
@login_required
def addplay():
    play = str(request.form.get('play'))
    plays = Plays()
    plays.add_play(play, current_user.id)
    return render_template('addplay.html')

@app.route("/newgame", methods=['GET', 'POST'])
@login_required
def newgame():
    if request.method == "GET":
        return render_template('newgame.html')
    if request.method == "POST":
        name = str(request.form.get('game'))
        game = NewGame()
        success = game.add_game(name, current_user.id)
        if success == True:
            return redirect(url_for('offense', game = name))
        else:
            abort(401)

if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(port=5000, debug=True)