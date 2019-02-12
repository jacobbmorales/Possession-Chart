from flask import Flask, render_template, request, jsonify, json, redirect, url_for, abort
from flask_login import current_user, LoginManager, login_user, logout_user, login_required
from flaskext.mysql import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
import os
from models import User, app, db, login, Plays, Players, Game, NewGame
from collections import Counter, OrderedDict
import operator

@login.user_loader
def load_user(user_id):
    user = User.query.get(user_id)
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
        user = User.query.filter_by(username= username).first()
        if check_password_hash(user.password, password):
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
        total , efficient, individual, ind_used = game.data(current_user.id, player_id, play_id, None)
        if (len(total) != 0):
            total = total.most_common(1)[0][0]
            total = play.get_play(total)
        else:
            total = "You haven't used any plays yet."
        if (len(efficient) != 0):
            efficient = efficient.most_common(1)[0][0]
            efficient = play.get_play(efficient)
        else:
            efficient = "You haven't used any plays yet."
        if (len(individual) != 0):
            eff_player = individual.most_common(1)[0][0]
            eff_number = players.get_number(eff_player)
            player_name = players.get_player(eff_player)
            eff_player = eff_number + ' - ' + player_name
        else:
            eff_player = "You haven't used any players yet."
        if (len(ind_used) != 0):
            used_player = ind_used.most_common(1)[0][0]
            used_number = players.get_number(used_player)    
            player_name = players.get_player(used_player)
            used_player = used_number + ' - ' + player_name
            
        else:
            used_player = "You haven't used any players yet."       
        
        data = []
        data.append(str(total))
        data.append(str(efficient))
        data.append(str(eff_player))
        data.append(str(used_player))
        return render_template('home.html', data = data, username=username)
    elif request.method == "POST":
        if (str(request.form.get('signout')) == 'true'):
            logout_user()
            return redirect(url_for('index'))

@app.route("/game/<game>/<zone>", methods=['GET', 'POST'])
@login_required
def game(game, zone):
    if request.method == "GET":
        if zone == 'None':
            zone = None
        g = Game()
        players = Players()
        last, number, player_id = players.get_deleted_players(current_user.id)
        total , efficient, individual, ind_used = g.individual_data(current_user.id, game, player_id, zone)
        play = Plays()
        zone_eff, zone_used = g.zones_plays(current_user.id, player_id, None, game)
        most_used, most_efficient, used_name, efficient_name, player_names, player_values, ind_names, ind_values, used_play_id, used_player_id, eff_play_id, eff_player_id, used_number, eff_number = [], [], [], [], [], [], [], [], [], [], [], [], [], []
        for key, value in sorted(efficient.items(), key=lambda kv: kv[1], reverse=True):
            most_efficient.append(play.get_play(key))
            efficient_name.append(str(value))
            eff_play_id.append(str(key))
        for key, value in sorted(total.items(), key=lambda kv: kv[1], reverse=True):
            most_used.append(play.get_play(key))
            used_name.append(str(value))
            used_play_id.append(str(key))
        for key, value in sorted(individual.items(), key=lambda kv: kv[1], reverse=True):
            player_names.append(players.get_player(key))
            player_values.append(str(value))
            eff_player_id.append(key)
            eff_number.append(players.get_number(key))
        for key, value in sorted(ind_used.items(), key=lambda kv: kv[1], reverse=True):
            ind_names.append(players.get_player(key))
            ind_values.append(str(value))
            used_player_id.append(key)
            used_number.append(players.get_number(key))
        ng = NewGame()
        my_game = []
        game_Name = ng.get_game_name(game)
        my_game.append(game_Name)
        return render_template('gameList.html', game = game, game_Name = game_Name, my_game = my_game, most_used = most_used, most_efficient = most_efficient, used_name = used_name, efficient_name = efficient_name, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values, used_play_id = used_play_id, eff_player_id = eff_player_id, eff_play_id = eff_play_id, used_player_id = used_player_id, zone_eff = zone_eff, zone_used = zone_used, username = str(current_user.username), used_number = used_number, eff_number = eff_number, zone = zone)    
    elif request.method == "POST" and str(request.form.get('player')) == 'false':
        play_id = str(request.form.get('play'))
        return redirect(url_for('game_play', game = game, play = play_id, zone = 'None'))
    elif request.method == "POST" and str(request.form.get('play')) == 'false':
        player_id = str(request.form.get('player'))
        return redirect(url_for('game_player', game = game, player = player_id, zone='None'))
    elif request.method == "POST" and str(request.form.get('play')) == 'fals' and str(request.form.get('player')) == 'fals':
        zone = str(request.form.get('zone'))
        return redirect(url_for('game', game = game, zone = zone))

