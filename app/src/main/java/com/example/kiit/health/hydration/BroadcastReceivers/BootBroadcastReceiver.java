package com.example.kiit.health.hydration.BroadcastReceivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.example.kiit.health.hydration.Database.DrinkDataSource;
import com.example.kiit.health.hydration.MainWindow.AlarmHelper;
import com.example.kiit.health.hydration.Settings.PrefsHelper;


public class BootBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context pContext, Intent intent) {
        DrinkDataSource db= new DrinkDataSource(pContext);
        db.open();
       int waterNeed= PrefsHelper.getWaterNeedPrefs(pContext);
       db.createMissingDateLog(0,waterNeed);
       AlarmHelper.setDBAlarm(pContext);
    }
}


