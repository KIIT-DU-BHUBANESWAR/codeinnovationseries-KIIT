package com.example.kiit.health.yoga;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.kiit.health.R;

public class PoseActivity extends MainMenu implements View.OnClickListener {

    TextView namePose;
    TextView sanskritPose;
    TextView durationPose;
    TextView chakraPose;
    ImageView poseImage;
    ImageButton stopButton;
    ImageButton playButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pose);
        Bundle extras = getIntent().getExtras();
        String name = extras.getString("name");
        String sanskritName = extras.getString("sanskritName");
        String chakra = extras.getString("chakra");
        final Integer duration = extras.getInt("duration");
        Integer image = extras.getInt("image");

        stopButton = (ImageButton)findViewById(R.id.stopButton);
        playButton = (ImageButton)findViewById(R.id.playButton);

        namePose = (TextView) findViewById(R.id.namePose);
        namePose.setText(name);

        sanskritPose = (TextView) findViewById(R.id.sanskritPose);
        sanskritPose.setText(sanskritName);

        durationPose = (TextView) findViewById(R.id.durationPose);

        final CountDownTimer timer;
        final int poseDuration = (duration * 60) * 1000;
        durationPose.setText(duration + " min");
        timer = new CountDownTimer(poseDuration, 1000){

            public void onTick(long poseDuration) {
                durationPose.setText(" " + poseDuration / 1000);
            }

            public void onFinish() {
                durationPose.setText(duration + " min");
            }
        };
        playButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                timer.start();
            }
        });

        stopButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                timer.cancel();
            }
        });


        chakraPose = (TextView) findViewById(R.id.chakraPose);
        chakraPose.setText(chakra);

        poseImage = (ImageView) findViewById(R.id.poseImage);
        poseImage.setImageResource(image);

    }


    public void deletePose(View button){
        if(button.getId() == R.id.deletePoseButton){
        Bundle extras = getIntent().getExtras();
        Integer id = extras.getInt("id");
        DBHelper dbHelper = new DBHelper(this);
        Pose.delete(dbHelper, id);
        Intent intent = new Intent(this, TopPosesActivity.class);
        startActivity(intent);}
    }


    @Override
    public void onClick(View view) {

    }
}
