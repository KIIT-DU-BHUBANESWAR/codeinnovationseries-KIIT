package fragments;

import android.os.Bundle;

import Models.Feed;
import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.devhack.platform.FeedAdapter;
import com.devhack.platform.R;
import com.devhack.platform.VerticalSpacingItemDecoration;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;

public class HomeFragment extends Fragment {

    RecyclerView feed;
    ArrayList<Feed>list;
    FirebaseFirestore db;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view=inflater.inflate(R.layout.fragment_home, container, false);
        feed=view.findViewById(R.id.feed);
        list=new ArrayList<>();
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext(),LinearLayoutManager.VERTICAL,false);
        feed.setLayoutManager(linearLayoutManager);
        VerticalSpacingItemDecoration itemDecoration = new VerticalSpacingItemDecoration(20);
        feed.addItemDecoration(itemDecoration);
        db=FirebaseFirestore.getInstance();
        receivePost();
        return view;
    }

    public void receivePost(){
        db.collection("Feed").orderBy("timestamp").get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot snapshot : task.getResult()) {
                                Feed obj=snapshot.toObject(Models.Feed.class);
                                list.add((obj));
                            }
                            feed.setAdapter(new FeedAdapter(getContext(),list));
                        }
                    }
                });

    }
}
