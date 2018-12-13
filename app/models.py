from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin,LoginManager
from flaskext.mysql import MySQL
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from random import randint
from config import Config
from collections import Counter, OrderedDict

app = Flask(__name__)
login = LoginManager(app)

app.config.from_object(Config)
mysql = MySQL()
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(UserMixin, db.Model):

    __tablename__ = 'user'

    username = db.Column(db.String(28), index=True, unique=True)
    password = db.Column(db.String(128))
    user_id = db.Column(db.Integer, primary_key=True)
    id = user_id

    def __repr__(self):
        return '<User {}>'.format(self.username) 

    def check_password(self, my_hash, password):
        return check_password_hash(my_hash, password)

    def create_user(self, user, password):
        password_hash = generate_password_hash(password)
        test = cursor.execute("SELECT * FROM user WHERE username = '"+user+"'")
        if (test == 0 and user != 'None'):
            cursor.execute("INSERT INTO user(username, password) VALUES('"+user+"', '"+password_hash+"')")
            success = True
        else:
            success = False
        conn.commit()
        return(success)

    def get_password(self, username):
        if(cursor.execute("SELECT password FROM user WHERE username = '"+username+"'") == 1):
            row = cursor.fetchone()
            password_check = str(row[0])
            return(password_check)
        else:
            return('1')

    def get_user_id(self, username):
        if(cursor.execute("SELECT user_id FROM user WHERE username = '"+username+"'") == 1):
            row = cursor.fetchone()
            user_id = str(row[0])
            return(user_id)
        else:
            return('2')

    def get_username(self, user_id):
        if(cursor.execute("SELECT username FROM user WHERE user_id = '"+user_id+"'") == 1):
            row = cursor.fetchone()
            username = str(row[0])
            return(username)
        else:
            return('3')
    
class Plays(UserMixin, db.Model):

    __tablename__ = 'plays'

    play = db.Column(db.String(28))
    play_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)

    def add_play(self, play, user_id):
        if play != None:
            cursor.execute("INSERT INTO plays(play, user_id) VALUES('"+play+"', '"+user_id+"')")
        conn.commit()
        return(True)

    def get_plays(self, user_id):
        playlist, play_id = [], []
        try:
            cursor.execute("SELECT * FROM plays  WHERE user_id = '"+user_id+"'")
            rcount = int(cursor.rowcount)

            for r in range(0,rcount):
                row = cursor.fetchone()
                playlist.append(str(row[0]))
                play_id.append(str(row[1]))
        except:
            print "Error: unable to fecth data"
        return(playlist, play_id)

    def get_play(self, play_id):
        if(cursor.execute("SELECT play FROM plays WHERE play_id = '"+play_id+"'") == 1):
            row = cursor.fetchone()
            play = str(row[0])
            return(play)
        else:
            return('false')

class Players(UserMixin, db.Model):

    __tablename__ = 'players'

    first = db.Column(db.String(28))
    last = db.Column(db.String(28))
    number = db.Column(db.String(28))
    player_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)

    def add_player(self, first, last, number, user_id):
        if(cursor.execute("SELECT * FROM players WHERE (number, user_id) = ('"+number+"', '"+user_id+"')") == 0):
            cursor.execute("INSERT INTO players(first, last, number, user_id) VALUES('"+first+"', '"+last+"', '"+number+"', '"+user_id+"')")
        conn.commit()
        return(True)

    def get_players(self, user_id):
        first, last, number, player_id = [],[],[],[]
        try:
            cursor.execute("SELECT * FROM players  WHERE user_id = '"+user_id+"'")
            rcount = int(cursor.rowcount)

            for r in range(0,rcount):
                row = cursor.fetchone()

                first.append(str(row[0]))
                last.append(str(row[1]))
                number.append(str(row[2]))
                player_id.append(str(row[3]))

        except:
            print "Error: unable to fecth data"
        return(first, last, number, player_id)

    def get_player(self, player_id):
        if(cursor.execute("SELECT last FROM players WHERE player_id = '"+player_id+"'") == 1):
            row = cursor.fetchone()
            player = str(row[0])
            return(player)
        else:
            return('false')