@app.route("/edit/game/<game>", methods=['GET', 'POST'])
@login_required
def edit_game(game):
    if request.method == "GET":
        play, player, number = [],[],[]
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
            number.append(pl.get_number(i))
        ng = NewGame()
        my_game = []
        game_name = ng.get_game_name(game)
        my_game.append(game_name)
        return render_template('edit_game.html', game = game, game_name = game_name, my_game = my_game, possession = possession, play = play, player = player, zone = zone, result = result, play_id = play_id, player_id = player_id, player_name = player_name, player_number = player_number, player_id_list = player_id_list, play_name = play_name, play_id_list = play_id_list, username = str(current_user.username), number = number)    
    if request.method == "POST" and str(request.form.get('add')) == 'false':
        possession = str(request.form.get('possession'))
        play = str(request.form.get('play'))
        player = str(request.form.get('player'))
        zone = str(request.form.get('zone'))
        result = str(request.form.get('result'))
        game = str(request.form.get('game'))
        g = Game()
        g.edit_possession(possession, play, player, zone, result, game)
        return redirect(url_for('edit_game', game = game))
    if request.method == "POST" and str(request.form.get('add')) == 'true':
        possession = str(request.form.get('possession'))
        play = str(request.form.get('play'))
        player = str(request.form.get('player'))
        zone = str(request.form.get('zone'))
        result = str(request.form.get('result'))
        g = Game()
        g.add_possession(game, possession, play, player, zone, result, current_user.id)
        return redirect(url_for('edit_game', game = game))
    if request.method == "POST" and str(request.form.get('delete')) == 'true':
        game = str(request.form.get('game'))
        g = Game()
        ng = NewGame()
        g.delete_game(game)
        ng.delete_game(game)
        return redirect(url_for('games'))

@app.route("/season/<zone>", methods=['GET', 'POST'])
@login_required
def season(zone):
    if request.method == "GET":
        if zone == 'None':
            zone = None
        game = Game()
        players = Players()
        last, number, player_id = players.get_deleted_players(current_user.id)
        play = Plays()
        playList, play_id = play.get_deleted_plays(current_user.id)
        total , efficient, individual, ind_used = game.data(current_user.id, player_id, play_id, zone)
        zone_eff, zone_used = game.zones_plays(current_user.id, player_id, None, None)
        most_used, most_efficient, used_name, efficient_name, player_names, player_values, ind_names, ind_values, used_play_id, used_player_id, eff_play_id, eff_player_id, used_number, eff_number = [], [], [], [], [], [], [], [], [], [], [], [], [], []
        for key, value in sorted(total.items(), key=lambda kv: kv[1], reverse=True):
            if value != 0:
                most_used.append(play.get_play(key))
                used_name.append(str(value))
                used_play_id.append(key)
        for key, value in sorted(efficient.items(), key=lambda kv: kv[1], reverse=True):
            if key in used_play_id:
                most_efficient.append(play.get_play(key))
                efficient_name.append(str(value))
                eff_play_id.append(key)
        for key, value in sorted(ind_used.items(), key=lambda kv: kv[1], reverse=True):
            if value != 0:
                ind_names.append(players.get_player(key))
                ind_values.append(str(value))
                used_player_id.append(key)
                used_number.append(players.get_number(key))
        for key, value in sorted(individual.items(), key=lambda kv: kv[1], reverse=True):
            if key in used_player_id:
                player_names.append(players.get_player(key))
                player_values.append(str(value))
                eff_player_id.append(key)
                eff_number.append(players.get_number(key))
        return render_template('playList.html', most_used = most_used, most_efficient = most_efficient, used_name = used_name, efficient_name = efficient_name, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values, used_play_id = used_play_id, eff_player_id = eff_player_id, eff_play_id = eff_play_id, used_player_id = used_player_id, zone_eff = zone_eff, zone_used = zone_used, username = str(current_user.username), used_number = used_number, eff_number = eff_number, zone=str(zone))    
    elif request.method == "POST" and str(request.form.get('player')) == 'false':
        play_id = str(request.form.get('play'))
        return redirect(url_for('play', play = play_id, zone = 'None'))
    elif request.method == "POST" and str(request.form.get('play')) == 'false':
        player_id = str(request.form.get('player'))
        return redirect(url_for('season_player', player = player_id, zone='None'))
    elif request.method == "POST" and str(request.form.get('play')) == 'fals' and str(request.form.get('player')) == 'fals':
        zone = str(request.form.get('zone'))
        return redirect(url_for('season', zone = zone))

