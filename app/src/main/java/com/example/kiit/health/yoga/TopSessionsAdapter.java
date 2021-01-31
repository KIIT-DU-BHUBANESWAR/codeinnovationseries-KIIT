package com.example.kiit.health.yoga;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.kiit.health.R;

import java.util.ArrayList;


public class TopSessionsAdapter extends ArrayAdapter<Session> {


    public TopSessionsAdapter(Context context, ArrayList<Session> sessions){ super(context, 0, sessions);}


    public View getView(int position, View listItemView, ViewGroup parent){

        if(listItemView == null){
            listItemView = LayoutInflater.from(getContext()).inflate(R.layout.session_item, parent, false );
        }
        final Session currentSession = getItem(position);
        TextView nameSession = (TextView)listItemView.findViewById(R.id.sessionList);
        nameSession.setText(currentSession.getName().toString());

        final View finalListItemView = listItemView;
        final ViewGroup parent2 = parent;
        if(currentSession.getStatus().equalsIgnoreCase("Y")){
            listItemView.setBackgroundColor(Color.rgb(222, 217, 226));
        }
        listItemView.setTag(currentSession);
        return listItemView;
    }

}




