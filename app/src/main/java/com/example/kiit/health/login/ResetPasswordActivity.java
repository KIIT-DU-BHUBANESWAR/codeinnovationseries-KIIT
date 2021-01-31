package com.example.kiit.health.login;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.kiit.health.R;
import com.example.kiit.health.activities.RexDashboardActivity;


public class ResetPasswordActivity extends AppCompatActivity {
    ImageView backbtn;
    private Boolean exit = false;
    EditText editTextCountryCode,editTextPhone,newpass;
    Button buttonContinue;
    TextView linklogin;
    String change="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reset_password);
        Intent intent=getIntent();
        Bundle bundle=intent.getExtras();
        if(bundle!=null) {
            change = getIntent().getExtras().get("change").toString();
        }
        editTextCountryCode = findViewById(R.id.editTextCountryCode);
        editTextPhone = findViewById(R.id.etphone);
        buttonContinue = findViewById(R.id.btn_reset_password);
        newpass=findViewById(R.id.etpass);
        backbtn=findViewById(R.id.backbtn);
        linklogin=findViewById(R.id.link_login);

        if(change.equals(change)) {
            linklogin.setVisibility(View.INVISIBLE);
        }
        linklogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ResetPasswordActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });

        backbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        buttonContinue.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String code = editTextCountryCode.getText().toString().trim();
                String number = editTextPhone.getText().toString().trim();
                String pass=newpass.getText().toString().trim();
                if (number.isEmpty() || number.length() <10) {
                    editTextPhone.setError("Valid number is required");
                    editTextPhone.requestFocus();
                    return;
                }

                String phoneNumber = code + number;
                String num=number;
                Intent intent = new Intent(ResetPasswordActivity.this, newpassverify.class);
                intent.putExtra("phoneNumber", phoneNumber);
                intent.putExtra("password",pass);
                intent.putExtra("num",num);
                startActivity(intent);

            }
        });
    }
    @Override
    public void onBackPressed() {
        if (exit) {
            if(change.equals(change))
            {
                Intent intent = new Intent(ResetPasswordActivity.this, RexDashboardActivity.class);

                startActivity(intent);
            }
            else {
                Intent intent = new Intent(ResetPasswordActivity.this, LoginActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

                startActivity(intent);
                finish();
            }
        } else {
            Toast.makeText(ResetPasswordActivity.this, "Press back again to return", Toast.LENGTH_SHORT).show();
            exit = true;
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    exit = false;
                }
            }, 2000);
        }
    }

}