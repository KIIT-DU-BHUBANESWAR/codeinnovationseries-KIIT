package com.example.kiit.health.yoga;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;

import com.example.kiit.health.R;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class AddSessionActivity extends MainMenu {

    EditText nameText;
    EditText dayText;
    EditText focusText;
    EditText durationText;
    DBHelper dbHelper;
    Calendar calendar = Calendar.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_session);
        nameText = (EditText)findViewById(R.id.nameText);
        dayText = (EditText)findViewById(R.id.dayText);
        focusText = (EditText)findViewById(R.id.focusText);
        durationText = (EditText)findViewById(R.id.durationText);
        final DatePickerDialog.OnDateSetListener date = new DatePickerDialog.OnDateSetListener() {

            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear,
                                  int dayOfMonth) {
                calendar.set(Calendar.YEAR, year);
                calendar.set(Calendar.MONTH, monthOfYear);
                calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateDayText();
            }
        };

        dayText.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v){
                        new DatePickerDialog(AddSessionActivity.this, date, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });
    }

    private void updateDayText() {
        String myFormat = "yyyy/MM/dd";
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.US);
        dayText.setText(sdf.format(calendar.getTime()));
    }

    public void addSession(View button){
        dbHelper = new DBHelper(this);

        String name = nameText.getText().toString();
        if(TextUtils.isEmpty(name)) {
            nameText.setError("Please add");
            return;
        }
        String day = dayText.getText().toString();
        if(TextUtils.isEmpty(day)) {
            dayText.setError("Please add");
            return;
        }
        String focus = focusText.getText().toString();
        if(TextUtils.isEmpty(focus)) {
            focusText.setError("Please add");
            return;
        }

        String input = durationText.getText().toString();
        if(input.trim().equals("")) {
            durationText.setError("Please add");
            return;
        }
        Integer duration = Integer.parseInt(durationText.getText().toString());

        String status = "N";
        Session session = new Session(name, day, focus, duration, status);
        session.save(dbHelper);
        Intent intent = new Intent(this, TopSessionsActivity.class);
        startActivity(intent);
    }
}




