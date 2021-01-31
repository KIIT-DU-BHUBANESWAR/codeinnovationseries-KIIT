
package com.example.kiit.health.activities;

import android.os.Bundle;
import android.preference.PreferenceManager;

import androidx.fragment.app.FragmentTransaction;

import com.example.kiit.health.R;
import com.example.kiit.health.fragments.DailyReportFragment;
import com.example.kiit.health.fragments.MainFragment;
import com.example.kiit.health.fragments.MonthlyReportFragment;
import com.example.kiit.health.fragments.WeeklyReportFragment;
import com.example.kiit.health.utils.StepDetectionServiceHelper;


public class MainActivity extends BaseActivity implements DailyReportFragment.OnFragmentInteractionListener, WeeklyReportFragment.OnFragmentInteractionListener, MonthlyReportFragment.OnFragmentInteractionListener {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // init preferences
        PreferenceManager.setDefaultValues(this, R.xml.pref_general, false);
        PreferenceManager.setDefaultValues(this, R.xml.pref_notification, false);

        // Load first view
        final FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.replace(R.id.content_frame, new MainFragment(), "MainFragment");
        fragmentTransaction.commit();

        // Start step detection if enabled and not yet started
        StepDetectionServiceHelper.startAllIfEnabled(this);
        //Log.i(LOG_TAG, "MainActivity initialized");
    }


}
