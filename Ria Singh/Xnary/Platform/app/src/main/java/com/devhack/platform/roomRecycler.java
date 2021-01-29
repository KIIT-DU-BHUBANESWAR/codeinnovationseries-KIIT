package com.devhack.platform;

import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.VideoView;

import com.bumptech.glide.Glide;

import java.util.ArrayList;
import Models.Feed;
import Models.mRoom;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

public class roomRecycler extends RecyclerView.Adapter<roomRecycler.FeedAdaterViewHolder> {
    Context context;
    ArrayList<mRoom> list;

    public roomRecycler(Context context, ArrayList<mRoom> list) {
        this.context = context;
        this.list = list;
    }

    @NonNull
    @Override
    public FeedAdaterViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(context).inflate(R.layout.roomlayout,parent,false);
        return new roomRecycler.FeedAdaterViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final FeedAdaterViewHolder holder, int position) {
        final mRoom obj=list.get(position);
        holder.roomname.setText(obj.getRoomname());
        holder.roomname.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent grpchatintent=new Intent(context,GroupchatActivity.class);
                grpchatintent.putExtra("groupname",holder.roomname.getText().toString());
                context.startActivity(grpchatintent);


            }
        });



    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public class FeedAdaterViewHolder extends RecyclerView.ViewHolder{
        TextView roomname;
        public FeedAdaterViewHolder(@NonNull View itemView) {
            super(itemView);
            roomname=itemView.findViewById(R.id.name);

        }
    }

}
