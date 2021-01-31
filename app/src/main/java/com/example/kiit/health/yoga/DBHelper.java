package com.example.kiit.health.yoga;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.example.kiit.health.R;


public class DBHelper extends SQLiteOpenHelper {

    public static final String DATABASE_NAME = "yoga.db";

    public static final String SESSIONS_TABLE_NAME = "sessions";
    public static final String SESSIONS_COLUMN_ID = "id";
    public static final String SESSIONS_COLUMN_NAME = "name";
    public static final String SESSIONS_COLUMN_DAY = "day";
    public static final String SESSIONS_COLUMN_FOCUS = "focus";
    public static final String SESSIONS_COLUMN_DURATION = "duration";
    public static final String SESSIONS_COLUMN_STATUS = "status";

    public static final String POSES_TABLE_NAME = "poses";
    public static final String POSES_COLUMN_ID = "id";
    public static final String POSES_COLUMN_NAME = "name";
    public static final String POSES_COLUMN_SANSKRITNAME = "sanskritName";
    public static final String POSES_COLUMN_CHAKRA = "chakra";
    public static final String POSES_COLUMN_DURATION = "duration";
    public static final String POSES_COLUMN_IMAGE = "image";


    public static final String SET_TABLE_NAME = "sessions_poses";
    public static final String SET_COLUMN_ID = "id";
    public static final String SET_SESSION_ID = "session_id";
    public static final String SET_POSES_ID = "poses_id";


    public DBHelper(Context context){
        super(context, DATABASE_NAME, null, 13);
    }

    public void onCreate(SQLiteDatabase db){
        db.execSQL("CREATE TABLE " + SESSIONS_TABLE_NAME + "(id INTEGER primary key autoincrement, name TEXT NOT NULL, day TEXT NOT NULL, focus TEXT, duration INTEGER, status TEXT );");
        db.execSQL("CREATE TABLE " + POSES_TABLE_NAME + "(id INTEGER primary key autoincrement, name TEXT, sanskritName TEXT, chakra TEXT, duration INTEGER, image INTEGER );");
        db.execSQL("CREATE TABLE " + SET_TABLE_NAME + "(id INTEGER primary key autoincrement, session_id INTEGER, poses_id INTEGER );");


        //seed tables

        db.execSQL("INSERT INTO " + SESSIONS_TABLE_NAME + " (name, day, focus, duration, status) VALUES ('Session 1', '2021/01/15', 'Legs', 60, 'N');");
        db.execSQL("INSERT INTO " + SESSIONS_TABLE_NAME + " (name, day, focus, duration, status) VALUES ('Session 2', '2021/01/16', 'Shoulders', 45, 'N');");
        db.execSQL("INSERT INTO " + SESSIONS_TABLE_NAME + " (name, day, focus, duration, status) VALUES ('Session 3', '2021/01/17', 'Arms', 50, 'N');");
        db.execSQL("INSERT INTO " + SESSIONS_TABLE_NAME + " (name, day, focus, duration, status) VALUES ('Session 4', '2021/01/18', 'Core', 60, 'N');");
        db.execSQL("INSERT INTO " + SESSIONS_TABLE_NAME + " (name, day, focus, duration, status) VALUES ('Relaxation ', '2021/01/19', 'All', 60, 'N');");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Bridge', 'Setu Bandha Sarvangasasana', 'Heart Throat', 1, " +  R.drawable.bridge + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Half Moon Pose', 'Ardha Chandrasana', 'Sacral', 1, " +  R.drawable.halfmoon + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Sitting Spinal Twist', 'Ardha Matsyendrasana', 'Sacral', 1, " +  R.drawable.seatedspinal + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Cobra', 'Bhujangasana', 'Heart', 2, " +  R.drawable.cobra + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Boat', 'Navasana', 'Solar', 1, " +  R.drawable.boat + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Full Wheel', 'Urdhva Dhanurasana', 'All', 1, " +  R.drawable.fullwheel + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Cat', 'Marjariasana', 'All', 1, " +  R.drawable.cat + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Cow', 'Bitilasana', 'Heart', 1, " +  R.drawable.cow + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Corpse', 'Savasana', 'Crown Brow', 10, " +  R.drawable.corpse + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Eagle', 'Garudasana', 'Heart', 1, " +  R.drawable.eagle + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Child', 'Balasana', 'Root Brow', 3, " +  R.drawable.child + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Triangle', 'Trikonasana', 'Sacral', 1, " +  R.drawable.triangle + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Tree', 'Vrikasana', 'Root', 1, " +  R.drawable.tree + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Downward Dog', 'Adho Mukha Svasana', 'Solar', 3, " +  R.drawable.downdog + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Side Plank', 'Vasisthasana', 'Heart', 1, " +  R.drawable.sideplank + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Forward Fold', 'Uttanasana', 'Root Heart Solar', 2, " +  R.drawable.forwardfold + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Warrior 1', 'Virabhandrasana 1', 'Solar Root', 2, " +  R.drawable.warrior + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Warrior 3', 'Virabhandrasana 3', 'Root Solar', 2, " +  R.drawable.warrior3 + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Wide Leg Forward Fold', 'Prasarita Padottanasana', 'Sacral', 2, " +  R.drawable.widefold + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Staff Pose', 'Chaturanga', 'Solar', 1, " +  R.drawable.staff + ");");
        db.execSQL("INSERT INTO " + POSES_TABLE_NAME + " (name, sanskritName, chakra, duration, image) VALUES ('Hero', 'Virasana', 'Brow', 2, " +  R.drawable.hero + ");");

    }

    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion){
        Log.w("new", "Database has changed: " + oldVersion + " to " + newVersion);
        db.execSQL("DROP TABLE IF EXISTS " + SESSIONS_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + POSES_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + SET_TABLE_NAME);
        onCreate(db);
    }


}
