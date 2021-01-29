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
import com.google.android.gms.tasks.Task;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class MainActivity extends AppCompatActivity {
    TextInputEditText email,pass;
    Button login;
    private FirebaseAuth mAuth;
    TextView signUp;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //Initialize UI
        email=findViewById(R.id.email);
        pass=findViewById(R.id.pass);
        login=findViewById(R.id.login);
        signUp=findViewById(R.id.signUp);

        //Initializing FirebaseAuth
        mAuth = FirebaseAuth.getInstance();

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String Email=email.getText().toString().trim();
                String Pass=pass.getText().toString();
                if(!Email.equals("")||!Pass.equals("")) {
                    mAuth.signInWithEmailAndPassword(Email, Pass)
                            .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                                @Override
                                public void onComplete(@NonNull Task<AuthResult> task) {
                                    if (task.isSuccessful()) {
                                        FirebaseUser user = mAuth.getCurrentUser();
                                        startActivity(new Intent(MainActivity.this, HomePageActivity.class));
                                        finish();
                                    } else {
                                        Toast.makeText(MainActivity.this, "Authentication failed.",
                                                Toast.LENGTH_SHORT).show();
                                    }

                                    // ...
                                }
                            });
                }
            }
        });

        signUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainActivity.this, ProfileCreationActivity.class));
            }
        });

    }
}
