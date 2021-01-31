package com.example.kiit.health.hydration.Dialogs;

import android.app.Dialog;
import android.content.Context;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.example.kiit.health.R;


public class congratulationDialog  extends Dialog implements View.OnClickListener{
    private ImageView CongCancel;

    public congratulationDialog(Context context) {
        super(context);
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.congratulation_dialog);
        CongCancel = (ImageView) findViewById(R.id.imageView2);
        getWindow().setBackgroundDrawable(new ColorDrawable(android.graphics.Color.TRANSPARENT));
        CongCancel.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        int id = v.getId();
        switch (id){
            case R.id.imageView2:
                dismiss();
                break;
        }

    }
}
