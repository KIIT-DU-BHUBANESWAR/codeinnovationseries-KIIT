from website import app,db
from flask import Flask, render_template, request, flash, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .models import Doctor
from website.patient.models import Patient,Brain_mri
import json


with open('config.json', 'r') as c:
    params = json.load(c)["params"]
    
    
@app.route('/doctor/dashboard')
def doc_dash():
    if('doc_mail' in session):
        mail = session['doc_mail']
        user = Doctor.query.filter_by(email=mail).first()
        return render_template('doctor/index.html',user=user)
    else:
        return redirect(url_for('doc_login'))

@app.route('/doctor/login', methods=['GET', 'POST'])
def doc_login():
    if('doc_mail' in session):
        return redirect(url_for('doc_dash'))
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = Doctor.query.filter_by(email=email).first()
        if not user:
            return redirect(url_for('doc_dash'))
        if(user.password!=password):
            return redirect(url_for('doc_dash'))
        session.permanent = True
        session['doc_mail'] = user.email
        flash('You are now logged in to the dashboard!','success')
        return redirect(url_for('doc_dash'))
    return render_template('doctor/pages/login.html')

@app.route('/doctor/logout', methods=['GET','POST'])
def doc_logout():
    if('doc_mail' in session):
        del session['doc_mail']
        return redirect(url_for('doc_login'))
    else:
        return redirect(url_for('doc_login'))

@app.route('/doctor/register', methods=['GET','POST'])
def doc_register():
    return render_template('doctor/pages/register.html')

@app.route('/doctor/patients')
def doc_pat():
    if('doc_mail' in session):
        mail = session['doc_mail']
        user = Doctor.query.filter_by(email=mail).first()
    return render_template('doctor/pages/patients.html',user=user)
