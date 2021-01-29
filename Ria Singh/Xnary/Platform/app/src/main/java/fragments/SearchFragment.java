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
import android.widget.Toast;

import androidx.appcompat.widget.SearchView;

import com.devhack.platform.FeedAdapter;
import com.devhack.platform.R;
import com.devhack.platform.VerticalSpacingItemDecoration;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;

public class SearchFragment extends Fragment {
    RecyclerView list;
    SearchView searchView;
    ArrayList<Feed> result;
    FirebaseFirestore db;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view=inflater.inflate(R.layout.fragment_search, container, false);
        list=view.findViewById(R.id.list);
        searchView=view.findViewById(R.id.searchview);
        result=new ArrayList<>();
        db=FirebaseFirestore.getInstance();
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext(),LinearLayoutManager.VERTICAL,false);
        list.setLayoutManager(linearLayoutManager);
        VerticalSpacingItemDecoration itemDecoration = new VerticalSpacingItemDecoration(20);
        list.addItemDecoration(itemDecoration);

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String s) {
                search(s);
                return true;
            }

            @Override
            public boolean onQueryTextChange(String s) {
                search(s);
                return true;
            }
        });
        return view;
    }

    public  void  search(final String s){
        db.collection("Feed").get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        result.clear();
                        for (QueryDocumentSnapshot snapshot : task.getResult()){
                            if(snapshot.getData().get("Title").toString().equalsIgnoreCase(s))//if(comSubstr(s.toLowerCase(),snapshot.getData().get("Title").toString().toLowerCase())==1)//
                            {
                                Feed obj=snapshot.toObject(Models.Feed.class);
                                result.add((obj));
                                Toast.makeText(getContext(), ""+obj, Toast.LENGTH_SHORT).show();
                            }
                        }
                        list.setAdapter(new FeedAdapter(getContext(),result));
                    }
                });
    }

    public int comSubstr(String s1, String s2)
    {
        String w = "", sub = "";
        char ch;
        int c=0;
        int l1 = s1.length();
        int l2 = s2.length();
        for(int i=0; i<l1; i++)
        {
            ch = s1.charAt(i);
            if(ch!=' ')
            {
                c++;
                w+=ch;
            }
            else
            {
                for(int j=0; j<l2; j++)
                {
                    if((w.charAt(0) == s2.charAt(j)) && (l2-j)>=c)
                    {
                        sub = s2.substring(j,(j+c));
                        if(sub.equalsIgnoreCase(w))
                            return 1;
                    }
                }
                sub = "";
                w = "";
                c=0;
            }
        }
        return 0;
    }
}