package com.devhack.platform;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import fragments.HomeFragment;
import fragments.PostFragment;
import fragments.RoomFragment;
import fragments.SearchFragment;

import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class HomePageActivity extends AppCompatActivity {
    BottomNavigationView bottomNavigationView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);

        bottomNavigationView=findViewById(R.id.bottom_nav);
        bottomNavigationView.setOnNavigationItemSelectedListener(navListener);
        getSupportFragmentManager().beginTransaction().replace(R.id.container,
                new HomeFragment()).commit();
    }

    private BottomNavigationView.OnNavigationItemSelectedListener navListener =
            new BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                    Fragment selectedFrag=null;
                    switch (item.getItemId()){
                        case R.id.home:selectedFrag=new HomeFragment();
                        break;
                        case R.id.search:selectedFrag=new SearchFragment();
                            break;
                        case R.id.post:selectedFrag=new PostFragment();
                            break;
                        case R.id.room:selectedFrag=new RoomFragment();
                            break;

                    }
                    getSupportFragmentManager().beginTransaction().replace(R.id.container,
                            selectedFrag).commit();

                    return true;

                }
            };

    private BottomNavigationView.OnNavigationItemReselectedListener reselectedListener=
            new BottomNavigationView.OnNavigationItemReselectedListener() {
        @Override
        public void onNavigationItemReselected(@NonNull MenuItem item) {
            Fragment selectedFrag=null;
            switch (item.getItemId()){
                case R.id.home:selectedFrag=new HomeFragment();
                    break;
                case R.id.search:selectedFrag=new SearchFragment();
                    break;
                case R.id.room:selectedFrag=new RoomFragment();
                    break;

            }
            getSupportFragmentManager().beginTransaction().replace(R.id.container,
                    selectedFrag).commit();

        }
    };


}
