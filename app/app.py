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
        print(password)       
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
        last, number, player_id = players.get_players(current_user.id)
        play = Plays()
        playList, play_id = play.get_plays(current_user.id)
        total , efficient, individual, ind_used = game.data(current_user.id, player_id, play_id)
        total = total.most_common(1)[0][0]
        efficient = efficient.most_common(1)[0][0]
        eff_player = individual.most_common(1)[0][0]
        used_player = ind_used.most_common(1)[0][0]
        eff_player = players.get_player(eff_player)
        used_player = players.get_player(used_player)
        play = Plays()
        total = play.get_play(total)
        efficient = play.get_play(efficient)
        data = []
        data.append(str(total))
        data.append(str(efficient))
        data.append(str(eff_player))
        data.append(str(used_player))
        games, game_id = game_list.list_games(current_user.id)
        return render_template('home.html', games = games, game_id = game_id, data = data, username=username)
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
        last, number, player_id = players.get_deleted_players(current_user.id)
        total , efficient, individual, ind_used = g.individual_data(current_user.id, game, player_id)
        play = Plays()
        zone_eff, zone_used = g.zones_plays(current_user.id, player_id, None, game)
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
        my_game = []
        game_Name = ng.get_game_name(game)
        my_game.append(game_Name)
        return render_template('gameList.html', game = game, game_Name = game_Name, my_game = my_game, most_used = most_used, most_efficient = most_efficient, used_name = used_name, efficient_name = efficient_name, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values, used_play_id = used_play_id, eff_player_id = eff_player_id, eff_play_id = eff_play_id, used_player_id = used_player_id, zone_eff = zone_eff, zone_used = zone_used)    
    elif request.method == "POST" and str(request.form.get('player')) == 'false':
        play = str(request.form.get('play'))
        return redirect(url_for('game_play', game = game, play = play))
    elif request.method == "POST" and str(request.form.get('play')) == 'false':
        player_id = str(request.form.get('player'))
        return redirect(url_for('game_player', game = game, player = player_id))

@app.route("/edit/game/<game>", methods=['GET', 'POST'])
@login_required
def edit_game(game):
    if request.method == "GET":
        play, player = [],[]
        g = Game()
        p = Plays()
        play_name, play_id_list = p.get_plays(current_user.id)
        pl = Players()
        player_name, player_number, player_id_list = pl.get_players(current_user.id)
        possession, play_id, player_id, zone, result = g.game_data(current_user.id, game)
        for i in play_id:
            play.append(p.get_play(i))
        for i in player_id:
            player.append(pl.get_player(i))
        ng = NewGame()
        my_game = []
        game_name = ng.get_game_name(game)
        my_game.append(game_name)
        return render_template('edit_game.html', game = game, game_name = game_name, my_game = my_game, possession = possession, play = play, player = player, zone = zone, result = result, play_id = play_id, player_id = player_id, player_name = player_name, player_number = player_number, player_id_list = player_id_list, play_name = play_name, play_id_list = play_id_list)    
    if request.method == "POST" and str(request.form.get('add')) == 'false':
        possession = str(request.form.get('possession'))
        play = str(request.form.get('play'))
        player = str(request.form.get('player'))
        zone = str(request.form.get('zone'))
        result = str(request.form.get('result'))
        g = Game()
        g.edit_possession(possession, play, player, zone, result, game)
        play, player = [],[]
        p = Plays()
        play_name, play_id_list = p.get_plays(current_user.id)
        pl = Players()
        player_name, player_number, player_id_list = pl.get_players(current_user.id)
        possession, play_id, player_id, zone, result = g.game_data(current_user.id, game)
        for i in play_id:
            play.append(p.get_play(i))
        for i in player_id:
            player.append(pl.get_player(i))
        ng = NewGame()
        my_game = []
        game_name = ng.get_game_name(game)
        my_game.append(game_name)
        return render_template('edit_game.html', game = game, game_name = game_name, my_game = my_game, possession = possession, play = play, player = player, zone = zone, result = result, play_id = play_id, player_id = player_id, player_name = player_name, player_number = player_number, player_id_list = player_id_list, play_name = play_name, play_id_list = play_id_list)
    if request.method == "POST" and str(request.form.get('add')) == 'true':
        possession = str(request.form.get('possession'))
        play = str(request.form.get('play'))
        player = str(request.form.get('player'))
        zone = str(request.form.get('zone'))
        result = str(request.form.get('result'))
        g = Game()
        g.add_possession(game, possession, play, player, zone, result, current_user.id)
        play, player = [],[]
        p = Plays()
        play_name, play_id_list = p.get_plays(current_user.id)
        pl = Players()
        player_name, player_number, player_id_list = pl.get_players(current_user.id)
        possession, play_id, player_id, zone, result = g.game_data(current_user.id, game)
        for i in play_id:
            play.append(p.get_play(i))
        for i in player_id:
            player.append(pl.get_player(i))
        ng = NewGame()
        my_game = []
        game_name = ng.get_game_name(game)
        my_game.append(game_name)
        return render_template('edit_game.html', game = game, game_name = game_name, my_game = my_game, possession = possession, play = play, player = player, zone = zone, result = result, play_id = play_id, player_id = player_id, player_name = player_name, player_number = player_number, player_id_list = player_id_list, play_name = play_name, play_id_list = play_id_list)
    if request.method == "POST" and str(request.form.get('delete')) == 'true':
        game = str(request.form.get('game'))
        g = Game()
        ng = NewGame()
        g.delete_game(game)
        ng.delete_game(game)
        return redirect(url_for('games'))


