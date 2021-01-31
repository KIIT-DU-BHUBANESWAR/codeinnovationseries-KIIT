package com.example.kiit.health.yoga;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.kiit.health.R;

import java.util.ArrayList;

public class SetAdapter extends ArrayAdapter<Pose> {

    public SetAdapter(Context context, ArrayList<Pose> posesInSet){
        super(context, 0, posesInSet);}

    public View getView(int position, View listItemView, ViewGroup parent){

        if(listItemView == null){
            listItemView = LayoutInflater.from(getContext()).inflate(R.layout.poses_in_set, parent, false);
        }

        Pose currentPoseinSet = getItem(position);

        if(currentPoseinSet != null) {
            TextView namePoseInSet = (TextView) listItemView.findViewById(R.id.poseInSetName);
            namePoseInSet.setText(currentPoseinSet.getName().toString());
        }

        listItemView.setTag(currentPoseinSet);
        return listItemView;
    }
}