@app.route("/season/player/<player>/<zone>", methods=['GET', 'POST'])
@login_required
def season_player(player, zone):
    if request.method == "GET":
        if zone == 'None':
            zone = None
        play = Plays()
        playlist, play_id = play.get_deleted_plays(current_user.id)
        game = Game()
        individual, ind_used = game.player_data(current_user.id, player, None, play_id, zone)
        zone_eff, zone_used = game.zones_players(current_user.id, play_id, player, None)
        play_names, play_values, ind_names, ind_values, used_play_id, eff_play_id = [], [], [], [], [], []
        for key, value in sorted(ind_used.items(), key=lambda kv: kv[1], reverse=True):
            ind_names.append(play.get_play(key))
            ind_values.append(str(value))
            used_play_id.append(key)
        for key, value in sorted(individual.items(), key=lambda kv: kv[1], reverse=True):
            play_names.append(play.get_play(key))
            play_values.append(str(value))
            eff_play_id.append(key)
        p = Players()
        player_name = p.get_player(player)
        player_number = p.get_number(player)
        my_player = player_number + ' - ' + player_name
        return render_template('season_player.html', player = player, my_player = my_player, play_names = play_names, play_values = play_values, ind_names = ind_names, ind_values = ind_values,  eff_play_id = eff_play_id,  used_play_id = used_play_id, zone_eff = zone_eff, zone_used = zone_used, username = str(current_user.username), zone=zone)
    if request.method == "POST" and str(request.form.get('zone')) == 'false':
        play_id = str(request.form.get('play'))
        return redirect(url_for('season_play_player', play = play_id, player = player))
    elif request.method == "POST" and str(request.form.get('zone')) != 'false':
        zone = str(request.form.get('zone'))
        return redirect(url_for('season_player', player = player, zone=zone))

@app.route("/<game>/player/<player>/<zone>", methods=['GET', 'POST'])
@login_required
def game_player(game, player, zone):
    if request.method == "GET":
        if zone == 'None':
            zone = None
        play = Plays()
        playlist, play_id = play.get_deleted_plays(current_user.id)
        g = Game()
        individual, ind_used = g.player_data(current_user.id, player, game, play_id, zone)
        zone_eff, zone_used = g.zones_players(current_user.id, play_id, player, game)
        play_names, play_values, ind_names, ind_values, used_play_id, eff_play_id = [], [], [], [], [], []
        for key, value in sorted(individual.items(), key=lambda kv: kv[1], reverse=True):
            play_names.append(play.get_play(key))
            play_values.append(str(value))
            eff_play_id.append(key)
        for key, value in sorted(ind_used.items(), key=lambda kv: kv[1], reverse=True):
            ind_names.append(play.get_play(key))
            ind_values.append(str(value))
            used_play_id.append(key)
        p = Players()
        player_name = p.get_player(player)
        player_number = p.get_number(player)
        my_player = player_number + ' - ' + player_name
        ng = NewGame()
        game_name = ng.get_game_name(game)
        return render_template('game_player.html', game = game, game_name = game_name, player = player, my_player = my_player, play_names = play_names, play_values = play_values, ind_names = ind_names, ind_values = ind_values,  eff_play_id = eff_play_id,  used_play_id = used_play_id, zone_eff = zone_eff, zone_used = zone_used, username = str(current_user.username), zone = zone)
    if request.method == "POST" and str(request.form.get('zone')) == 'false':
        play_id = str(request.form.get('play'))
        return redirect(url_for('game_play_player',game= game, play = play_id, player = player))
    elif request.method == "POST" and str(request.form.get('zone')) != 'false':
        zone = str(request.form.get('zone'))
        return redirect(url_for('season_player', game = game, player = player, zone=zone))

