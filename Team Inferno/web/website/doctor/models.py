from website import db

class Doctor(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    d_id = db.Column(db.String(100),unique=True,nullable=True)
    f_name  = db.Column(db.String(80), nullable=False)
    l_name = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer,nullable=False)
    designation = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    reg_date = db.Column(db.DateTime, nullable=True)