package com.example.kiit.health.yoga;

import android.content.Intent;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import androidx.appcompat.app.AppCompatActivity;

import com.example.kiit.health.R;

public class MainMenu extends AppCompatActivity {

    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.menumain, menu);
        return true;
    }

    public boolean onOptionsItemSelected(MenuItem item){
        if(item.getItemId() == R.id.add_pose){
            Intent intent = new Intent(this, AddPoseActivity.class);
            startActivity(intent);
            return true;
        }
        else if(item.getItemId() == R.id.add_session){
            Intent intent = new Intent(this, AddSessionActivity.class);
            startActivity(intent);
            return true;
        }
        else if(item.getItemId() == R.id.all_poses){
            Intent intent = new Intent(this, TopPosesActivity.class);
            startActivity(intent);
            return true;
        }
        else if(item.getItemId() == R.id.all_sessions){
            Intent intent = new Intent(this, TopSessionsActivity.class);
            startActivity(intent);
            return true;
        }
        else if(item.getItemId() == R.id.quotationMenu){
            Intent intent = new Intent(this, QuotationActivity.class);
            startActivity(intent);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
