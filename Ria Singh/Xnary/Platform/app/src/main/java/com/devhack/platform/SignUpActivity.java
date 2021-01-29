package com.devhack.platform;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.HashMap;
import java.util.Map;

public class SignUpActivity extends AppCompatActivity {
    TextInputEditText email,pass;
    Button prof;
    TextView login;

    private FirebaseAuth mAuth;
    FirebaseFirestore db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        //Initializing components
        email=findViewById(R.id.email);
        pass=findViewById(R.id.pass);
        prof =findViewById(R.id.prof);
        login=findViewById(R.id.login);

        //Initializing FirebaseAuth
        mAuth = FirebaseAuth.getInstance();
        db = FirebaseFirestore.getInstance();

        prof.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String Email=email.getText().toString().trim();
                String Pass=pass.getText().toString();
                if(!Email.equals("") || !Pass.equals("")){
                    mAuth.createUserWithEmailAndPassword(Email,Pass)
                            .addOnCompleteListener( new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if (task.isSuccessful()) {
                                FirebaseUser user = mAuth.getCurrentUser();
                               // while(user==null);
                                createUser(user);
                            } else {
                                Toast.makeText(SignUpActivity.this, ""+task, Toast.LENGTH_SHORT).show();
                                email.setText("");
                                pass.setText("");
                            }
                        }
                    });


                }
                else
                    Toast.makeText(SignUpActivity.this, "Enter email and password", Toast.LENGTH_SHORT).show();
            }
        });

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(SignUpActivity.this,MainActivity.class));
            }
        });
    }

    public void createUser(FirebaseUser user){
        Map<String, String> params = new HashMap<>();
        params.put("uid", user.getUid());

        db.collection("users")
                .document(user.getUid())
                .set(params)
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        startActivity(new Intent(SignUpActivity.this,HomePageActivity.class));
                        email.setText("");
                        pass.setText("");
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(SignUpActivity.this, "Error:"+e, Toast.LENGTH_LONG).show();
                    }
                });

    }
}

