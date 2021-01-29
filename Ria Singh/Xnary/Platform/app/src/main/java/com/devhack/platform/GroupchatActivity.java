package com.devhack.platform;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class GroupchatActivity extends AppCompatActivity {
    private Toolbar mtoolbar;
    private ImageView sendbtn;
    private EditText usermsg;
    private ScrollView mscroll;
    private TextView displaytextmsgs;
    private FirebaseAuth mauth;
    private FirebaseFirestore fstore;
    private DatabaseReference userref, grpnameref, grpmsgkeyref;
    private String currentgroupname, currentuserid, currentusername, currentdate, currenttime;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_groupchat);

        currentgroupname = getIntent().getExtras().get("groupname").toString();
        mauth = FirebaseAuth.getInstance();
        fstore=FirebaseFirestore.getInstance();
        mtoolbar = (Toolbar) findViewById(R.id.group_chat_bar_layout);
        currentuserid = mauth.getCurrentUser().getUid();
        Toast.makeText(this, "Current user"+currentuserid, Toast.LENGTH_SHORT).show();
        userref = FirebaseDatabase.getInstance().getReference().child("Users");
        grpnameref = FirebaseDatabase.getInstance().getReference().child("Rooms").child(currentgroupname);
        initializefields();
        getusetrinfo();
        sendbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendmsgtodatabse();
                usermsg.setText("");
                mscroll.fullScroll(ScrollView.FOCUS_DOWN);

            }


        });

       // Toast.makeText(GroupchatActivity.this, currentgroupname, Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onStart() {
        super.onStart();
        grpnameref.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {
                if (dataSnapshot.exists()) {
                    Displaymsgs(dataSnapshot);
                }

            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {
                Displaymsgs(dataSnapshot);

            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }


    private void initializefields() {
        //currentgroupname=getIntent().getExtras().get("groupname").toString();
        //Toast.makeText(GroupchatActivity.this,currentgroupname,Toast.LENGTH_LONG).show();
        setSupportActionBar(mtoolbar);
        getSupportActionBar().setTitle(currentgroupname);
        sendbtn = (ImageView) findViewById(R.id.sendbutton);
        usermsg = (EditText) findViewById(R.id.input_group_msg);
        displaytextmsgs = (TextView) findViewById(R.id.group_chat_text_display);
        mscroll = (ScrollView) findViewById(R.id.myscroll_view);
    }

    private void getusetrinfo() {
        DocumentReference docRef = fstore.collection("users").document(currentuserid);
        docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document != null) {
                        currentusername = document.getString("name");

                    } else {
                        Log.d("LOGGER", "No such document");
                    }
                } else {
                    Log.d("LOGGER", "get failed with ", task.getException());
                }
            }
        });
    }
    private void sendmsgtodatabse() {
        String msg = usermsg.getText().toString();
        String msgkey = grpnameref.push().getKey();
        if (TextUtils.isEmpty(msg)) {
            Toast.makeText(GroupchatActivity.this, "please write message first", Toast.LENGTH_LONG).show();
        } else {
            Calendar calfordate = Calendar.getInstance();
            SimpleDateFormat currentdateformat = new SimpleDateFormat(" dd MMM,yyyy");
            currentdate = currentdateformat.format(calfordate.getTime());
            Calendar calfortime = Calendar.getInstance();
            SimpleDateFormat currenttimeformat = new SimpleDateFormat("hh:mm a");
            currenttime = currenttimeformat.format(calfortime.getTime());
            HashMap<String, Object> grpmsgkey = new HashMap<>();
            grpnameref.updateChildren(grpmsgkey);
            grpmsgkeyref = grpnameref.child(msgkey);
            HashMap<String, Object> msginfomap = new HashMap<>();
            msginfomap.put("name", currentusername);
            msginfomap.put("message", msg);
            msginfomap.put("Date", currentdate);
            msginfomap.put("Time", currenttime);
            grpmsgkeyref.updateChildren(msginfomap);


        }
    }
    private void Displaymsgs(DataSnapshot dataSnapshot) {
        Iterator iterator = dataSnapshot.getChildren().iterator();
        Calendar calfordate = Calendar.getInstance();
        SimpleDateFormat currentdateformat = new SimpleDateFormat(" dd MMM,yyyy");
        String  currentdate = currentdateformat.format(calfordate.getTime());
        String key = dataSnapshot.getKey();
        while (iterator.hasNext()) {
            String chatdate = (String) ((DataSnapshot) iterator.next()).getValue();
            String chattime = (String) ((DataSnapshot) iterator.next()).getValue();
            String chatmsg = (String) ((DataSnapshot) iterator.next()).getValue();
            String chatname = (String) ((DataSnapshot) iterator.next()).getValue();

            String date = chatdate.substring(1, 3);
            int dateint = Integer.parseInt(date);
            String systemdates = currentdate.substring(1, 3);
            int systemdatte = Integer.parseInt(systemdates);
            systemdatte -= dateint;

            if (systemdatte >=2) {
                DatabaseReference reference = FirebaseDatabase.getInstance().getReference().child("Rooms").child(currentgroupname).child(key);
                //reference.child("Date").removeValue();
                //reference.child("Time").removeValue();
                //reference.child("message").removeValue();
                //reference.child("name").removeValue();
                //reference.child("ukey").removeValue();
                dataSnapshot.getRef().removeValue();
            } else {
                displaytextmsgs.append(chatname + ":\n" + chatmsg + "\n" + chattime + "  " + chatdate + "\n\n\n");
                mscroll.fullScroll(ScrollView.FOCUS_DOWN);
                String a=(dataSnapshot.getRef()).toString();


            }
        }

    }
}
