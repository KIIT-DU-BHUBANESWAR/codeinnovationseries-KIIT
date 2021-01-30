from website import db

class Patient(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    p_id = db.Column(db.String(100),unique=True,nullable=True)
    f_name  = db.Column(db.String(80), nullable=False)
    l_name = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer,nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(30),nullable=False)
    reg_date = db.Column(db.DateTime, nullable=True)
    
class Brain_mri(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    pat_id = db.Column(db.Integer,db.ForeignKey('patient.id',ondelete='CASCADE'),nullable=False)
    pat = db.relationship('Patient',backref=db.backref('allpost',lazy=True))
    patient_mri = db.Column(db.String(150), nullable=False)
    patient_doc = db.Column(db.String(150), nullable=False)
    is_tumor = db.Column(db.Boolean, nullable=True, default=False)
    is_done = db.Column(db.Boolean,nullable=False,default=False)
    date = db.Column(db.DateTime, nullable=True)