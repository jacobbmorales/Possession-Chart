from flask import Flask
from flask import Flask, render_template, request
from flask_mysql import MySQL

app = Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'jacob.morales@focus.org'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Rufus1209'
app.config['MYSQL_DATABASE_DB'] = 'chart'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()

@app.route("/",methods=['POST'])
def main():
    _user = request.form[data[0]]
    _password = request.form[data[1]]
    cursor.callproc('sp_validateLogin',(_user, _password))
    if _user and _password:
        return render_template('index.html')
    else:
        return render_template('offense.html')

@app.route("/offense")
def offense():
    return render_template('offense.html')

@app.route("/home")
def home():
    return render_template('home.html')

@app.route("/defense")
def defense():
    return render_template('defense.html')

@app.route("/signup")
def signup():
    return render_template('signup.html')

if __name__ == "__main__":
    app.run()