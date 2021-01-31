package com.example.kiit.health.yoga;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.example.kiit.health.R;

import java.util.ArrayList;

public class SessionActivity extends MainMenu {


    TextView nameSession;
    TextView focusSession;
    TextView durationSession;
    Button quotation;
    Button addPoseToSession;
    ImageView sessionImageView;
    DBHelper dbHelper;
    ListView setList2;
    Session thisSession;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_session);

        dbHelper = new DBHelper(this);
        Bundle extras = getIntent().getExtras();
        Integer session_id = extras.getInt("id");

        thisSession = Session.getSessionById(dbHelper, session_id);

        nameSession = (TextView)findViewById(R.id.nameSession);
        nameSession.setText(thisSession.getName());


        focusSession = (TextView)findViewById(R.id.focusSession);
        focusSession.setText(thisSession.getFocus());

        durationSession = (TextView)findViewById(R.id.durationSession);
        durationSession.setText(thisSession.getDuration().toString());

        setList2 = (ListView)findViewById(R.id.setList);

        quotation = (Button)findViewById(R.id.quotation);

        addPoseToSession = (Button)findViewById(R.id.addPoseToSession);

        sessionImageView = (ImageView)findViewById(R.id.sessionImageView);
        sessionImageView.setImageResource(R.drawable.fullwheel);


        Set set = thisSession.getSetInSession(dbHelper);
        if(set != null) {

            ArrayList<Pose> posesInSetList = set.allPosesInSet(session_id, dbHelper);
            SetAdapter adapter = new SetAdapter(this, posesInSetList);
            setList2.setAdapter(adapter);
        }
        dbHelper.close();
    }

    public void getPoseInSet(View listItem){

        Pose pose = (Pose) listItem.getTag();
        Intent intent3 = new Intent(this, PoseActivity.class);
        intent3.putExtra("name", pose.getName());
        intent3.putExtra("sanskritName", pose.getSanskritName());
        intent3.putExtra("chakra", pose.getChakra());
        intent3.putExtra("duration", pose.getDuration());
        intent3.putExtra("image", pose.getImage());
        intent3.putExtra("id", pose.getId());
        startActivity(intent3);
    }


    public void deleteSession(View button){
        Bundle extras = getIntent().getExtras();
        Integer id = extras.getInt("id");
        DBHelper dbHelper = new DBHelper(this);
        Session.delete(dbHelper, id);
        dbHelper.close();
        Intent intent = new Intent(this, TopSessionsActivity.class);
        startActivity(intent);
    }

    public void getQuotation(View button){
        Intent intent = new Intent(this, QuotationActivity.class);
        startActivity(intent);
    }

    public void addPoseToThisSession(View button){
        if(button.getId() == R.id.addPoseToSession){
        Intent intent = new Intent(this, AddSetActivity.class);
            intent.putExtra("id", thisSession.getId());
            intent.putExtra("name", thisSession.getName());
            intent.putExtra("day", thisSession.getDay());
            intent.putExtra("focus", thisSession.getFocus());
            intent.putExtra("duration", thisSession.getDuration());
            intent.putExtra("status", thisSession.getStatus());
        startActivity(intent);}
    }


    public void completeThisSession(View button){
        if(button.getId() == R.id.completeButton){
            button.setBackgroundColor(Color.DKGRAY);
            DBHelper thisdb = new DBHelper(this);
            thisSession.updateAsComplete(thisdb);
            thisdb.close();
            Intent intent = new Intent(this, TopSessionsActivity.class);
            startActivity(intent);
        }
    }

    public void doSessionAgain(View button){
        if(button.getId() == R.id.redoButton){
            DBHelper anotherdb = new DBHelper(this);
            thisSession.redoSession(anotherdb);
            anotherdb.close();
            Intent intent = new Intent(this, TopSessionsActivity.class);
            startActivity(intent);
        }
    }


}
