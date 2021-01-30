from website import app
from flask import Flask, render_template, request, flash, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


@app.route('/')
def home():
    return render_template('body/index.html')