@app.route("/season/play/<play>/<zone>", methods=['GET', 'POST'])
@login_required
def play(play, zone):
    if request.method == "GET":
        if zone == "None":
            zone = None
        game = Game()
        players = Players()
        last, number, player_id = players.get_deleted_players(current_user.id)
        individual, ind_used = game.play_data(current_user.id, play, None, player_id, zone)
        zone_eff, zone_used = game.zones_plays(current_user.id, player_id, play, None)
        player_names, player_values, ind_names, ind_values, used_player_id, eff_player_id, eff_number, used_number = [], [], [], [], [], [], [], []
        for key, value in sorted(individual.items(), key=lambda kv: kv[1], reverse=True):
            player_names.append(players.get_player(key))
            player_values.append(str(value))
            eff_player_id.append(key)
            eff_number.append(players.get_number(key))
        for key, value in sorted(ind_used.items(), key=lambda kv: kv[1], reverse=True):
            ind_names.append(players.get_player(key))
            ind_values.append(str(value))
            used_player_id.append(key)
            used_number.append(players.get_number(key))
        p = Plays()
        my_play = p.get_play(play)
        return render_template('play.html', play = play, my_play = my_play, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values,  eff_player_id = eff_player_id,  used_player_id = used_player_id, zone_used = zone_used, zone_eff = zone_eff, username = str(current_user.username), eff_number = eff_number, used_number = used_number, zone=zone)
    if request.method == "POST" and request.form.get('zone') == 'false':
        player_id = str(request.form.get('player'))
        return redirect(url_for('season_play_player', play = play, player = player_id))
    if request.method == "POST" and request.form.get('zone') != 'false':
        zone = str(request.form.get('zone'))
        return redirect(url_for('play', play = play, zone=zone))

@app.route("/season/<play>/<player>", methods=['GET'])
@login_required
def season_play_player(play, player):
    if request.method == "GET":
        game = Game()
        zone_eff, zone_used = game.zones_both(current_user.id, play, player, None)
        players = Players()
        player_name = players.get_player(player)
        player_number = players.get_number(player)
        my_player = player_number + ' - ' + player_name
        p = Plays()
        my_play = p.get_play(play)
        return render_template('season_play_player.html', my_player = my_player, my_play = my_play, zone_used = zone_used, zone_eff = zone_eff, username = str(current_user.username))

