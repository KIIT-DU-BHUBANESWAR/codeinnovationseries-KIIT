package com.example.kiit.health.activities;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
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
import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.StorageTask;
import com.squareup.picasso.Picasso;

import java.util.HashMap;

import de.hdodenhof.circleimageview.CircleImageView;

public class ProfileActivity extends AppCompatActivity {
    private EditText fullNameEditText,userPhoneEditText,emailEditText,ageet,weightet,heightet;
    private TextView bmi;
    Button saveTextButton;
    private Uri ImageUri;
    ImageView closeTextbtn;
    private String myUri="";
    double b;
    private StorageTask uploadTask;
    private StorageReference storageProfilePictureRef;
    private String checker="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        fullNameEditText=(EditText)findViewById(R.id.settings_full_name);
        userPhoneEditText=(EditText)findViewById(R.id.phone);
        emailEditText=(EditText)findViewById(R.id.email);
        weightet=(EditText)findViewById(R.id.weight);
        ageet=(EditText)findViewById(R.id.age);
        heightet=(EditText)findViewById(R.id.height);
        closeTextbtn=findViewById(R.id.backbtn);
        saveTextButton=findViewById(R.id.btnupdate);

        bmi=findViewById(R.id.bmi);
        userInfoDisplay(fullNameEditText,userPhoneEditText,emailEditText,ageet,weightet,heightet,bmi);
        fullNameEditText.setText(Prevalent.currentOnlineUsers.getName());
        userPhoneEditText.setText(Prevalent.currentOnlineUsers.getPhone());
        emailEditText.setText(Prevalent.currentOnlineUsers.getEmail());
        weightet.setText(Prevalent.currentOnlineUsers.getWeight());
        ageet.setText(Prevalent.currentOnlineUsers.getAge());
        heightet.setText(Prevalent.currentOnlineUsers.getHeight());
        b=Integer.parseInt(weightet.getText().toString())/((0.0001)*(Integer.parseInt(heightet.getText().toString())*(Integer.parseInt(heightet.getText().toString()))));
        bmi.setText(String.format("%.2f",b));
        saveTextButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(checker.equals("clicked"))
                {
                    userInfoSave();
                }
                else
                {
                    updateOnlyUserInfo();
                }
            }
        });

    }



    private void updateOnlyUserInfo() {
        DatabaseReference ref= FirebaseDatabase.getInstance().getReference().child("Users");
        HashMap<String,Object> userMAp=new HashMap<>();
        userMAp.put("name",fullNameEditText.getText().toString());
        userMAp.put("email",emailEditText.getText().toString());
        userMAp.put("age",ageet.getText().toString());
        userMAp.put("weight",weightet.getText().toString());
        userMAp.put("height",heightet.getText().toString());
        userMAp.put("phone",userPhoneEditText.getText().toString());
        userMAp.put("bmi",bmi.getText().toString());
        startActivity(new Intent(ProfileActivity.this,ProfileActivity.class));

        Toast.makeText(ProfileActivity.this,"Profile Updated",Toast.LENGTH_SHORT).show();
        finish();
        ref.child(Prevalent.currentOnlineUsers.getPhone()).updateChildren(userMAp);


    }

    private void userInfoSave() {
        if(TextUtils.isEmpty(fullNameEditText.getText().toString()))
        {
            Toast.makeText(this,"Name is mandatory",Toast.LENGTH_SHORT).show();

        }

        else   if(TextUtils.isEmpty(emailEditText.getText().toString()))
        {
            Toast.makeText(this,"Address is mandatory",Toast.LENGTH_SHORT).show();

        }
        else   if(TextUtils.isEmpty(emailEditText.getText().toString()))
        {
            Toast.makeText(this,"Email is mandatory",Toast.LENGTH_SHORT).show();

        }
        else   if(TextUtils.isEmpty(weightet.getText().toString()))
        {
            Toast.makeText(this,"Weight is mandatory",Toast.LENGTH_SHORT).show();


        }
        else   if(TextUtils.isEmpty(ageet.getText().toString()))
        {
            Toast.makeText(this,"Age is mandatory",Toast.LENGTH_SHORT).show();

        }
        else   if(TextUtils.isEmpty(heightet.getText().toString()))
        {
            Toast.makeText(this,"Height is mandatory",Toast.LENGTH_SHORT).show();

        }

        if(TextUtils.isEmpty(userPhoneEditText.getText().toString()))
        {
            Toast.makeText(this,"Phone number is mandatory",Toast.LENGTH_SHORT).show();

        }
        else if(checker.equals("clicked"))
        {
            uploadImage();
        }


    }

    private void uploadImage() {
        final ProgressDialog progressDialog=new ProgressDialog(this);
        progressDialog.setTitle("Update Profile");
        progressDialog.setMessage("Please Wait,while we are updating the information.");
        progressDialog.setCanceledOnTouchOutside(false);
        progressDialog.show();
        if(ImageUri !=null)
        {
            final StorageReference fileref=storageProfilePictureRef
                    .child(Prevalent.currentOnlineUsers.getPhone()+".jpg");
            uploadTask=fileref.putFile(ImageUri);
            uploadTask.continueWithTask(new Continuation() {
                @Override
                public Object then(@NonNull Task task) throws Exception {
                    if(!task.isSuccessful())
                    {
                        throw task.getException();
                    }
                    return fileref.getDownloadUrl();
                }
            })
                    .addOnCompleteListener(new OnCompleteListener<Uri>() {
                        @Override
                        public void onComplete(@NonNull Task<Uri> task) {
                            if(task.isSuccessful())
                            {
                                Uri downloaduri=task.getResult();
                                myUri=downloaduri.toString();
                                DatabaseReference ref=FirebaseDatabase.getInstance().getReference().child("Users");
                                HashMap<String,Object> userMAp=new HashMap<>();
                                userMAp.put("name",fullNameEditText.getText().toString());
                                userMAp.put("age",ageet.getText().toString());
                                userMAp.put("email",emailEditText.getText().toString());
                                userMAp.put("height",heightet.getText().toString());
                                userMAp.put("weight",weightet.getText().toString());
                                userMAp.put("phone",userPhoneEditText.getText().toString());
                                userMAp.put("bmi",bmi.getText().toString());
                                ref.child(Prevalent.currentOnlineUsers.getPhone()).updateChildren(userMAp);

                                progressDialog.dismiss();
                                startActivity(new Intent(ProfileActivity.this,RexDashboardActivity.class));

                                Toast.makeText(ProfileActivity.this,"Profile Updated",Toast.LENGTH_SHORT).show();
                                finish();

                            }
                            else
                            {
                                progressDialog.dismiss();
                                Toast.makeText(ProfileActivity.this,"Error",Toast.LENGTH_SHORT).show();

                            }
                        }
                    });
        }
        else
        {
            Toast.makeText(this,"Image not selected",Toast.LENGTH_SHORT).show();

        }
    }

    private void userInfoDisplay( final EditText fullNameEditText, final EditText userPhoneEditText, final EditText emailEditText,final EditText ageet,final EditText weightet,final EditText heightet,final  TextView bmi) {
        DatabaseReference UserRef= FirebaseDatabase.getInstance().getReference().child("Users").child(Prevalent.currentOnlineUsers.getPhone());
        UserRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if(dataSnapshot.exists())
                {
                    if(dataSnapshot.child("image").exists())
                    {
                        String name=dataSnapshot.child("name").getValue().toString();
                        String age=dataSnapshot.child("age").getValue().toString();
                        String weight=dataSnapshot.child("weight").getValue().toString();
                        String height=dataSnapshot.child("height").getValue().toString();

                        String phone=dataSnapshot.child("phone").getValue().toString();

                        String email=dataSnapshot.child("email").getValue().toString();
                        String bmii=dataSnapshot.child("bmi").getValue().toString();

                        fullNameEditText.setText(name);
                        userPhoneEditText.setText(phone);
                        emailEditText.setText(email);
                        ageet.setText(age);
                        weightet.setText(weight);
                        heightet.setText(height);
                        bmi.setText(bmii);
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
    @Override
    public void onBackPressed() {

        Intent i=new Intent(ProfileActivity.this,RexDashboardActivity.class);
        startActivity(i);


    }
}