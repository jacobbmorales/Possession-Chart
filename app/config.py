import os
import logging
import inspect

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    MYSQL_DATABASE_USER = 'jacob.morales@focus.org'
    MYSQL_DATABASE_PASSWORD = 'Rufus1209'
    MYSQL_DATABASE_DB = 'mydb'
    MYSQL_DATABASE_HOST = 'localhost'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = 'False'