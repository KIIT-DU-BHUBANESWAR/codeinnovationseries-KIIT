package com.example.kiit.health.yoga;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.kiit.health.R;

import java.util.ArrayList;


public class TopPosesAdapter extends ArrayAdapter<Pose> {

    public TopPosesAdapter(Context context, ArrayList<Pose> poses){ super(context, 0, poses);}

    public View getView(int position, View listItemView, ViewGroup parent){
        if(listItemView == null){
            listItemView = LayoutInflater.from(getContext()).inflate(R.layout.poses_item, parent, false );
        }
        Pose currentPose = getItem(position);
        TextView nameSession = (TextView)listItemView.findViewById(R.id.poseItem);
        nameSession.setText(currentPose.getName().toString());
        ImageView image = (ImageView) listItemView.findViewById(R.id.poseImageItem);
        image.setImageResource(currentPose.getImage());
        listItemView.setTag(currentPose);
        return listItemView;
    }
}
