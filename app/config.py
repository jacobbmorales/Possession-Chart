import os
import logging
import inspect

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_strong_key')
    MYSQL_DATABASE_USER = 'jacob.morales@focus.org'
    MYSQL_DATABASE_PASSWORD = 'Rufus1209'
    MYSQL_DATABASE_DB = 'mydb'
    CLEARDB_DATABASE_URL = 'mysql://b91af171564b1c:a818600b@us-cdbr-iron-east-03.cleardb.net/heroku_e927b2471f3d26b?reconnect=true'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = 'False'