package com.example.kiit.health.receivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.example.kiit.health.R;
import com.example.kiit.health.utils.StepDetectionServiceHelper;


public class OnBootCompletedBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        // start step detection
        StepDetectionServiceHelper.startAllIfEnabled(context);
        // reset hardware step count since last reboot
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(context);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putFloat(context.getString(R.string.pref_hw_steps_on_last_save), 0);
        editor.apply();
    }
}
