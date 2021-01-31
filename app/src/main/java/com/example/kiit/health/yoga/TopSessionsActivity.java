package com.example.kiit.health.yoga;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ListView;

import com.example.kiit.health.R;

import java.util.ArrayList;

public class TopSessionsActivity extends MainMenu {

    DBHelper dbHelper;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.top_sessions_list);
        dbHelper = new DBHelper(this);
        ArrayList<Session> sessionList = Session.all(dbHelper);

        TopSessionsAdapter sessionsAdapter = new TopSessionsAdapter(this, sessionList);
        ListView listView = (ListView)findViewById(R.id.top_sessions_list);
        listView.setAdapter(sessionsAdapter);
        dbHelper.close();
    }

    public void getSession(View listItem){


        Session session = (Session) listItem.getTag();
        Intent i = new Intent(this, SessionActivity.class);
        i.putExtra("name", session.getName());
        i.putExtra("day", session.getDay());
        i.putExtra("focus", session.getFocus());
        i.putExtra("duration", session.getDuration());
        i.putExtra("status", session.getStatus());
        i.putExtra("id", session.getId());
        startActivity(i);
    }

}

