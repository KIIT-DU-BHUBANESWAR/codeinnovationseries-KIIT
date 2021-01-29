package com.devhack.platform;

import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.icu.text.CaseMap;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.VideoView;

import com.bumptech.glide.Glide;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import Models.Feed;
import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

public class FeedAdapter extends RecyclerView.Adapter<FeedAdapter.FeedAdaterViewHolder> {
    Context context;
    ArrayList<Feed> list;
    FirebaseFirestore db=FirebaseFirestore.getInstance();

    public FeedAdapter(Context context, ArrayList<Feed> list) {
        this.context = context;
        this.list = list;
    }

    @NonNull
    @Override
    public FeedAdaterViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(context).inflate(R.layout.feed_layout,parent,false);
        return new FeedAdapter.FeedAdaterViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final FeedAdaterViewHolder holder, int position) {
        final Feed obj=list.get(position);
        holder.title.setText(obj.getTitle());
        holder.desc.setText(obj.getDesc());
        if(!obj.getFile().equals("")){
            holder.pdf.setVisibility(View.VISIBLE);
            holder.pdf.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    context.startActivity(new Intent(Intent.ACTION_VIEW,
                            Uri.parse(obj.getFile())));
                }
            });
        }
        else if(!obj.getImage().equals("")){
            holder.img.setVisibility(View.VISIBLE);
            Glide.with(context).load(obj.getImage()).into(holder.img);
        }
        else
            if(!obj.getVideo().equals("")){
                holder.video.setVisibility(View.VISIBLE);
                holder.video.setVideoPath(obj.getVideo());
                holder.video.start();
            }
            holder.date.setText(obj.getDate());


        db.collection("users").get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot snapshot : task.getResult()) {
                                if(obj.getUser().equals(snapshot.get("uid"))){
                                    holder.prof.setText(snapshot.get("prof").toString());
                                    holder.username.setText(snapshot.get("name").toString());
                                    Glide.with(context).load(snapshot.get("profilePic")).into(holder.pic);
                                }
                            }

                        }
                    }
                });



    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public class FeedAdaterViewHolder extends RecyclerView.ViewHolder{
        TextView title,desc;
        ImageView img,pic;
        VideoView video;
        CardView pdf;
        TextView username,prof,date;
        public FeedAdaterViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.title);
            desc = itemView.findViewById(R.id.desc);
            img = itemView.findViewById(R.id.img);
            video = itemView.findViewById(R.id.video);
            pdf = itemView.findViewById(R.id.pdf);
            pic = itemView.findViewById(R.id.pic);
            username = itemView.findViewById(R.id.username);
            prof = itemView.findViewById(R.id.profession);
            date=itemView.findViewById(R.id.date);

        }
    }

}
