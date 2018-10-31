from flask import Flask
from flask import Flask, render_template, request, jsonify, json, session
from flaskext.mysql import MySQL
import os

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def index():
    if not session.get('logged_in'):
        user = str(request.form.get('user'))
        password = str(request.form.get('password'))
        mysql = MySQL()
        app.config['MYSQL_DATABASE_USER'] = 'root'
        app.config['MYSQL_DATABASE_PASSWORD'] = 'Rufus1209'
        app.config['MYSQL_DATABASE_DB'] = 'chart'
        app.config['MYSQL_DATABASE_HOST'] = 'localhost'
        mysql.init_app(app)
        conn = mysql.connect()
        cursor = conn.cursor()
        execute = "SELECT * FROM user WHERE username = "+"'"+user+"'"+" and password = "+"'"+password+"'"
        if(cursor.execute(execute) == 1):
            session['logged_in'] = True
            print('we made it')
        else:
            print('signin failed')
        return render_template('index.html')
    else:
        return render_template('home.html')

@app.route("/offense", methods=['GET', 'POST'])
def offense():
    first, last, number, play = [],[],[],[]
    playName = str(request.form.get('play'))
    player = str(request.form.get('player'))
    zone = str(request.form.get('zone'))
    result = str(request.form.get('result'))
    mysql = MySQL()
    app.config['MYSQL_DATABASE_USER'] = 'root'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'Rufus1209'
    app.config['MYSQL_DATABASE_DB'] = 'chart'
    app.config['MYSQL_DATABASE_HOST'] = 'localhost'
    mysql.init_app(app)
    conn = mysql.connect()
    cursor = conn.cursor()
    players = "SELECT * FROM user_id"
    plays = "SELECT * FROM plays"
    execute = "INSERT INTO possessions(play, player, zone, result) VALUES('"+playName+"', '"+player+"', '"+zone+"', '"+result+"')"
    cursor.execute(execute)
    try:
        cursor.execute(players)
        rcount = int(cursor.rowcount)

        for r in range(0,rcount):
            row = cursor.fetchone()

            first.append(str(row[0]))
            last.append(str(row[1]))
            number.append(str(row[2]))

    except:
        print "Error: unable to fecth data"

    try:
        cursor.execute(plays)
        rcount = int(cursor.rowcount)

        for r in range(0,rcount):
            row = cursor.fetchone()

            play.append(str(row[0]))

    except:
        print "Error: unable to fecth data"
    conn.commit()
    return render_template('offense.html', first = first, last = last, number = number, play = play)

@app.route("/addplayer", methods=['GET', 'POST'])
def addplayer():
    first = str(request.form.get('first'))
    last = str(request.form.get('last'))
    number = str(request.form.get('number'))
    mysql = MySQL()
    app.config['MYSQL_DATABASE_USER'] = 'root'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'Rufus1209'
    app.config['MYSQL_DATABASE_DB'] = 'chart'
    app.config['MYSQL_DATABASE_HOST'] = 'localhost'
    mysql.init_app(app)
    conn = mysql.connect()
    cursor = conn.cursor()
    execute = "SELECT * FROM user_id WHERE number = '"+number+"'"
    print execute
    test = cursor.execute(execute)
    if (test == 0):
        execute = "INSERT INTO user_id(first, last, number) VALUES('"+first+"', '"+last+"', '"+number+"')"
        cursor.execute(execute)
        success = 'true'
    else:
        success = 'false'
        print("this number already exists")
    conn.commit()
    return render_template('addplayer.html')

@app.route("/addplay", methods=['GET', 'POST'])
def addplay():
    play = str(request.form.get('play'))
    mysql = MySQL()
    app.config['MYSQL_DATABASE_USER'] = 'root'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'Rufus1209'
    app.config['MYSQL_DATABASE_DB'] = 'chart'
    app.config['MYSQL_DATABASE_HOST'] = 'localhost'
    mysql.init_app(app)
    conn = mysql.connect()
    cursor = conn.cursor()
    execute = "SELECT * FROM plays WHERE play = '"+play+"'"
    print execute
    test = cursor.execute(execute)
    if (test == 0):
        execute = "INSERT INTO plays(play) VALUES('"+play+"')"
        cursor.execute(execute)
        success = 'true'
    else:
        success = 'false'
        print("this play already exists")
    conn.commit()
    return render_template('addplay.html')

@app.route("/defense")
def defense():
    return render_template('defense.html')

@app.route("/home")
def home():
    print(str(request.form.get('signout')))
    if (str(request.form.get('signout')) == 'true'):
        session['logged_in'] = False
    else:
        print('do nothing')
    return render_template('home.html')

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    user = str(request.form.get('user'))
    password = str(request.form.get('password'))
    mysql = MySQL()
    app.config['MYSQL_DATABASE_USER'] = 'root'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'Rufus1209'
    app.config['MYSQL_DATABASE_DB'] = 'chart'
    app.config['MYSQL_DATABASE_HOST'] = 'localhost'
    mysql.init_app(app)
    conn = mysql.connect()
    cursor = conn.cursor()
    execute = "SELECT * FROM user WHERE username = "+"'"+user+"'"
    print execute
    test = cursor.execute(execute)
    if (test == 0):
        execute = "INSERT INTO user(username, password, id) VALUES('"+user+"', '"+password+"', 1)"
        cursor.execute(execute)
        success = 'true'
    else:
        success = 'false'
        print("this user name already exists")
    conn.commit()
    return render_template('signup.html', user=user, password=password, success=success)

if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run()