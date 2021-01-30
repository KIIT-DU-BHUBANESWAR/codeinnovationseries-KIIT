from flask import Flask, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
import os


with open('config.json', 'r') as c:
    params = json.load(c)["params"]


app = Flask(__name__)
app.secret_key = 'inferno'


if(params['local_server']):
    app.config['SQLALCHEMY_DATABASE_URI'] = params['local_uri']
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = params['prod_uri']
db = SQLAlchemy(app)


from website.doctor import routes
from website.patient import routes
from website.body import routes