@app.route("/<game>/play/<play>/<zone>", methods=['GET', 'POST'])
@login_required
def game_play(game, play, zone):
    if request.method == "GET":
        if zone == 'None':
            zone = None
        g = Game()
        players = Players()
        last, number, player_id = players.get_deleted_players(current_user.id)
        individual, ind_used = g.play_data(current_user.id, play, game, player_id, zone)
        zone_eff, zone_used = g.zones_plays(current_user.id, player_id, play, game)
        player_names, player_values, ind_names, ind_values, used_player_id, eff_player_id, eff_player_id, used_number, eff_number = [], [], [], [], [], [], [], [], []
        for key, value in sorted(individual.items(), key=lambda kv: kv[1], reverse=True):
            player_names.append(players.get_player(key))
            player_values.append(str(value))
            eff_player_id.append(key)
            eff_number.append(players.get_number(key))
        for key, value in sorted(ind_used.items(), key=lambda kv: kv[1], reverse=True):
            ind_names.append(players.get_player(key))
            ind_values.append(str(value))
            used_player_id.append(key)
            used_number.append(players.get_number(key))
        p = Plays()
        ng = NewGame()
        game_Name = ng.get_game_name(game)
        my_play = p.get_play(play)
        return render_template('game_play.html', play = play, game_Name = game_Name, game = game, my_play = my_play, player_names = player_names, player_values = player_values, ind_names = ind_names, ind_values = ind_values,  eff_player_id = eff_player_id,  used_player_id = used_player_id, zone_eff = zone_eff, zone_used = zone_used, username = str(current_user.username), used_number = used_number, eff_number = eff_number, zone = zone)
    if request.method == "POST" and request.form.get('zone') == 'false':
        player_id = str(request.form.get('player'))
        return redirect(url_for('game_play_player', game = game, play = play, player = player_id))
    if request.method == "POST" and request.form.get('zone') != 'false':
        zone = str(request.form.get('zone'))
        return redirect(url_for('game_play', game=game, play = play, zone=zone))

@app.route("/<game>/<play>/<player>", methods=['GET'])
@login_required
def game_play_player(game, play, player):
    if request.method == "GET":
        g = Game()
        zone_eff, zone_used = g.zones_both(current_user.id, play, player, game)
        players = Players()
        player_name = players.get_player(player)
        player_number = players.get_number(player)
        my_player = player_number + ' - ' + player_name
        p = Plays()
        my_play = p.get_play(play)
        ng = NewGame()
        my_game = ng.get_game_name(game)
        return render_template('game_play_player.html', my_game = my_game, my_player = my_player, my_play = my_play, zone_used = zone_used, zone_eff = zone_eff, username = str(current_user.username))

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == "GET":
        return render_template('signup.html')
    elif request.method == "POST":
        username = str(request.form.get('user'))
        password = str(request.form.get('password'))
        email = str(request.form.get('email'))
        user = User()
        success = user.create_user(username, password, email)
        if success == True:
            user = User.query.filter_by(username= username).first()
            login_user(user)
            return redirect(url_for('home', username =current_user.username))
        else:
            abort(401)     
                 

@app.route("/offense/<game>/<possession>", methods=['GET', 'POST'])
@login_required
def offense(game, possession):
    if request.method == "GET":
        last, number, plays, play_id, players, plays, numbers = [],[],[],[],[],[],[],
        p = Plays()
        playlist, play_id = p.get_plays(current_user.id)
        pl= Players()
        last, number, player_id = pl.get_players(current_user.id)
        gamereturn = []
        gamereturn.append(str(game))
        get_game = NewGame()
        game_id = get_game.get_game(game, current_user.id)
        g = Game()
        possessions, play_ids, player_ids, zones, results = g.game_data(current_user.id, game_id)
        for i in play_ids:
            plays.append(p.get_play(i))
        for i in player_ids:
            players.append(pl.get_player(i))
            numbers.append(pl.get_number(i))
        return render_template('offense.html', last = last, play = playlist, player_id = player_id, play_id = play_id, player_ids = player_ids, play_ids = play_ids, game = gamereturn, gameName = game, game_id = game_id, username = str(current_user.username), number = number, possession = possession, possessions = possessions, plays = plays, players = players, zones = zones, results = results, numbers = numbers)
    elif request.method == "POST" and request.form.get('edit') == 'false':
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
        return redirect(url_for('offense', game = game, possession = str(int(possession)+ 1)))
    elif request.method == "POST" and request.form.get('edit') == 'true':
        possession = str(request.form.get('possession'))
        possession1 = str(request.form.get('possession1'))
        play = str(request.form.get('play'))
        player = str(request.form.get('player'))
        zone = str(request.form.get('zone'))
        result = str(request.form.get('result'))
        get_game = NewGame()
        game_id = get_game.get_game(game, current_user.id)
        g = Game(game_id = game_id)
        g.edit_possession(possession, play, player, zone, result, game_id)
        return redirect(url_for('offense', game = game, possession = possession1))


