from flask import Flask
from flask import Flask, render_template, request, jsonify, json
from flaskext.mysql import MySQL

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/offense")
def offense():
    return render_template('offense.html')

@app.route("/home")
def home():
    return render_template('home.html')

@app.route("/defense")
def defense():
    return render_template('defense.html')

@app.route("/signup", methods=['GET', 'POST'])
def test():
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
    cursor.execute("INSERT INTO user(user_name, password) VALUES("+"'"+user+"'"+", "+"'"+password+"'"+")")
    conn.commit()
    return render_template('signup.html', user=user, password=password)

if __name__ == "__main__":
    app.run()