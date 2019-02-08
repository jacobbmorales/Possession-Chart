import os
import logging
import inspect

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_strong_key')
    MYSQL_DATABASE_USER = 'b91af171564b1c'
    MYSQL_DATABASE_PASSWORD = 'a818600b'
    MYSQL_DATABASE_DB = 'heroku_e927b2471f3d26b'
    MYSQL_DATABASE_HOST = 'us-cdbr-iron-east-03.cleardb.net'
    CLEARDB_DATABASE_URL = 'mysql://b91af171564b1c:a818600b@us-cdbr-iron-east-03.cleardb.net/heroku_e927b2471f3d26b?reconnect=true'
    CLEARDB_MAROON_URL =   'mysql://b900e042a0b297:127eabae@us-cdbr-iron-east-03.cleardb.net/heroku_c5f672dc0e40eb4?reconnect=true'
    DATABASE_URL = 'mysql://b91af171564b1c:a818600b@us-cdbr-iron-east-03.cleardb.net/heroku_e927b2471f3d26b?reconnect=true'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = 'False'