@app.route("/addplayer", methods=['GET', 'POST'])
@login_required
def addplayer():
    if request.method == 'GET':
        last, number= [],[]
        players = Players()
        last, number, player_id = players.get_players(current_user.id)
        return render_template('addplayer.html', last = last, player_id = player_id, number = number, username = str(current_user.username))
    if request.method == 'POST' and request.form.get('edit') == 'false':
        last = str(request.form.get('last'))
        number = str(request.form.get('number'))
        players = Players()
        players.add_player(last, number, current_user.id)
        first, last, number= [],[],[]
        last, number, player_id = players.get_players(current_user.id)
        return render_template('addplayer.html', last = last, player_id = player_id, number = number, username = str(current_user.username))
    if request.method == 'POST' and request.form.get('edit') == 'true':
        name = str(request.form.get('name'))
        number = str(request.form.get('number'))
        player_id = str(request.form.get('id'))
        players = Players()
        players.edit_player(name, number, current_user.id, player_id)
        first, last, number= [],[],[]
        last, number, player_id = players.get_players(current_user.id)
        return render_template('addplayer.html', last = last, player_id = player_id, number = number, username = str(current_user.username))
    if request.method == 'POST' and request.form.get('delete') == 'true':
        player_id = str(request.form.get('id'))
        players = Players()
        players.delete_player(player_id)
        first, last, number= [],[],[]
        last, number, player_id = players.get_players(current_user.id)
        return render_template('addplayer.html', last = last, player_id = player_id, number = number, username = str(current_user.username))

@app.route("/addplay", methods=['GET', 'POST'])
@login_required
def addplay():
    if request.method == 'GET':
        plays = Plays()
        play, play_id = plays.get_plays(current_user.id)
        return render_template('addplay.html', play = play, play_id = play_id, username = str(current_user.username))
    if request.method == 'POST' and request.form.get('edit') == 'false':
        play = str(request.form.get('play'))
        plays = Plays()
        plays.add_play(play, current_user.id)
        play, play_id = plays.get_plays(current_user.id)
        return render_template('addplay.html', play = play, play_id = play_id, username = str(current_user.username))
    if request.method == 'POST' and request.form.get('edit') == 'true':
        play = str(request.form.get('play'))
        play_id = str(request.form.get('id'))
        plays = Plays()
        plays.edit_play(play, current_user.id, play_id)
        play, play_id = plays.get_plays(current_user.id)
        return render_template('addplay.html', play = play, play_id = play_id, username = str(current_user.username))
    if request.method == 'POST' and request.form.get('delete') == 'true':
        play_id = str(request.form.get('id'))
        plays = Plays()
        plays.delete_play(play_id)
        play, play_id = plays.get_plays(current_user.id)
        return render_template('addplay.html', play = play, play_id = play_id, username = str(current_user.username))

@app.route("/games", methods=['GET', 'POST'])
@login_required
def games():
    if request.method == "GET":
        games, game_id = [],[]
        game_list = NewGame()
        game = Game()
        games, game_id, date = game_list.list_games(current_user.id)
        return render_template('games.html', games = games, game_id = game_id, date=date, username = str(current_user.username))
    elif request.method == "POST":
        game = str(request.form.get('game'))
        return redirect(url_for('game', game = game, zone = 'None'))

@app.route("/newgame", methods=['GET', 'POST'])
@login_required
def newgame():
    if request.method == "GET":
        return render_template('newgame.html', username = str(current_user.username))
    if request.method == "POST":
        name = str(request.form.get('game'))
        date = request.form.get('date')
        game = NewGame()
        success = game.add_game(name, current_user.id, date)
        if success == True:
            return redirect(url_for('offense', game = name, possession = '1'))
        else:
            abort(401)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)