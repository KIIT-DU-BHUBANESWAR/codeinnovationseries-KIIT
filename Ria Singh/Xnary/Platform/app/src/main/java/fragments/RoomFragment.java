package fragments;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.devhack.platform.GroupchatActivity;
import com.devhack.platform.R;
import com.devhack.platform.VerticalSpacingItemDecoration;
import com.devhack.platform.roomRecycler;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import Models.mRoom;

import static androidx.constraintlayout.widget.Constraints.TAG;

public class RoomFragment extends Fragment {
    ImageView creatRoom,createNewRoom;
    private DatabaseReference rootref,groupref;
    private View grpview;
    private RecyclerView recyclerView;
    private roomRecycler recyclerViewAdapter;
    private ArrayList<mRoom> listofgrps;
    private mRoom mlistroom=null;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        grpview= inflater.inflate(R.layout.fragment_room, container, false);
        creatRoom = grpview.findViewById(R.id.createroom);
        createNewRoom=grpview.findViewById(R.id.createnewroom);
        recyclerView = grpview.findViewById(R.id.chatsRv);
        LinearLayoutManager manager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(manager);
        recyclerView.setHasFixedSize(true);
        VerticalSpacingItemDecoration itemDecoration = new VerticalSpacingItemDecoration(20);
        recyclerView.addItemDecoration(itemDecoration);
        listofgrps = new ArrayList<>();
        rootref = FirebaseDatabase.getInstance().getReference();
        groupref= FirebaseDatabase.getInstance().getReference().child("Rooms");
        initializefileds(grpview);
        createNewRoom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                requestnewroom();
            }
        });
        rootref.child("Rooms").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    createNewRoom.setVisibility(View.VISIBLE);
                    //Toast.makeText(getActivity(), "Got some Rooms", Toast.LENGTH_LONG).show();
                    retriveanddisplaygroup();
                } else {
                    creatRoom.setVisibility(View.VISIBLE);
                    Toast.makeText(getActivity(), "No Rooms", Toast.LENGTH_LONG).show();
                    creatRoom.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            requestnewroom();
                        }


                    });
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        return grpview;
    }

    private void requestnewroom() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext(), R.style.AlertDialog);
        builder.setTitle("Enter Room Name");
        final EditText grpname = new EditText(getContext());
        grpname.setHint(" eg.What is Newtons 1st Law");
        builder.setView(grpname);
        builder.setPositiveButton("Create", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String grp = grpname.getText().toString();
                if (TextUtils.isEmpty(grp)) {
                    Toast.makeText(getContext(), "Please enter a group name", Toast.LENGTH_LONG).show();
                } else {

                    createnewroom(grp);
                }

            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });
        builder.show();
    }


    private void createnewroom(final String grp) {
        rootref.child("Rooms").child(grp).setValue("").addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                if (task.isSuccessful()) {
                    creatRoom.setVisibility(View.INVISIBLE);
                    createNewRoom.setVisibility(View.VISIBLE);
                    Toast.makeText(getContext(), grp + "Created successfully !!", Toast.LENGTH_LONG).show();
                    retriveanddisplaygroup();
                }

            }
        });
    }
    private void initializefileds(View view) {
        recyclerViewAdapter = new roomRecycler(getContext(),listofgrps);
        recyclerView.setAdapter(recyclerViewAdapter);


    }
    private void retriveanddisplaygroup() {
        rootref.child("Rooms").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                Iterator iterator=dataSnapshot.getChildren().iterator();
                while(iterator.hasNext())
                {
                    mlistroom = new mRoom();
                    String name=(((DataSnapshot)iterator.next()).getKey());
                    mlistroom.setRoomname(name);
                    listofgrps.add(mlistroom);

                }
                recyclerView.setAdapter(new roomRecycler(getContext(),listofgrps));
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

}

