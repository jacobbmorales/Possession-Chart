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

    def create_user(self, user, password, email):
        password_hash = generate_password_hash(password)
        test = cursor.execute("SELECT * FROM user WHERE username = '"+user+"'")
        if (test == 0 and user != 'None'):
            cursor.execute("INSERT INTO user(username, password, email) VALUES('"+user+"', '"+password_hash+"', '"+email+"')")
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
            cursor.execute("INSERT INTO plays(play, user_id, deleted) VALUES('"+play+"', '"+user_id+"', '0')")
        conn.commit()
        return(True)

    def edit_play(self, play, user_id, play_id):
        cursor = conn.cursor()
        cursor.execute("UPDATE plays SET play = '"+play+"' WHERE play_id = '"+play_id+"'")
        conn.commit()
        cursor.close()
        return(True)

    def delete_play(self, play_id):
        cursor = conn.cursor()
        cursor.execute("UPDATE plays SET deleted = '"+'1'+"' WHERE play_id = '"+play_id+"'")
        conn.commit()
        cursor.close()
        return(True)

    def get_plays(self, user_id):
        playlist, play_id = [], []
        try:
            cursor.execute("SELECT * FROM plays  WHERE (user_id, deleted) = ('"+user_id+"', 0)")
            rcount = int(cursor.rowcount)

            for r in range(0,rcount):
                row = cursor.fetchone()
                playlist.append(str(row[0]))
                play_id.append(str(row[1]))
        except:
            print "Error: unable to fecth data"
        return(playlist, play_id)

    def get_deleted_plays(self, user_id):
        playlist, play_id = [], []
        try:
            cursor.execute("SELECT * FROM plays  WHERE (user_id) = ('"+user_id+"')")
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

    def add_player(self, last, number, user_id):
        if(cursor.execute("SELECT * FROM players WHERE (number, user_id) = ('"+number+"', '"+user_id+"')") == 0):
            cursor.execute("INSERT INTO players(last, number, user_id, deleted) VALUES('"+last+"', '"+number+"', '"+user_id+"', 0)")
        conn.commit()
        return(True)

    def edit_player(self, name, number, user_id, player_id):
        cursor = conn.cursor()
        cursor.execute("UPDATE players SET last = '"+name+"', number = '"+number+"' WHERE player_id = '"+player_id+"'")
        conn.commit()
        cursor.close()
        return(True)

    def delete_player(self, player_id):
        cursor = conn.cursor()
        cursor.execute("UPDATE players SET deleted = '"+'1'+"' WHERE player_id = '"+player_id+"'")
        conn.commit()
        cursor.close()
        return(True)

    def get_players(self, user_id):
        last, number, player_id = [],[],[]
        try:
            cursor.execute("SELECT * FROM players  WHERE (user_id, deleted) = ('"+user_id+"', 0)")
            rcount = int(cursor.rowcount)

            for r in range(0,rcount):
                row = cursor.fetchone()

                last.append(str(row[0]))
                number.append(str(row[1]))
                player_id.append(str(row[2]))

        except:
            print "Error: unable to fecth data"
        return(last, number, player_id)

    def get_deleted_players(self, user_id):
        last, number, player_id = [],[],[]
        try:
            cursor.execute("SELECT * FROM players  WHERE (user_id) = ('"+user_id+"')")
            rcount = int(cursor.rowcount)

            for r in range(0,rcount):
                row = cursor.fetchone()

                last.append(str(row[0]))
                number.append(str(row[1]))
                player_id.append(str(row[2]))

        except:
            print "Error: unable to fecth data"
        return(last, number, player_id)

    def get_player(self, player_id):
        if(cursor.execute("SELECT last FROM players WHERE player_id = '"+player_id+"'") == 1):
            row = cursor.fetchone()
            player = str(row[0])
            return(player)
        else:
            return('false')

    def get_number(self, player_id):
        if(cursor.execute("SELECT number FROM players WHERE player_id = '"+player_id+"'") == 1):
            row = cursor.fetchone()
            number = str(row[0])
            return(number)
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


    def delete_game(self, game):
        cursor.execute("DELETE FROM possessions WHERE (game_id) = ('"+game+"')")
        return(True)

    def edit_possession(self, possession, play, player, zone, result, game):
        cursor = conn.cursor()
        conn.commit()
        cursor.execute("UPDATE possessions SET play_id = '"+play+"', player_id = '"+player+"', zone = '"+zone+"', result = '"+result+"' WHERE possession = '"+possession+"' and game_id  = '"+game+"'")
        cursor.close()
        return(True)

    def add_possession(self, game, possession, play, player, zone, result, user): 
        cursor.execute("INSERT INTO possessions(game_id, possession, play_id, player_id, zone, result, user_id) VALUES('"+game+"', '"+possession+"', '"+play+"', '"+player+"', '"+zone+"', '"+result+"', '"+user+"')") 
        conn.commit()
        return(True)

    def zones_plays(self, user, players, play, game):
        zone = 1
        count = 0
        individual_makes, individual_total, ind_used=[], [], []
        while(zone<=12):
            if game == None and play != None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result, play_id) = ('"+str(zone)+"', '"+user+"', 'make', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, play_id) = ('"+str(zone)+"', '"+user+"', '"+play+"')")
            elif game == None and play == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result) = ('"+str(zone)+"', '"+user+"', 'make')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id) = ('"+str(zone)+"', '"+user+"')")
            elif(game != None and play != None):
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result, play_id, game_id) = ('"+str(zone)+"', '"+user+"', 'make', '"+play+"', '"+game+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, play_id, game_id) = ('"+str(zone)+"', '"+user+"', '"+play+"', '"+game+"')")
            elif(game != None and play == None):
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result, game_id) = ('"+str(zone)+"', '"+user+"', 'make', '"+game+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, game_id) = ('"+str(zone)+"', '"+user+"', '"+game+"')")
            count += temp2
            if temp2 == 0:
                individual_makes.append(0)
            else:
                individual_makes.append(round(float(temp)/float(temp2)*100,1))
            individual_total.append(temp2)
            zone+=1
        zone = 0
        while(zone<=11):
            if count == 0:
                ind_used.append(0)
            else:
                ind_used.append(round(float(individual_total[zone])/float(count)*100,1))
            zone+=1
        return (individual_makes, ind_used)

    def zones_players(self, user, plays, player, game):
        zone = 1
        count = 0
        individual_makes, individual_total, ind_used=[], [], []
        while(zone<=12):
            if game == None and player != None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result, player_id) = ('"+str(zone)+"', '"+user+"', 'make', '"+player+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, player_id) = ('"+str(zone)+"', '"+user+"', '"+player+"')")
            elif game == None and player == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result) = ('"+str(zone)+"', '"+user+"', 'make')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id) = ('"+str(zone)+"', '"+user+"')")
            elif(game != None and player != None):
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result, player_id, game_id) = ('"+str(zone)+"', '"+user+"', 'make', '"+player+"', '"+game+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, player_id, game_id) = ('"+str(zone)+"', '"+user+"', '"+player+"', '"+game+"')")
            elif(game != None and player == None):
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result, game_id) = ('"+str(zone)+"', '"+user+"', 'make', '"+game+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, game_id) = ('"+str(zone)+"', '"+user+"', '"+game+"')")
            count += temp2
            if temp2 == 0:
                individual_makes.append(0)
            else:
                individual_makes.append(round(float(temp)/float(temp2)*100,1))
            individual_total.append(temp2)
            zone+=1
        zone = 0
        while(zone<=11):
            if count == 0:
                ind_used.append(0)
            else:
                ind_used.append(round(float(individual_total[zone])/float(count)*100,1))
            zone+=1
        return (individual_makes, ind_used)

    def game_data(self, user_id, game_id):
        possession, play, player, zone, result = [],[],[],[],[]
        try:
            cursor.execute("SELECT * FROM possessions WHERE (user_id, game_id) = ('"+user_id+"', '"+game_id+"')")
            rcount = int(cursor.rowcount)
            for r in range(0,rcount):
                row = cursor.fetchone()
                possession.append(str(row[1]))
                play.append(str(row[2]))
                player.append(str(row[3]))
                zone.append(str(row[4]))
                result.append(str(row[5]))
        except:
            print('this is cooked')
        return(possession, play, player, zone, result)

    def zones_both(self, user, play, player, game):
        zone = 1
        count = 0
        individual_makes, individual_total, ind_used=[], [], []
        while(zone<=12):
            if game == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result, player_id, play_id) = ('"+str(zone)+"', '"+user+"', 'make', '"+player+"', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, player_id, play_id) = ('"+str(zone)+"', '"+user+"', '"+player+"', '"+play+"')")
            elif(game != None):
                temp = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, result, player_id, game_id, play_id) = ('"+str(zone)+"', '"+user+"', 'make', '"+player+"', '"+game+"', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (zone, user_id, player_id, game_id, play_id) = ('"+str(zone)+"', '"+user+"', '"+player+"', '"+game+"', '"+play+"')")
            count += temp2
            if temp2 == 0:
                individual_makes.append(0)
            else:
                individual_makes.append(round(float(temp)/float(temp2)*100,1))
            individual_total.append(temp2)
            zone+=1
        zone = 0
        while(zone<=11):
            if count == 0:
                ind_used.append(0)
            else:
                ind_used.append(round(float(individual_total[zone])/float(count)*100,1))
            zone+=1
        return (individual_makes, ind_used)

    
    def data(self, user, players, plays, zone):
        makes, used, total, individual_makes, individual_total, ind_used= {},{},{},{},{},{}
        count = 0
        for player in players:
            if zone == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id) = ('"+user+"', 'make', '"+player+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id) = ('"+user+"', '"+player+"')")
            else:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, zone) = ('"+user+"', 'make', '"+player+"', '"+zone+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, zone) = ('"+user+"', '"+player+"', '"+zone+"')")
            count += temp2
            if temp2 == 0:
                individual_makes.update([(player, 0)])
            else:
                individual_makes.update([(player, round((float(temp)/float(temp2)*100), 1))])
            individual_total.update([(player, temp2)])
        for key in individual_total:
            if count!=0:
                ind_used.update([(key, round((float(individual_total[key])/float(count)*100),1))])
            else:
                ind_used.update([(key, 0)])
        ind_used = Counter(ind_used)
        individual_makes = Counter(individual_makes)
        count = 0
        for play in plays:
            if zone == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, play_id) = ('"+user+"', 'make', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, play_id) = ('"+user+"', '"+play+"')")
            else:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, play_id, zone) = ('"+user+"', 'make', '"+play+"', '"+zone+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, play_id, zone) = ('"+user+"', '"+play+"', '"+zone+"')")
            count += temp2
            if temp2 == 0:
                makes.update([(play, 0)])
            else:
                makes.update([(play, round((float(temp)/float(temp2)*100), 1))])
            total.update([(play, temp2)])
        for key in total:
            if count!=0:
                used.update([(key, round((float(total[key])/float(count)*100),1))])
            else:
                used.update([(key, 0)])
        used = Counter(used)
        makes = Counter(makes)
        return (used, makes, individual_makes, ind_used)


    def individual_data(self, user, game, players, zone):
        makes, total, individual_makes, individual_total, ind_used= [],[],{},{},{}
        count = 0
        for player in players:
            if zone == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, game_id) = ('"+user+"', 'make', '"+player+"', '"+game+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, game_id) = ('"+user+"', '"+player+"', '"+game+"')")
            else:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, game_id, zone) = ('"+user+"', 'make', '"+player+"', '"+game+"', '"+zone+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, game_id, zone) = ('"+user+"', '"+player+"', '"+game+"', '"+zone+"')")
            count += temp2
            if temp2 != 0:
                individual_makes.update([(player, round((float(temp)/float(temp2)*100),1))])              
                individual_total.update([(player, temp2)])
        for key in individual_total:
            if count != 0:
                ind_used.update([(key, round(float(individual_total[key])/float(count)*100,1))])
        ind_used = Counter(ind_used)
        individual_makes = Counter(individual_makes)
        if zone == None:
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
        else:
            try:
                    cursor.execute("SELECT * FROM possessions WHERE (user_id, result, game_id, zone) = ('"+user+"', 'make', '"+game+"', '"+zone+"')")
                    rcount = int(cursor.rowcount)
                    for r in range(0,rcount):
                        row = cursor.fetchone()
                        makes.append(str(row[2]))               
            except:
                print "No makes"
            try:
                cursor.execute("SELECT * FROM possessions WHERE (user_id, game_id, zone) = ('"+user+"', '"+game+"', '"+zone+"')")
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
                efficient.update([(key , round(float(makes[key])/float(total[key])*100,1))])
                used.update([(key, round(float(total[key])/float(rcount)*100,1))])
            efficient = Counter(efficient)
            used = Counter(used)
            return (used, efficient, individual_makes, ind_used)
        else:
            return({}, {}, {}, {})
        
    def play_data(self, user, play, game, players, zone):
        individual_makes, individual_total, ind_used= {},{},{}
        count = 0
        for player in players:
            if game != None and zone == None:
                    temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, game_id, play_id) = ('"+user+"', 'make', '"+player+"', '"+game+"', '"+play+"')")
                    temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, game_id, play_id) = ('"+user+"', '"+player+"', '"+game+"', '"+play+"')")
            elif game != None and zone != None:
                    temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, game_id, play_id, zone) = ('"+user+"', 'make', '"+player+"', '"+game+"', '"+play+"', '"+zone+"')")
                    temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, game_id, play_id, zone) = ('"+user+"', '"+player+"', '"+game+"', '"+play+"', '"+zone+"')")    
            elif game == None and zone == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, play_id) = ('"+user+"', 'make', '"+player+"', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, play_id) = ('"+user+"', '"+player+"', '"+play+"')")
            elif game == None and zone != None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, play_id, zone) = ('"+user+"', 'make', '"+player+"', '"+play+"', '"+zone+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, play_id, zone) = ('"+user+"', '"+player+"', '"+play+"', '"+zone+"')")          
            count += temp2
            if temp2 != 0:
                individual_makes.update([(player, round((float(temp)/float(temp2)*100),1))])
                individual_total.update([(player, temp2)])
        for key in individual_total:
            if count != 0:
                ind_used.update([(key, round(float(individual_total[key])/float(count)*100,1))])
            else:
                ind_used.update([(key, round(0,1))])
        ind_used = Counter(ind_used)
        individual_makes = Counter(individual_makes)
        return (individual_makes, ind_used)

    def player_data(self, user, player, game, plays, zone):
        individual_makes, individual_total, ind_used= {},{},{}
        count = 0
        for play in plays:
            if game != None and zone == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, game_id, play_id) = ('"+user+"', 'make', '"+player+"', '"+game+"', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, game_id, play_id) = ('"+user+"', '"+player+"', '"+game+"', '"+play+"')")
            elif game != None and zone != None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, game_id, play_id, zone) = ('"+user+"', 'make', '"+player+"', '"+game+"', '"+play+"', '"+zone+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, game_id, play_id, zone) = ('"+user+"', '"+player+"', '"+game+"', '"+play+"', '"+zone+"')")    
            elif game == None and zone == None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, play_id) = ('"+user+"', 'make', '"+player+"', '"+play+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, play_id) = ('"+user+"', '"+player+"', '"+play+"')")
            elif game == None and zone != None:
                temp = cursor.execute("SELECT * FROM possessions WHERE (user_id, result, player_id, play_id, zone) = ('"+user+"', 'make', '"+player+"', '"+play+"', '"+zone+"')")
                temp2 = cursor.execute("SELECT * FROM possessions WHERE (user_id, player_id, play_id, zone) = ('"+user+"', '"+player+"', '"+play+"', '"+zone+"')")          
          
            count += temp2
            if temp2 != 0:
                individual_makes.update([(play, round((float(temp)/float(temp2)*100),1))])    
                individual_total.update([(play, temp2)])
        for key in individual_total:
            if count != 0:
                ind_used.update([(key, round(float(individual_total[key])/float(count)*100,1))])
            else:
                ind_used.update([(key, round(0,1))])
        ind_used = Counter(ind_used)
        individual_makes = Counter(individual_makes)
        return (individual_makes, ind_used)
        

class NewGame(UserMixin, db.Model):

    __tablename__ = 'games'

    game  = db.Column(db.String(28))
    game_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)

    def add_game(self, game, user, date):
        if(cursor.execute("SELECT * FROM games WHERE (game, user_id) = ('"+game+"', '"+user+"')") == 0):
            cursor.execute("INSERT INTO games(game, user_id, date) VALUES('"+game+"', '"+user+"', '"+date+"')")
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

    def get_date(self, game):    
        cursor.execute("SELECT date FROM games WHERE (game_id) = ('"+game+"')")
        row = cursor.fetchone()
        date = str(row[0])
        return(date)

    def list_games(self, user):
        games, game_id, date = [],[],[]
        try:
            cursor.execute("SELECT * FROM games WHERE (user_id) = ('"+user+"')")
            rcount = int(cursor.rowcount)
            for r in range(0,rcount):
                row = cursor.fetchone()
                games.append(str(row[0]))
                game_id.append(str(row[1]))
                date.append(str(row[2]))
        except:
            print "Error: unable to fecth data"
        return(games,game_id,date)

    def delete_game(self, game):
        cursor.execute("DELETE FROM games WHERE (game_id) = ('"+game+"')")
        return(True)