from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin,LoginManager
from flaskext.mysql import MySQL
from flask_sqlalchemy import SQLAlchemy
from random import randint
from config import Config
from collections import Counter, OrderedDict
from sqlalchemy.orm import synonym

app = Flask(__name__)
login = LoginManager(app)

app.config.from_object(Config)
mysql = MySQL()
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()
db = SQLAlchemy(app)

class User(UserMixin, db.Model):

    __tablename__ = 'user'

    username = db.Column(db.String(28), index=True, unique=True)
    password = db.Column(db.String(128))
    email = db.Column(db.String(28))
    user_id = db.Column(db.Integer, primary_key=True)
    id = synonym("user_id")

    def create_user(self, username, password, email):
        if (User.query.filter_by(username = username).count()) == 0:
            password = generate_password_hash(password)
            user = User(username = username, password = password, email = email)
            db.session.add(user)
            db.session.commit()
            return(True)
        else:
            return(False)

class Plays(db.Model):

    __tablename__ = 'plays'

    play = db.Column(db.String(28))
    play_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    deleted = db.Column(db.Integer)

    def add_play(self, play, user_id):
        play = Plays(play = play, user_id = user_id, deleted = 0)
        db.session.add(play)
        db.session.commit()
        return(True)

    def edit_play(self, play, user_id, play_id):
        play1 = Plays.query.filter_by(play_id = play_id).first()
        play1.play = play
        db.session.commit()
        return(True)

    def delete_play(self, play_id):
        play = Plays.query.filter_by(play_id = play_id).first()
        play.deleted = 1
        db.session.commit()
        return(True)

    def get_plays(self, user_id):
        playlist, play_id = [], []

        plays = Plays.query.filter_by(user_id = user_id, deleted = 0).all()

        for play in plays:
            playlist.append(str(play.play))
            play_id.append(str(play.play_id))

        return(playlist, play_id)

    def get_deleted_plays(self, user_id):
        playlist, play_id = [], []

        plays = Plays.query.filter_by(user_id = user_id).all()

        for play in plays:
            playlist.append(str(play.play))
            play_id.append(str(play.play_id))

        return(playlist, play_id)

    def get_play(self, play_id):
        play = Plays.query.filter_by(play_id = play_id).first()
        return(str(play.play))

class Players(db.Model):

    __tablename__ = 'players'

    last = db.Column(db.String(28))
    number = db.Column(db.String(28))
    player_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    deleted = db.Column(db.Integer)

    def add_player(self, last, number, user_id):
        if((Players.query.filter_by(user_id = user_id, number = number).count()) == 0):
            player = Players(last = last, number = number, user_id = user_id, deleted = 0)
            db.session.add(player)
            db.session.commit()
        return(True)

    def edit_player(self, last, number, user_id, player_id):
        player = Players.query.filter_by(player_id = player_id).first()
        player.last = last
        player.number = number
        db.session.commit()
        return(True)

    def delete_player(self, player_id):
        player = Players.query.filter_by(player_id = player_id).first()
        player.deleted = 1
        db.session.commit()
        return(True)

    def get_players(self, user_id):
        last, number, player_id = [],[],[]
        players = Players.query.filter_by(user_id = user_id, deleted = 0).all()
        for player in players:

            last.append(str(player.last))
            number.append(str(player.number))
            player_id.append(str(player.player_id))

        return(last, number, player_id)

    def get_deleted_players(self, user_id):
        last, number, player_id = [],[],[]
        players = Players.query.filter_by(user_id = user_id).all()
        for player in players:

            last.append(str(player.last))
            number.append(str(player.number))
            player_id.append(str(player.player_id))

        return(last, number, player_id)

    def get_player(self, player_id):
        player = Players.query.filter_by(player_id = player_id).first()
        return(str(player.last))

    def get_number(self, player_id):
        player = Players.query.filter_by(player_id = player_id).first()
        return(str(player.number))

