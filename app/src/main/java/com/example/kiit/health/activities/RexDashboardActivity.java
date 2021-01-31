package com.example.kiit.health.activities;


import android.app.ActivityOptions;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Pair;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.example.kiit.health.Prevalent.Prevalent;
import com.example.kiit.health.R;
import com.example.kiit.health.hostrack.Hostrack;
import com.example.kiit.health.login.LoginActivity;
import com.example.kiit.health.medicine.MainActivity;
import com.google.firebase.auth.FirebaseAuth;

import io.paperdb.Paper;

public class RexDashboardActivity extends AppCompatActivity {
    double b;
    private ImageView signout;
    RelativeLayout card,dcard;
        TextView titletv, desctv,name,weight,bmi;
        String height;
        LinearLayout profileconnect,stepcount,hydrate,food,yoga,medicine,hostrack;
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_rex_dashboard);

            signout=findViewById(R.id.signout);
            signout.setOnClickListener(new View.OnClickListener() {

                @Override
                public void onClick(View v) {
                    Paper.book().destroy();
                    Intent intent = new Intent(RexDashboardActivity.this, LoginActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                    finish();
                }
            });

            name=findViewById(R.id.named);
            medicine=findViewById(R.id.medicine);
            hostrack=findViewById(R.id.hostrack);
            bmi=findViewById(R.id.bmi1);
            weight=findViewById(R.id.weightd);
            card = findViewById(R.id.card);
            dcard=findViewById(R.id.dietcard);
            titletv = findViewById(R.id.titletv);
            desctv = findViewById(R.id.desctv);
            profileconnect=findViewById(R.id.profileconnect);
            stepcount=findViewById(R.id.stepcountll);
            hydrate=findViewById(R.id.hydratell);
            food=findViewById(R.id.food);
            yoga=findViewById(R.id.yoga);
            name.setText(Prevalent.currentOnlineUsers.getName());
            weight.setText(Prevalent.currentOnlineUsers.getWeight());
            height=Prevalent.currentOnlineUsers.getHeight();
            if(bmi.equals("")) {
                b = Integer.parseInt(weight.getText().toString()) / ((0.0001) * (Integer.parseInt(height) * (Integer.parseInt(height))));
                bmi.setText(String.format("%.2f", b));
            }
            else {
                bmi.setText(Prevalent.currentOnlineUsers.getBmi());
            }
            card.setOnClickListener(v -> {
                Intent intent = new Intent(RexDashboardActivity.this,MoreInfo.class);
                Pair[] pairs = new Pair[3];
                pairs[0] = new Pair<View, String>(card, "card");
                pairs[1] = new Pair<View, String>(titletv, "title");
                pairs[2] = new Pair<View, String>(desctv, "desc");

                ActivityOptions options = ActivityOptions.makeSceneTransitionAnimation(RexDashboardActivity.this, pairs);

                startActivity(intent, options.toBundle());
            });
            hydrate.setOnClickListener(v -> {
                Intent i=new Intent(RexDashboardActivity.this,com.example.kiit.health.hydration.MainWindow.MainActivity.class);
                startActivity(i);
            });
            food.setOnClickListener(v -> {
                Intent i=new Intent(RexDashboardActivity.this,com.example.kiit.health.Food.class);
                startActivity(i);
            });
            yoga.setOnClickListener(v -> {
                Intent i=new Intent(RexDashboardActivity.this,com.example.kiit.health.yoga.DashExerciseActivity.class);
                startActivity(i);
            });
            stepcount.setOnClickListener(v -> {
                Intent i=new Intent(RexDashboardActivity.this,  SplashActivity.class);
                startActivity(i);
            });
            medicine.setOnClickListener(v -> {
                Intent i=new Intent(RexDashboardActivity.this, MainActivity.class);
                startActivity(i);
            });
            hostrack.setOnClickListener(v -> {
                Intent i=new Intent(RexDashboardActivity.this, Hostrack.class);
                startActivity(i);
            });
            profileconnect.setOnClickListener(v -> {
                Intent i=new Intent(RexDashboardActivity.this,ProfileActivity.class);
                startActivity(i);
            });
            dcard.setOnClickListener(new View.OnClickListener() {
                @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(RexDashboardActivity.this,DietActivity.class);
                    Pair[] pairs = new Pair[3];
                    pairs[0] = new Pair<View, String>(card, "card");
                    pairs[1] = new Pair<View, String>(titletv, "title");
                    pairs[2] = new Pair<View, String>(desctv, "desc");

                    ActivityOptions options = ActivityOptions.makeSceneTransitionAnimation(RexDashboardActivity.this, pairs);

                    startActivity(intent, options.toBundle());
                }
            });

            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        }

    @Override
    public void onBackPressed() {

                finishAffinity();


    }
    }
