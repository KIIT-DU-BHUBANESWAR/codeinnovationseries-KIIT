from __future__ import division, print_function
from website import app,db
from flask import Flask, render_template, request, flash, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from website.doctor.models import Doctor
from .models import Patient,Brain_mri
import json


import sys
import os
import glob
import re
import numpy as np

import pandas as pd
import tensorflow as tf
import keras
from keras.models import load_model


# Keras
from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from keras.models import load_model
from keras.preprocessing import image

# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

c_path = os.getcwd()

# model = load_model('C:/Users/KIIT/Desktop/Team Inferno/web/website/models/teaminferno.hdf5',compile=False)
model = load_model(c_path+'/website/models/teaminferno.hdf5',compile=False)
model.compile(loss='categorical_crossentropy',optimizer='adam',metrics=['accuracy'])


from PIL import Image
from matplotlib import pyplot as plt

with open('config.json', 'r') as c:
    params = json.load(c)["params"]



@app.route('/patient/dashboard')
def pat_dash():
    if('pat_mail' in session):
        mail = session['pat_mail']
        user = Patient.query.filter_by(email=mail).first()
        return render_template('patient/index.html',user=user)
    else:
        return redirect(url_for('pat_login'))

@app.route('/patient/login', methods=['GET', 'POST'])
def pat_login():
    if('pat_mail' in session):
        return redirect(url_for('pat_dash'))
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = Patient.query.filter_by(email=email).first()
        if not user:
            return redirect(url_for('pat_dash'))
        if(user.password!=password):
            return redirect(url_for('pat_dash'))
        session.permanent = True
        session['pat_mail'] = user.email
        flash('You are now logged in to the dashboard!','success')
        return redirect(url_for('pat_dash'))
    return render_template('patient/pages/login.html')

@app.route('/patient/logout', methods=['GET','POST'])
def pat_logout():
    if('pat_mail' in session):
        del session['pat_mail']
        return redirect(url_for('pat_login'))
    else:
        return redirect(url_for('pat_login'))

@app.route('/patient/register', methods=['GET','POST'])
def pat_register():
    return render_template('patient/pages/register.html')

@app.route('/patient/report',methods=['GET','POST'])
def pat_mri_report():
    if('pat_mail' in session):
        email = session['pat_mail']
        user = Patient.query.filter_by(email=email).first()
    the_user = Brain_mri.query.filter_by(pat_id=user.id).filter_by(is_done=False).first()
    image_name = the_user.patient_mri
    img_path = c_path+"\\website\\reports\\"+image_name
    img = image.load_img(img_path, target_size=(128, 128))
    img_tensor = image.img_to_array(img)
    img_tensor = np.expand_dims(img_tensor, axis=0)
    img_tensor /= 255.
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])
    (model.predict(x) > 0.5).astype("int32")
    classes = model.predict_classes(images, batch_size=32)
    val=(classes[0])
    if(val==1):
        the_user.is_tumor = True
        db.session.commit()
    the_user.is_done = True
    db.session.commit()
    
    return render_template('patient/pages/report.html',user=user,val=val,params=params)

@app.route('/patient/mri-scan',methods=['GET','POST'])
def pat_mri_scan():
    if('pat_mail' in session):
        email = session['pat_mail']
        user = Patient.query.filter_by(email=email).first()
    if request.method == 'POST':
        f1 = request.files['myfile1']
        f2 = request.files['myfile2']
        f1.save(os.path.join(c_path+"\\website\\reports\\",secure_filename(f1.filename)))
        f2.save(os.path.join(c_path+"\\website\\reports\\",secure_filename(f2.filename)))
        entry = Brain_mri(pat_id=user.id,patient_mri=f1.filename,patient_doc=f2.filename,is_tumor=False,is_done=False,date=datetime.now())
        db.session.add(entry)
        db.session.commit()
        return redirect(url_for('pat_mri_report'))
    return render_template('patient/pages/mri.html',user=user,params=params)

@app.route('/patient/previous-reports')
def pat_prev_rep():
    if('pat_mail' in session):
        email = session['pat_mail']
        user = Patient.query.filter_by(email=email).first()
    the_user = Brain_mri.query.filter_by(pat_id=user.id).all()
    return render_template('patient/pages/prev_reports.html',user=user,the_user=the_user)

@app.route('/patient/doctor-booking')
def pat_doc_book():
    if('pat_mail' in session):
        email = session['pat_mail']
        user = Patient.query.filter_by(email=email).first()
    return render_template('patient/pages/doctor_booking.html',user=user)

@app.route('/patient/download-prescription')
def pat_down_pres():
    if('pat_mail' in session):
        email = session['pat_mail']
        user = Patient.query.filter_by(email=email).first()
    return render_template('patient/pages/download_pres.html',user=user)