class Game(db.Model):

    __tablename__ = 'possessions'

    game_id = db.Column(db.Integer)
    possession = db.Column(db.Integer, primary_key=True)
    play_id = db.Column(db.Integer)
    player_id = db.Column(db.Integer)
    zone = db.Column(db.Integer)
    result = db.Column(db.String(28))
    user_id = db.Column(db.Integer)


    def delete_game(self, game_id):
        games = Game.query.filter_by(game_id = game_id).all()
        for game in games:
            db.session.delete(game)
            db.session.commit()
        return(True)

    def edit_possession(self, possession, play_id, player_id, zone, result, game_id):
        possession1 = Game.query.filter_by(game_id = game_id, possession = possession).first()
        possession1.play_id = play_id
        possession1.player_id = player_id
        possession1.result = result
        possession1.zone = zone
        db.session.commit()
        return(True)

    def add_possession(self, game_id, possession, play_id, player_id, zone, result, user_id): 
        pos = Game(game_id = game_id, possession = possession, play_id = play_id, player_id = player_id, zone = zone, user_id = user_id)
        db.session.add(pos)
        db.session.commit()
        return(True)

    def zones_plays(self, user_id, players, play, game):
        zone = 1
        count = 0
        individual_makes, individual_total, ind_used=[], [], []
        while(zone<=12):
            if game == None and play != None:
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', play_id = play).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, play_id = play).count()
            elif game == None and play == None:
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make').count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id).count()
            elif(game != None and play != None):
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', play_id = play, game_id = game).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, player_id = play, game_id = game).count()
            elif(game != None and play == None):
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', game_id = game).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, game_id = game).count()
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

    def zones_players(self, user_id, plays, player, game):
        zone = 1
        count = 0
        individual_makes, individual_total, ind_used=[], [], []
        while(zone<=12):
            if game == None and player != None:
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', player_id = player).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, player_id = player).count()
            elif game == None and player == None:
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make').count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id).count()
            elif(game != None and player != None):
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', player_id = player, game_id = game).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, player_id = player, game_id = game).count()
            elif(game != None and player == None):
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', game_id = game).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, game_id = game).count()
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

        data = Game.query.filter_by(user_id = user_id, game_id = game_id).all()

        for d in data:
            possession.append(str(d.possession))
            play.append(str(d.play_id))
            player.append(str(d.player_id))
            zone.append(str(d.zone))
            result.append(str(d.result))
        return(possession, play, player, zone, result)

    def zones_both(self, user_id, play, player, game):
        zone = 1
        count = 0
        individual_makes, individual_total, ind_used=[], [], []
        while(zone<=12):
            if game == None:
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', player_id = player, play_id = play).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, player_id = player, play_id = play).count()
            elif(game != None):
                temp = Game.query.filter_by(zone = zone, game_id = game, user_id = user_id, result = 'make', player_id = player, play_id = play).count()
                temp2 = Game.query.filter_by(zone = zone, game_id = game, user_id = user_id, player_id = player, play_id = play).count()
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

    
    def data(self, user_id, players, plays, zone):
        makes, used, total, individual_makes, individual_total, ind_used= {},{},{},{},{},{}
        count = 0
        for player in players:
            if zone == None:
                temp = Game.query.filter_by(user_id = user_id, result = 'make', player_id = player).count()
                temp2 = Game.query.filter_by(user_id = user_id, player_id = player).count()
            else:
                temp = Game.query.filter_by(user_id = user_id, result = 'make', player_id = player, zone = zone).count()
                temp2 = Game.query.filter_by(user_id = user_id, player_id = player, zone = zone).count()
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
                temp = Game.query.filter_by(user_id = user_id, result = 'make', play_id = play).count()
                temp2 = Game.query.filter_by(user_id = user_id, play_id = play).count()
            else:
                temp = Game.query.filter_by(user_id = user_id, result = 'make', play_id = play, zone = zone).count()
                temp2 = Game.query.filter_by(user_id = user_id, play_id = play, zone = zone).count()
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


    def individual_data(self, user_id, game, players, zone):
        makes, total, individual_makes, individual_total, ind_used= [],[],{},{},{}
        count = 0
        for player in players:
            if zone == None:
                temp = Game.query.filter_by(game_id = game, user_id = user_id, result = 'make', player_id = player).count()
                temp2 = Game.query.filter_by(game_id = game, user_id = user_id, player_id = player).count()
            else:
                temp = Game.query.filter_by(zone = zone, game_id = game, user_id = user_id, result = 'make', player_id = player).count()
                temp2 = Game.query.filter_by(zone = zone, game_id = game, user_id = user_id, player_id = player).count()
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
            pos = Game.query.filter_by(user_id = user_id, result = 'make', game_id = game).all()
            for p in pos:
                makes.append(p.play_id)             

            pos = Game.query.filter_by(user_id = user_id, game_id = game).all()
            for p in pos:
                total.append(p.play_id) 

            length = Game.query.filter_by(user_id = user_id, game_id = game).count()            

        else:

            pos = Game.query.filter_by(user_id = user_id, result = 'make', game_id = game, zone = zone).all()
            for p in pos:
                makes.append(p.play_id)               

            pos = Game.query.filter_by(user_id = user_id, game_id = game, zone = zone).all()
            for p in pos:
                total.append(p.play_id)               

            length = Game.query.filter_by(user_id = user_id, game_id = game, zone = zone).count()

        total = Counter(total)
        makes = Counter(makes)
        efficient, used = {}, {}
        for key in total:
            efficient.update([(key , round(float(makes[key])/float(total[key])*100,1))])
            used.update([(key, round(float(total[key])/float(length)*100,1))])
        efficient = Counter(efficient)
        used = Counter(used)
        return (used, efficient, individual_makes, ind_used)

        
    def play_data(self, user_id, play, game, players, zone):
        individual_makes, individual_total, ind_used= {},{},{}
        count = 0
        for player in players:
            if game != None and zone == None:
                temp = Game.query.filter_by(game_id = game, user_id = user_id, result = 'make', player_id = player, play_id = play).count()
                temp2 = Game.query.filter_by(game_id = game, user_id = user_id, player_id = player, play_id = play).count()
            elif game != None and zone != None:
                temp = Game.query.filter_by(game_id = game, user_id = user_id, result = 'make', player_id = player, play_id = play, zone = zone).count()
                temp2 = Game.query.filter_by(game_id = game, user_id = user_id, player_id = player, play_id = play, zone = zone).count()    
            elif game == None and zone == None:
                temp = Game.query.filter_by(user_id = user_id, result = 'make', player_id = player, play_id = play).count()
                temp2 = Game.query.filter_by(user_id = user_id, player_id = player, play_id = play).count()
            elif game == None and zone != None:
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', player_id = player, play_id = play).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, player_id = player, play_id = play).count()         
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

    def player_data(self, user_id, player, game, plays, zone):
        individual_makes, individual_total, ind_used= {},{},{}
        count = 0
        for play in plays:
            if game != None and zone == None:
                temp = Game.query.filter_by(game_id = game, user_id = user_id, result = 'make', player_id = player, play_id = play).count()
                temp2 = Game.query.filter_by(game_id = game, user_id = user_id, player_id = player, play_id = play).count()
            elif game != None and zone != None:
                temp = Game.query.filter_by(game_id = game, user_id = user_id, result = 'make', player_id = player, play_id = play, zone = zone).count()
                temp2 = Game.query.filter_by(game_id = game, user_id = user_id, player_id = player, play_id = play, zone = zone).count()    
            elif game == None and zone == None:
                temp = Game.query.filter_by(user_id = user_id, result = 'make', player_id = player, play_id = play).count()
                temp2 = Game.query.filter_by(user_id = user_id, player_id = player, play_id = play).count()
            elif game == None and zone != None:
                temp = Game.query.filter_by(zone = zone, user_id = user_id, result = 'make', player_id = player, play_id = play).count()
                temp2 = Game.query.filter_by(zone = zone, user_id = user_id, player_id = player, play_id = play).count() 
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
        

class NewGame(db.Model):

    __tablename__ = 'games'

    game  = db.Column(db.String(28))
    game_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    date = db.Column(db.Date)

    def add_game(self, game, user_id, date):
        game = NewGame(game = game, user_id = user_id, date = date)
        db.session.add(game)
        db.session.commit()
        return(True)

    def get_game(self, game, user_id):    
        game = NewGame.query.filter_by(game = game, user_id = user_id).first()
        return(game.game_id)

    def get_game_name(self, game_id):    
        game = NewGame.query.filter_by(game_id = game_id).first()
        return(game.game)

    def get_date(self, game_id):    
        game = NewGame.query.filter_by(game_id = game_id).first()
        return(game.date)

    def list_games(self, user_id):
        games, game_id, date = [],[],[]

        games1 = NewGame.query.filter_by(user_id = user_id).all()
        for game in games1:
            games.append(str(game.game))
            game_id.append(str(game.game_id))
            date.append(str(game.date))

        return(games,game_id,date)

    def delete_game(self, game_id):
        game = NewGame.query.filter_by(game_id = game_id).first()
        db.session.delete(game)
        db.session.commit()
        return(True)