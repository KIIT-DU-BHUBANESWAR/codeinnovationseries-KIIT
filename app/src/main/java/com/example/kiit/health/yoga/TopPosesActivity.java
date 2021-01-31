package com.example.kiit.health.yoga;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ListView;

import com.example.kiit.health.R;

import java.util.ArrayList;

public class TopPosesActivity extends MainMenu {

    DBHelper dbHelper;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.all_poses_list);
        dbHelper = new DBHelper(this);
        ArrayList<Pose> posesList = Pose.all(dbHelper);

        TopPosesAdapter posesAdapter = new TopPosesAdapter(this, posesList);
        ListView listView = (ListView) findViewById(R.id.all_poses_list);
        listView.setAdapter(posesAdapter);
    }

    public void getPose(View listItem){
        Pose pose = (Pose) listItem.getTag();
        Intent i = new Intent(this, PoseActivity.class);
        i.putExtra("name", pose.getName());
        i.putExtra("sanskritName", pose.getSanskritName());
        i.putExtra("chakra", pose.getChakra());
        i.putExtra("duration", pose.getDuration());
        i.putExtra("image", pose.getImage());
        i.putExtra("id", pose.getId());
        startActivity(i);
    }
}