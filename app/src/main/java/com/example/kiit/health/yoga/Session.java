package com.example.kiit.health.yoga;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import static com.example.kiit.health.yoga.DBHelper.SESSIONS_COLUMN_DAY;
import static com.example.kiit.health.yoga.DBHelper.SESSIONS_COLUMN_DURATION;
import static com.example.kiit.health.yoga.DBHelper.SESSIONS_COLUMN_FOCUS;
import static com.example.kiit.health.yoga.DBHelper.SESSIONS_COLUMN_ID;
import static com.example.kiit.health.yoga.DBHelper.SESSIONS_COLUMN_NAME;
import static com.example.kiit.health.yoga.DBHelper.SESSIONS_COLUMN_STATUS;
import static com.example.kiit.health.yoga.DBHelper.SESSIONS_TABLE_NAME;
import static com.example.kiit.health.yoga.DBHelper.SET_COLUMN_ID;
import static com.example.kiit.health.yoga.DBHelper.SET_POSES_ID;
import static com.example.kiit.health.yoga.DBHelper.SET_SESSION_ID;
import static com.example.kiit.health.yoga.DBHelper.SET_TABLE_NAME;


public class Session {
    private int id;
    private String name;
    private String day;
    private String focus;
    private Integer duration;
    private String status;

    public Session(String name, String day, String focus, Integer duration, String status){
        this.name = name;
        this.day = day;
        this.focus = focus;
        this.duration = duration;
        this.status = status;
    }

    public Session(int id, String name, String day, String focus, Integer duration, String status){
        this.id = id;
        this.name = name;
        this.day = day;
        this.focus = focus;
        this.duration = duration;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDay() {
        return day;
    }

    public String getFocus() {
        return focus;
    }

    public Integer getDuration() {
        return duration;
    }

    public String getStatus() {
        return status;
    }

    public String setStatus(String input){
        return this.status = input;
    }

    public boolean save(DBHelper dbHelper){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(SESSIONS_COLUMN_NAME, this.name);
        cv.put(SESSIONS_COLUMN_DAY, this.day);
        cv.put(SESSIONS_COLUMN_FOCUS, this.focus);
        cv.put(SESSIONS_COLUMN_DURATION, this.duration);
        cv.put(SESSIONS_COLUMN_STATUS, this.status);
        db.insert(SESSIONS_TABLE_NAME, null, cv);
        return true;
    }

    public static ArrayList<Session> all(DBHelper dbHelper){
        ArrayList<Session> sessions = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + SESSIONS_TABLE_NAME + " ORDER BY " + SESSIONS_COLUMN_DAY, null);
        while(cursor.moveToNext()){
            int id = cursor.getInt(cursor.getColumnIndex(SESSIONS_COLUMN_ID));
            String name = cursor.getString(cursor.getColumnIndex(SESSIONS_COLUMN_NAME));
            String day = cursor.getString(cursor.getColumnIndex(SESSIONS_COLUMN_DAY));
            String focus = cursor.getString(cursor.getColumnIndex(SESSIONS_COLUMN_FOCUS));
            int duration = cursor.getInt(cursor.getColumnIndex(SESSIONS_COLUMN_DURATION));
            String status = cursor.getString(cursor.getColumnIndex(SESSIONS_COLUMN_STATUS));
            Session session = new Session(id, name, day, focus, duration, status);
            sessions.add(session);
        }
        cursor.close();
        return sessions;
    }


    public static boolean delete(DBHelper dbHelper, Integer id){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        String selection = " id = ?";
        String[] values = {id.toString()};
        db.delete(SESSIONS_TABLE_NAME, selection, values);
        db.close();
        return true;
    }

    public boolean updateAsComplete(DBHelper dbHelper){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        String selection = "id=?";
        ContentValues cv = new ContentValues();
        cv.put(SESSIONS_COLUMN_NAME, this.name);
        cv.put(SESSIONS_COLUMN_DAY, this.day);
        cv.put(SESSIONS_COLUMN_FOCUS, this.focus);
        cv.put(SESSIONS_COLUMN_DURATION, this.duration.toString());
        cv.put(SESSIONS_COLUMN_STATUS, "Y");

        Integer id = this.getId();
        String[] args = new String[] {String.valueOf(id)};
        db.update(SESSIONS_TABLE_NAME, cv, selection, args);
        db.close();
        return true;
    }

    public boolean redoSession(DBHelper dbHelper){
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        String selection = "id=?";
        ContentValues cv = new ContentValues();
        cv.put(SESSIONS_COLUMN_NAME, this.name);
        cv.put(SESSIONS_COLUMN_DAY, this.day);
        cv.put(SESSIONS_COLUMN_FOCUS, this.focus);
        cv.put(SESSIONS_COLUMN_DURATION, this.duration.toString());
        cv.put(SESSIONS_COLUMN_STATUS, "N");

        Integer id = this.getId();
        String[] args = new String[] {String.valueOf(id)};
        db.update(SESSIONS_TABLE_NAME, cv, selection, args);
        db.close();
        return true;
    }
    public static Session getSessionById(DBHelper dbHelper, Integer sessionId){
        ArrayList<Session> sessions = new ArrayList<>();
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + SESSIONS_TABLE_NAME + " WHERE id = " + sessionId.toString(), null);
        while(cursor.moveToNext()){
            int id = cursor.getInt(cursor.getColumnIndex(SESSIONS_COLUMN_ID));
            String name = cursor.getString(cursor.getColumnIndex(SESSIONS_COLUMN_NAME));
            String day = cursor.getString(cursor.getColumnIndex(SESSIONS_COLUMN_DAY));
            String focus = cursor.getString(cursor.getColumnIndex(SESSIONS_COLUMN_FOCUS));
            Integer duration = cursor.getInt(cursor.getColumnIndex(SESSIONS_COLUMN_DURATION));
            String status = cursor.getString(cursor.getColumnIndex(SESSIONS_COLUMN_STATUS));
            Session session = new Session(id, name, day, focus, duration, status);
            sessions.add(session);
        }
        cursor.close();
        db.close();
        return sessions.get(0);
    }

    public Set getSetInSession(DBHelper dbhelper){
        ArrayList<Set> sets = new ArrayList<>();
        SQLiteDatabase db = dbhelper.getReadableDatabase();
        Integer this_session_id = this.getId();

        Cursor cursor = db.rawQuery("SELECT * FROM " + SET_TABLE_NAME + " WHERE session_id  = " + this_session_id.toString(), null);
        while(cursor.moveToNext()){
        //    still unsure about this line
            int id = cursor.getInt(cursor.getColumnIndex(SET_COLUMN_ID));
            int session_id = cursor.getInt(cursor.getColumnIndex(SET_SESSION_ID));
            int poses_id = cursor.getInt(cursor.getColumnIndex(SET_POSES_ID));
            Set set = new Set(id, session_id, poses_id);
            sets.add(set);
        }
        cursor.close();
        db.close();
        if(sets.size() > 0) {
            return sets.get(0);

        } else {
            return null;
        }
    }

}
