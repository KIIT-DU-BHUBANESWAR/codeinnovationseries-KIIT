package com.example.kiit.health.yoga;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.example.kiit.health.R;

public class DashExerciseActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dash_exercise);

    }
    public void OnClick(View v)
    {
        Intent intent = new Intent(this, AddPoseActivity.class);
        startActivity(intent);
    }
    public void OnClick2(View v)
    {
        Intent intent = new Intent(this, AddSessionActivity.class);
        startActivity(intent);
    }
    public void OnClick3(View v)
    {
        Intent intent = new Intent(this, TopPosesActivity.class);
        startActivity(intent);
    }
    public void OnClick4(View v)
    {
        Intent intent = new Intent(this, TopSessionsActivity.class);
        startActivity(intent);
    }
    public void OnClick5(View v)
    {
        Intent intent = new Intent(this, QuotationActivity.class);
        startActivity(intent);
    }
}