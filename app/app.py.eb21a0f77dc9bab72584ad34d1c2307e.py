from flask import Flask
from flask import Flask, render_template, request, jsonify, json, redirect, url_for, abort
from flask_login import current_user, LoginManager, login_user, logout_user, login_required
from flaskext.mysql import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
import os
from models import User, app, login, Plays, Players, Game

@login.user_loader
def load_user(user_id):
    user = User()
    username = user.get_username(str(user_id))
    user = User(username = username, id = user_id)
    return user

@app.route("/", methods=['GET'])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('home', username = str(current_user.username)))
    else:
        render_template('index.html')

@app.route("/", methods=['POST'])
def login():
    
        username = str(request.form.get('user'))
        password = str(request.form.get('password'))       
        user = User(username = username)
        my_hash = user.get_password(username)
        if user.check_password(my_hash, password):
            my_id = user.get_user_id(username)
            user = User(username = username, id = my_id)
            login_user(user)
            return redirect(url_for('home', username = str(current_user.username)))
    abort(401)


@app.route("/<username>", methods=['GET', 'POST'])
@login_required
def home(username):
    if (str(request.form.get('signout')) == 'true'):
        logout_user()
        return redirect(url_for('index'))
    @app.route("/", methods=['GET', 'POST'])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('home', username = str(current_user.username)))
    else:
        username = str(request.form.get('user'))
        password = str(request.form.get('password'))       
        user = User(username = username)
        my_hash = user.get_password(username)
        if user.check_password(my_hash, password):
            my_id = user.get_user_id(username)
            user = User(username = username, id = my_id)
            login_user(user)
            return redirect(url_for('home', username = str(current_user.username)))
    abort(401) 

@app.route("/signup", methods=['GET', 'POST'])
def signup():
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
        return render_template('signup.html', user=user, password=password, success=success)           

@app.route("/offense/<game>", methods=['GET', 'POST'])
@login_required
def offense(game):
    first, last, number, plays = [],[],[],[]
    playName = str(request.form.get('play'))
    player = str(request.form.get('player'))
    zone = str(request.form.get('zone'))
    result = str(request.form.get('result'))
    possession = str(request.form.get('possession'))
    if possession == 'None':
        possession = '0'
    my_game = Game()
    my_game.add_possession(possession, playName, player, zone, result, current_user.id)
    plays = Plays()
    playlist = plays.get_plays(current_user.id)
    players = Players()
    first, last, number = players.get_players(current_user.id)
    return render_template('offense.html', first = first, last = last, number = number, play = playlist, game = game)

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
    name = str(request.form.get('game'))
    if request.method == "POST":
        return redirect(url_for('offense', game = name))
    return render_template('newgame.html')

if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(port=7112, debug=True)