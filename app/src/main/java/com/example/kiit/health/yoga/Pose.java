package com.example.kiit.health.yoga;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import static com.example.kiit.health.yoga.DBHelper.POSES_COLUMN_CHAKRA;
import static com.example.kiit.health.yoga.DBHelper.POSES_COLUMN_DURATION;
import static com.example.kiit.health.yoga.DBHelper.POSES_COLUMN_ID;
import static com.example.kiit.health.yoga.DBHelper.POSES_COLUMN_IMAGE;
import static com.example.kiit.health.yoga.DBHelper.POSES_COLUMN_NAME;
import static com.example.kiit.health.yoga.DBHelper.POSES_COLUMN_SANSKRITNAME;
import static com.example.kiit.health.yoga.DBHelper.POSES_TABLE_NAME;


public class Pose {

    private int id;
    private String name;
    private String sanskritName;
    private String chakra;
    private Integer duration;
    private Integer image;


    public Pose(String name, String sanskritName, String chakra, Integer duration, Integer image){
        this.name = name;
        this.sanskritName = sanskritName;
        this.chakra = chakra;
        this.duration = duration;
        this.image = image;
    }

    public Pose(int id, String name, String sanskritName, String chakra, Integer duration, Integer image){
        this.id = id;
        this.name = name;
        this.sanskritName = sanskritName;
        this.chakra = chakra;
        this.duration = duration;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    //for the spinner display
    @Override
    public String toString() {
        return getName();
    }

    public String getSanskritName() {
        return sanskritName;
    }

    public String getChakra() {
        return chakra;
    }

    public Integer getDuration() {
        return duration;
    }

    public Integer getImage() {
        return image;
    }


    public boolean save(DBHelper dbHelper){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(POSES_COLUMN_NAME, this.name);
        cv.put(POSES_COLUMN_SANSKRITNAME, this.sanskritName);
        cv.put(POSES_COLUMN_CHAKRA, this.chakra);
        cv.put(POSES_COLUMN_DURATION, this.duration);
        cv.put(POSES_COLUMN_IMAGE, this.image);
        db.insert(POSES_TABLE_NAME, null, cv);
        db.close();
        return true;
    }

    public static ArrayList<Pose> all(DBHelper dbHelper){
        ArrayList<Pose> poses = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + POSES_TABLE_NAME + " ORDER BY " + POSES_COLUMN_NAME, null);
        while(cursor.moveToNext()){
            int id = cursor.getInt(cursor.getColumnIndex(POSES_COLUMN_ID));
            String name = cursor.getString(cursor.getColumnIndex(POSES_COLUMN_NAME));
            String sanskritName = cursor.getString(cursor.getColumnIndex(POSES_COLUMN_SANSKRITNAME));
            String chakra = cursor.getString(cursor.getColumnIndex(POSES_COLUMN_CHAKRA));
            int duration = cursor.getInt(cursor.getColumnIndex(POSES_COLUMN_DURATION));
            int image = cursor.getInt(cursor.getColumnIndex(POSES_COLUMN_IMAGE));
            Pose pose = new Pose(id, name, sanskritName, chakra, duration, image);
            poses.add(pose);
        }
        cursor.close();
        db.close();
        return poses;
    }


    public static boolean delete(DBHelper dbHelper, Integer id){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        String selection = " id = ?";
        String[] values = {id.toString()};
        db.delete(POSES_TABLE_NAME, selection, values);
        db.close();
        return true;
    }

}
