from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin,LoginManager
from flaskext.mysql import MySQL
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from random import randint
from config import Config

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
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<User {}>'.format(self.username) 

    def check_password(self, my_hash, password):
        return check_password_hash(my_hash, password)

    def create_user(self, user, password):
        password_hash = generate_password_hash(password)
        test = cursor.execute("SELECT * FROM user WHERE username = '"+user+"'")
        if (test == 0 and user != 'None'):
            test = 1
            while (test == 1):
                id = randint(100000,999999)
                id = str(id)
                test = cursor.execute("SELECT * FROM user WHERE id = '"+id+"'")
            cursor.execute("INSERT INTO user(username, password, id) VALUES('"+user+"', '"+password_hash+"', '"+id+"')")
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
            return('false')

    def get_user_id(self, username):
        if(cursor.execute("SELECT id FROM user WHERE username = '"+username+"'") == 1):
            row = cursor.fetchone()
            user_id = str(row[0])
            return(user_id)
        else:
            return('false')

    def get_username(self, user_id):
        if(cursor.execute("SELECT username FROM user WHERE id = '"+user_id+"'") == 1):
            row = cursor.fetchone()
            username = str(row[0])
            return(username)
        else:
            return('false')
    
class Plays(UserMixin, db.Model):

    __tablename__ = 'plays'

    play = db.Column(db.String(28))
    id = db.Column(db.Integer, primary_key=True)

    def add_play(self, play, user_id):
        if play != None:
            cursor.execute("INSERT INTO plays(play, user) VALUES('"+play+"', '"+user_id+"')")
        conn.commit()
        return(True)

    def get_plays(self, user_id):
        playlist = []
        try:
            cursor.execute("SELECT * FROM plays  WHERE user = '"+user_id+"'")
            rcount = int(cursor.rowcount)

            for r in range(0,rcount):
                row = cursor.fetchone()
                playlist.append(str(row[0]))
        except:
            print "Error: unable to fecth data"
        return(playlist)

class Players(UserMixin, db.Model):

    __tablename__ = 'players'

    first = db.Column(db.String(28))
    last = db.Column(db.String(28))
    number = db.Column(db.String(28), unique=True)
    id = db.Column(db.Integer, primary_key=True)

    def add_player(self, first, last, number, user_id):
        if(cursor.execute("SELECT * FROM players WHERE (number, user) = ('"+number+"', '"+user_id+"')") == 0):
            cursor.execute("INSERT INTO players(first, last, number, user) VALUES('"+first+"', '"+last+"', '"+number+"', '"+user_id+"')")
        conn.commit()
        return(True)

    def get_players(self, user_id):
        first, last, number = [],[],[]
        try:
            cursor.execute("SELECT * FROM players  WHERE user = '"+user_id+"'")
            rcount = int(cursor.rowcount)

            for r in range(0,rcount):
                row = cursor.fetchone()

                first.append(str(row[0]))
                last.append(str(row[1]))
                number.append(str(row[2]))

        except:
            print "Error: unable to fecth data"
        return(first, last, number)

class Game(UserMixin, db.Model):

    __tablename__ = 'posessions'

    play = db.Column(db.String(28))
    player = db.Column(db.String(28))
    zone = db.Column(db.String(28))
    result = db.Column(db.Integer, primary_key=True)

    def add_possession(self, play, player, zone, result):    
        cursor.execute("INSERT INTO possessions(play, player, zone, result) VALUES('"+play+"', '"+player+"', '"+zone+"', '"+result+"')")
        conn.commit()
        return(True)