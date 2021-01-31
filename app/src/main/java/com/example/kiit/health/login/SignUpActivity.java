package com.example.kiit.health.login;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.kiit.health.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

public class SignUpActivity extends AppCompatActivity  implements AdapterView.OnItemSelectedListener {
    private Button createaccountbutton;
    private EditText Inputname,Inputphonenumber,Inputpassword,email,age,height,weight;;
    private ProgressDialog lodingbar;
    private TextView countrycode,tvlogin;
    double b;
    Spinner spin,spin2;
    private ImageView backbtn;
    private Boolean exit = false;
    String st="",et="";
    String[] gender ={"Male","Female","Transgender"," "," "};
    String[] excercisedetails ={"No Exercise","Frequent Walk","1-2 times a week","3-5 times a week","Everyday"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        createaccountbutton=(Button) findViewById(R.id.register_btn);
        Inputname=(EditText) findViewById(R.id.input_name);
        Inputphonenumber=(EditText) findViewById(R.id.input_phonenumber);
        Inputpassword=(EditText) findViewById(R.id.input_password);
        countrycode=(TextView)findViewById(R.id.editTextCountryCode);
        email=(EditText)findViewById(R.id.input_email);
        tvlogin=findViewById(R.id.tvlogin);
        age=findViewById(R.id.input_age);
        height=findViewById(R.id.input_height);
        weight=findViewById(R.id.input_weight);

        spin=findViewById(R.id.spinner1);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, gender);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spin.setAdapter(adapter);
        spin.setPrompt("Gender");
        spin.setOnItemSelectedListener(this);

        spin2=findViewById(R.id.spinner2);
        ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, excercisedetails);
        adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spin2.setAdapter(adapter1);
        spin2.setPrompt("Exercise Details");
        spin2.setOnItemSelectedListener(this);



        tvlogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(SignUpActivity.this,LoginActivity.class);
                startActivity(intent);

            }
        });
        lodingbar=new ProgressDialog(this);
        backbtn=findViewById(R.id.backbtn);
        backbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        createaccountbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CreateAccount();
            }
        });

    }



    private void CreateAccount()
    {


        String name=Inputname.getText().toString();
        String phone=Inputphonenumber.getText().toString();
        String password=Inputpassword.getText().toString();
        String emaill=email.getText().toString();
        String a=age.getText().toString();
        String w=weight.getText().toString();
        String h = height.getText().toString();
        String code=countrycode.getText().toString();
        String gender= spin.getSelectedItem().toString();
        String e=spin2.getSelectedItem().toString();
        if(TextUtils.isEmpty(name)){
            Toast.makeText(this,"Please enter your name",Toast.LENGTH_SHORT).show();

        }
        else if(TextUtils.isEmpty(phone)||phone.length()!=10){
            Toast.makeText(this,"Please enter a vaild phone number",Toast.LENGTH_SHORT).show();

        }
        else if(TextUtils.isEmpty(password)){
            Toast.makeText(this,"Please enter your password",Toast.LENGTH_SHORT).show();

        }
        else if(TextUtils.isEmpty(emaill)){
            Toast.makeText(this,"Please enter your email",Toast.LENGTH_SHORT).show();

        }
        else if(TextUtils.isEmpty(a)){
            Toast.makeText(this,"Please enter your age",Toast.LENGTH_SHORT).show();

        }
        else if(TextUtils.isEmpty(w)){
            Toast.makeText(this,"Please enter your weight",Toast.LENGTH_SHORT).show();

        }
        else if(TextUtils.isEmpty(h)){
            Toast.makeText(this,"Please enter your height",Toast.LENGTH_SHORT).show();

        }
        else
        {
            lodingbar.setTitle("Create Account");
            lodingbar.setMessage("Please wait while we check the credentials");
            lodingbar.setCanceledOnTouchOutside(false);
            lodingbar.show();
            b = Integer.parseInt(weight.getText().toString()) / ((0.0001) * (Integer.parseInt(height.getText().toString()) * (Integer.parseInt(height.getText().toString()))));
            String bmi=String.format("%.2f", b);
            ValidatephoneNumber(name,phone,password,code,emaill,a,w,h,gender,e,bmi);

        }
    }
    private void ValidatephoneNumber(final String name, final String phone, final String password,final String code,final String emaill,final String a,final String w,final String h,final String gender,final String e,final String bmi)
    {
        final DatabaseReference RootRef;
        RootRef= FirebaseDatabase.getInstance().getReference();
        RootRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if (!(dataSnapshot.child("Users").child(phone).exists()))
                {
                    HashMap<String,Object> userdatamap=new HashMap<>();
                    userdatamap.put("phone",phone);
                    userdatamap.put("password",password);
                    userdatamap.put("name",name);
                    userdatamap.put("email",emaill);
                    userdatamap.put("age",a);
                    userdatamap.put("weight",w);
                    userdatamap.put("height",h);
                    userdatamap.put("gender",gender);
                    userdatamap.put("exercise",e);
                    userdatamap.put("bmi",bmi);
                    RootRef.child("Users").child(phone).updateChildren(userdatamap)
                            .addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    if(task.isSuccessful())
                                    {
                                        lodingbar.dismiss();
                                        String phoneNumber = code+phone;
                                        String phonen=phone;
                                        Intent intent = new Intent(SignUpActivity.this, VerificationCode.class);
                                        intent.putExtra("phoneNumber", phoneNumber);
                                        intent.putExtra("phone",phone);
                                        startActivity(intent);
                                    }
                                    else
                                    {
                                        Toast.makeText(SignUpActivity.this,"Check your internet connection",Toast.LENGTH_SHORT).show();
                                        lodingbar.dismiss();

                                    }
                                }
                            });
                }
                else
                {
                    Toast.makeText(SignUpActivity.this,"Try with another phone number.This phone number already exist.",Toast.LENGTH_SHORT).show();
                    Intent intent=new Intent(SignUpActivity.this,MainActivity.class);
                    startActivity(intent);
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
            Intent intent = new Intent(SignUpActivity.this, mainac.class);
            startActivity(intent);
        } else {
            Toast.makeText(SignUpActivity.this, "Press back again to return", Toast.LENGTH_SHORT).show();
            exit = true;
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    exit = false;
                }
            }, 2000);
        }
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        st=gender[position];
        et=excercisedetails[position];
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}

