package com.example.kiit.health.login;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.kiit.health.Prevalent.Prevalent;
import com.example.kiit.health.R;
import com.example.kiit.health.activities.RexDashboardActivity;
import com.example.kiit.health.model.Users;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import io.paperdb.Paper;

public class LoginActivity extends AppCompatActivity {
    private EditText InputNumber,Inputpassword;
    private Button loginbtn;
    private ProgressDialog lodingbar;
    private String parentdbname="Users";
    private android.widget.CheckBox checkBoxRemeberME;
    private TextView forgotpassword,signup;
    private Boolean exit = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        loginbtn= findViewById(R.id.login_btn);
        InputNumber= findViewById(R.id.login_phone_number_input);
        Inputpassword= findViewById(R.id.login_password_input);
        lodingbar=new ProgressDialog(this);
         signup=findViewById(R.id.link_signup);

        forgotpassword= findViewById(R.id.forgot_password_link);

        checkBoxRemeberME= (android.widget.CheckBox) findViewById(R.id.remember_me_chkb);
        Paper.init(this);


        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(getApplicationContext(),SignUpActivity.class);
                startActivity(intent);
            }
        });

        loginbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginuser();
            }
        });


        forgotpassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(LoginActivity.this,ResetPasswordActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

                startActivity(intent);
            }
        });

    }
    private void loginuser()
    {
        String phone=InputNumber.getText().toString();
        String password=Inputpassword.getText().toString();
        if(TextUtils.isEmpty(phone))
        {
            Toast.makeText(this,"Please enter your phone number",Toast.LENGTH_SHORT).show();

        }
        else if(TextUtils.isEmpty(password)){
            Toast.makeText(this,"Please enter your password",Toast.LENGTH_SHORT).show();

        }
        else
        {

            lodingbar.setTitle("Login Account");
            lodingbar.setMessage("Please wait while we check the credentials");
            lodingbar.setCanceledOnTouchOutside(false);
            lodingbar.show();
            Allowaccess(phone,password);
        }
    }
    private void Allowaccess(final String phone, final String password)
    {
        if(checkBoxRemeberME.isChecked())
        {
            Paper.book().write(Prevalent.UserPhoneKey,phone);
            Paper.book().write(Prevalent.UserPasswordKey,password);
        }
        final DatabaseReference RootRef;
        RootRef= FirebaseDatabase.getInstance().getReference();
        RootRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if(dataSnapshot.child(parentdbname).child(phone).exists())
                {
                    Users usersData=dataSnapshot.child(parentdbname).child(phone).getValue(Users.class);

                    if (usersData.getPhone().equals(phone)) {
                        if (usersData.getPassword().equals(password)) {

                                lodingbar.dismiss();
                                Toast.makeText(LoginActivity.this, "Login successful", Toast.LENGTH_SHORT).show();
                                Intent intent = new Intent(LoginActivity.this, RexDashboardActivity.class);
                                Prevalent.currentOnlineUsers=usersData;
                                startActivity(intent);

                        } else {
                            lodingbar.dismiss();
                            Toast.makeText(LoginActivity.this, "Password incorrect", Toast.LENGTH_SHORT).show();

                        }
                    }
                }
                else
                {
                    Toast.makeText(LoginActivity.this,"Account does not exist",Toast.LENGTH_SHORT).show();
                    lodingbar.dismiss();
                    Toast.makeText(LoginActivity.this,"Create new account",Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
    @Override
    public void onBackPressed() {
        if (exit) {
            finishAffinity();
        } else {
            Toast.makeText(LoginActivity.this, "Press back again to return", Toast.LENGTH_SHORT).show();
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