class Game(UserMixin, db.Model):

    __tablename__ = 'possessions'

    game_id = db.Column(db.Integer)
    possession = db.Column(db.Integer, primary_key=True)
    play_id = db.Column(db.Integer)
    player_id = db.Column(db.Integer)
    zone = db.Column(db.Integer)
    result = db.Column(db.String(28))
    user_id = db.Column(db.Integer)

    def add_possession(self, game, possession, play, player, zone, result, user): 
        cursor.execute("INSERT INTO possessions(game_id, possession, play_id, player_id, zone, result, user_id) VALUES('"+game+"', '"+possession+"', '"+play+"', '"+player+"', '"+zone+"', '"+result+"', '"+user+"')") 
        conn.commit()
        return(True)

    def data(self, user, players):
        makes, total, individual_makes, individual_total, ind_used= [],[],{},{},{}
        count = 0
        for player in players:
            temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id) = ('"+user+"', 'make', '"+player+"')")
            temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id) = ('"+user+"', '"+player+"')")
            count += temp2
            if temp2 == 0:
                individual_makes.update([(player, 0)])
            else:
                individual_makes.update([(player, (float(temp)/float(temp2)*100))])
            individual_total.update([(player, temp2)])
        for key in individual_total:
            ind_used.update([(key, float(individual_total[key])/float(count)*100)])
        ind_used = Counter(ind_used)
        individual_makes = Counter(individual_makes)
        try:
            cursor.execute("SELECT * FROM possessions WHERE (user_id, result) = ('"+user+"', 'make')")
            rcount = int(cursor.rowcount)
            for r in range(0,rcount):
                row = cursor.fetchone()
                makes.append(str(row[2]))               
        except:
            print "Error: unable to fecth data"
        try:
            cursor.execute("SELECT * FROM possessions WHERE (user_id) = ('"+user+"')")
            rcount = int(cursor.rowcount)
            for r in range(0,rcount):
                row = cursor.fetchone()
                total.append(str(row[2]))               
        except:
            print "Error: unable to fecth data"
        if(len(total) != 0):
            total = Counter(total)
            makes = Counter(makes)
            efficient, used = {}, {}
            for key in total:
                efficient.update([(key , (float(makes[key])/float(total[key]))*100)])
                used.update([(key, (float(total[key])/float(rcount)*100))])
            efficient = Counter(efficient)
            used = Counter(used)
            return (used, efficient, individual_makes, ind_used)
        else:
            return('None')

    def individual_data(self, user, game, players):
        makes, total, individual_makes, individual_total, ind_used= [],[],{},{},{}
        count = 0
        for player in players:
            temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, game_id) = ('"+user+"', 'make', '"+player+"', '"+game+"')")
            temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, game_id) = ('"+user+"', '"+player+"', '"+game+"')")
            count += temp2
            if temp2 == 0:
                individual_makes.update([(player, 0)])
            else:
                individual_makes.update([(player, (float(temp)/float(temp2)*100))])
            individual_total.update([(player, temp2)])
        print(count)
        for key in individual_total:
            ind_used.update([(key, float(individual_total[key])/float(count)*100)])
        ind_used = Counter(ind_used)
        individual_makes = Counter(individual_makes)
        try:
            cursor.execute("SELECT * FROM possessions WHERE (user_id, result, game_id) = ('"+user+"', 'make', '"+game+"')")
            rcount = int(cursor.rowcount)
            for r in range(0,rcount):
                row = cursor.fetchone()
                makes.append(str(row[2]))               
        except:
            print "No makes"
        try:
            cursor.execute("SELECT * FROM possessions WHERE (user_id, game_id) = ('"+user+"', '"+game+"')")
            rcount = int(cursor.rowcount)
            for r in range(0,rcount):
                row = cursor.fetchone()
                total.append(str(row[2]))               
        except:
            print "No plays"
        if(len(total) != 0):
            total = Counter(total)
            makes = Counter(makes)
            efficient, used = {}, {}
            for key in total:
                efficient.update([(key , (float(makes[key])/float(total[key]))*100)])
                used.update([(key, (float(total[key])/float(rcount)*100))])
            efficient = Counter(efficient)
            used = Counter(used)
            return (used, efficient, individual_makes, ind_used)
        else:
            return({}, {})
        
    def play_data(self, user, play, game, players):
        individual_makes, individual_total, ind_used= {},{},{}
        count = 0
        for player in players:
            if game != None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, game_id, play_id) = ('"+user+"', 'make', '"+player+"', '"+game+"', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, game_id, play_id) = ('"+user+"', '"+player+"', '"+game+"', '"+play+"')")
            else:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, play_id) = ('"+user+"', 'make', '"+player+"', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, play_id) = ('"+user+"', '"+player+"', '"+play+"')")
            count += temp2
            if temp2 == 0:
                individual_makes.update([(player, 0)])
            else:
                individual_makes.update([(player, (float(temp)/float(temp2)*100))])
            individual_total.update([(player, temp2)])
        for key in individual_total:
            ind_used.update([(key, float(individual_total[key])/float(count)*100)])
        ind_used = Counter(ind_used)
        individual_makes = Counter(individual_makes)
        return (individual_makes, ind_used)
        

class NewGame(UserMixin, db.Model):

    __tablename__ = 'games'

    game  = db.Column(db.String(28))
    game_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)

    def add_game(self, game, user):
        if(cursor.execute("SELECT * FROM games WHERE (game, user_id) = ('"+game+"', '"+user+"')") == 0):
            cursor.execute("INSERT INTO games(game, user_id) VALUES('"+game+"', '"+user+"')")
            conn.commit()
            return(True)
        else:
            print('already a game')
            return(False)

    def get_game(self, game, user):    
        cursor.execute("SELECT game_id FROM games WHERE (game, user_id) = ('"+game+"', '"+user+"')")
        row = cursor.fetchone()
        game_id = str(row[0])
        return(game_id)

    def get_game_name(self, game):    
        cursor.execute("SELECT game FROM games WHERE (game_id) = ('"+game+"')")
        row = cursor.fetchone()
        game_name = str(row[0])
        return(game_name)

    def list_games(self, user):
        games, game_id = [],[]
        try:
            cursor.execute("SELECT * FROM games WHERE (user_id) = ('"+user+"')")
            rcount = int(cursor.rowcount)
            for r in range(0,rcount):
                row = cursor.fetchone()
                games.append(str(row[0]))
                game_id.append(str(row[1]))
        except:
            print "Error: unable to fecth data"
        return(games,game_id)