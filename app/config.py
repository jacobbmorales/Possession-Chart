import os
import logging
import inspect

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_strong_key')
    MYSQL_DATABASE_USER = 'b900e042a0b297'
    MYSQL_DATABASE_PASSWORD = '127eabae'
    MYSQL_DATABASE_DB = 'heroku_c5f672dc0e40eb4'
    MYSQL_DATABASE_HOST = 'us-cdbr-iron-east-03.cleardb.net'
    CLEARDB_DATABASE_URL = 'mysql://b900e042a0b297:127eabae@us-cdbr-iron-east-03.cleardb.net/heroku_c5f672dc0e40eb4?reconnect=true'
    CLEARDB_MAROON_URL =   'mysql://b900e042a0b297:127eabae@us-cdbr-iron-east-03.cleardb.net/heroku_c5f672dc0e40eb4?reconnect=true'
    DATABASE_URL = 'mysql://b900e042a0b297:127eabae@us-cdbr-iron-east-03.cleardb.net/heroku_c5f672dc0e40eb4?reconnect=true'
    SQLALCHEMY_DATABASE_URI = 'mysql://b900e042a0b297:127eabae@us-cdbr-iron-east-03.cleardb.net/heroku_c5f672dc0e40eb4'
    SQLALCHEMY_TRACK_MODIFICATIONS = 'False'