@app.route("/season", methods=['GET', 'POST'])
@login_required
def playList():
    if request.method == "GET":
        game = Game()
        players = Players()
        last, number, player_id = players.get_players(current_user.id)
        play = Plays()
        playList, play_id = play.get_plays(current_user.id)
        total , efficient, individual, ind_used = game.data(current_user.id, player_id, play_id)
        zone_eff, zone_used = game.zones_plays(current_user.id, player_id, None, None)
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
        return render_template('playList.html', most_used = most_used, most_efficient = most_efficient, used_name = used_name, efficient_name = efficient_name, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values, used_play_id = used_play_id, eff_player_id = eff_player_id, eff_play_id = eff_play_id, used_player_id = used_player_id, zone_eff = zone_eff, zone_used = zone_used)    
    elif request.method == "POST" and str(request.form.get('player')) == 'false':
        play_id = str(request.form.get('play'))
        return redirect(url_for('play', play = play_id))
    elif request.method == "POST" and str(request.form.get('play')) == 'false':
        player_id = str(request.form.get('player'))
        return redirect(url_for('season_player', player = player_id))

@app.route("/season/player/<player>", methods=['GET', 'POST'])
@login_required
def season_player(player):
    if request.method == "GET":
        play = Plays()
        playlist, play_id = play.get_plays(current_user.id)
        game = Game()
        individual, ind_used = game.player_data(current_user.id, player, None, play_id)
        zone_eff, zone_used = game.zones_players(current_user.id, play_id, player, None)
        play_names, play_values, ind_names, ind_values, used_play_id, eff_play_id = [], [], [], [], [], []
        for key, value in sorted(individual.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            play_names.append(play.get_play(key))
            play_values.append(str(value))
            eff_play_id.append(key)
        for key, value in sorted(ind_used.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            ind_names.append(play.get_play(key))
            ind_values.append(str(value))
            used_play_id.append(key)
        p = Players()
        my_player = p.get_player(player)
        return render_template('season_player.html', player = player, my_player = my_player, play_names = play_names, play_values = play_values, ind_names = ind_names, ind_values = ind_values,  eff_play_id = eff_play_id,  used_play_id = used_play_id, zone_eff = zone_eff, zone_used = zone_used)
    if request.method == "POST":
        play_id = str(request.form.get('play'))
        return redirect(url_for('season_play_player', play = play_id, player = player))

@app.route("/<game>/player/<player>", methods=['GET', 'POST'])
@login_required
def game_player(game, player):
    if request.method == "GET":
        play = Plays()
        playlist, play_id = play.get_plays(current_user.id)
        print(play_id)
        g = Game()
        individual, ind_used = g.player_data(current_user.id, player, game, play_id)
        zone_eff, zone_used = g.zones_players(current_user.id, play_id, player, game)
        print(individual)
        print(ind_used)
        play_names, play_values, ind_names, ind_values, used_play_id, eff_play_id = [], [], [], [], [], []
        for key, value in sorted(individual.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            play_names.append(play.get_play(key))
            play_values.append(str(value))
            eff_play_id.append(key)
        for key, value in sorted(ind_used.iteritems(), key=lambda (k,v): (v,k), reverse=True):
            ind_names.append(play.get_play(key))
            ind_values.append(str(value))
            used_play_id.append(key)
        p = Players()
        my_player = p.get_player(player)
        ng = NewGame()
        game_name = ng.get_game_name(game)
        return render_template('game_player.html', game = game, game_name = game_name, player = player, my_player = my_player, play_names = play_names, play_values = play_values, ind_names = ind_names, ind_values = ind_values,  eff_play_id = eff_play_id,  used_play_id = used_play_id, zone_eff = zone_eff, zone_used = zone_used)
    if request.method == "POST":
        play_id = str(request.form.get('play'))
        return redirect(url_for('game_play_player',game= game, play = play_id, player = player))

@app.route("/season/<play>", methods=['GET', 'POST'])
@login_required
def play(play):
    if request.method == "GET":
        game = Game()
        players = Players()
        last, number, player_id = players.get_players(current_user.id)
        individual, ind_used = game.play_data(current_user.id, play, None, player_id)
        zone_eff, zone_used = game.zones_plays(current_user.id, player_id, play, None)
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
        return render_template('play.html', play = play, my_play = my_play, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values,  eff_player_id = eff_player_id,  used_player_id = used_player_id, zone_used = zone_used, zone_eff = zone_eff)
    if request.method == "POST":
        player_id = str(request.form.get('player'))
        print(player_id)
        return redirect(url_for('season_play_player', play = play, player = player_id))

@app.route("/season/<play>/<player>", methods=['GET'])
@login_required
def season_play_player(play, player):
    if request.method == "GET":
        game = Game()
        zone_eff, zone_used = game.zones_both(current_user.id, play, player, None)
        players = Players()
        my_player = players.get_player(player)
        p = Plays()
        my_play = p.get_play(play)
        return render_template('season_play_player.html', my_player = my_player, my_play = my_play, zone_used = zone_used, zone_eff = zone_eff)

@app.route("/<game>/plays/<play>", methods=['GET', 'POST'])
@login_required
def game_play(game, play):
    if request.method == "GET":
        g = Game()
        players = Players()
        print(game)
        last, number, player_id = players.get_deleted_players(current_user.id)
        individual, ind_used = g.play_data(current_user.id, play, game, player_id)
        zone_eff, zone_used = g.zones_plays(current_user.id, player_id, play, game)
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
        ng = NewGame()
        game_Name = ng.get_game_name(game)
        my_play = p.get_play(play)
        return render_template('game_play.html', play = play, game_Name = game_Name, game = game, my_play = my_play, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values,  eff_player_id = eff_player_id,  used_player_id = used_player_id, zone_eff = zone_eff, zone_used = zone_used)
    if request.method == "POST":
        player_id = str(request.form.get('player'))
        print(player_id)
        return redirect(url_for('game_play_player', game = game, play = play, player = player_id))

@app.route("/<game>/<play>/<player>", methods=['GET'])
@login_required
def game_play_player(game, play, player):
    if request.method == "GET":
        g = Game()
        zone_eff, zone_used = g.zones_both(current_user.id, play, player, game)
        players = Players()
        my_player = players.get_player(player)
        p = Plays()
        my_play = p.get_play(play)
        ng = NewGame()
        my_game = ng.get_game_name(game)
        return render_template('game_play_player.html', my_game = my_game, my_player = my_player, my_play = my_play, zone_used = zone_used, zone_eff = zone_eff)

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
        last, number, player_id = players.get_players(current_user.id)
        gamereturn = []
        gamereturn.append(str(game))
        return render_template('offense.html', last = last, play = playlist, player_id = player_id, play_id = play_id,game = gamereturn, gameName = game)
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
    if request.method == 'GET':
        first, last, number= [],[],[]
        players = Players()
        last, number, player_id = players.get_players(current_user.id)
        return render_template('addplayer.html', last = last, player_id = player_id, number = number)
    if request.method == 'POST' and request.form.get('edit') == 'false':
        last = str(request.form.get('last'))
        number = str(request.form.get('number'))
        players = Players()
        players.add_player(last, number, current_user.id)
        first, last, number= [],[],[]
        last, number, player_id = players.get_players(current_user.id)
        return render_template('addplayer.html', last = last, player_id = player_id, number = number)
    if request.method == 'POST' and request.form.get('edit') == 'true':
        name = str(request.form.get('name'))
        number = str(request.form.get('number'))
        player_id = str(request.form.get('id'))
        players = Players()
        players.edit_player(name, number, current_user.id, player_id)
        first, last, number= [],[],[]
        last, number, player_id = players.get_players(current_user.id)
        return render_template('addplayer.html', last = last, player_id = player_id, number = number)
    if request.method == 'POST' and request.form.get('delete') == 'true':
        player_id = str(request.form.get('id'))
        players = Players()
        players.delete_player(player_id)
        first, last, number= [],[],[]
        last, number, player_id = players.get_players(current_user.id)
        return render_template('addplayer.html', last = last, player_id = player_id, number = number)

@app.route("/addplay", methods=['GET', 'POST'])
@login_required
def addplay():
    if request.method == 'GET':
        plays = Plays()
        play, play_id = plays.get_plays(current_user.id)
        return render_template('addplay.html', play = play, play_id = play_id)
    if request.method == 'POST' and request.form.get('edit') == 'false':
        play = str(request.form.get('play'))
        plays = Plays()
        plays.add_play(play, current_user.id)
        return render_template('addplay.html')
    if request.method == 'POST' and request.form.get('edit') == 'true':
        play = str(request.form.get('play'))
        play_id = str(request.form.get('id'))
        plays = Plays()
        plays.edit_play(play, current_user.id, play_id)
        play, play_id = plays.get_plays(current_user.id)
        return render_template('addplay.html', play = play, play_id = play_id)
    if request.method == 'POST' and request.form.get('delete') == 'true':
        play_id = str(request.form.get('id'))
        plays = Plays()
        plays.delete_play(play_id)
        play, play_id = plays.get_plays(current_user.id)
        return render_template('addplay.html', play = play, play_id = play_id)

@app.route("/games", methods=['GET', 'POST'])
@login_required
def games():
    if request.method == "GET":
        games, game_id = [],[]
        game_list = NewGame()
        game = Game()
        games, game_id = game_list.list_games(current_user.id)
        return render_template('games.html', games = games, game_id = game_id)
    elif request.method == "POST":
        game = str(request.form.get('game'))
        return redirect(url_for('game', game = game))

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
    app.run(port=8000, debug=True)