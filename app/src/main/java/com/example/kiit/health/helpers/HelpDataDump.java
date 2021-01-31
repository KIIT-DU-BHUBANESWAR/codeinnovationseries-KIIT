package com.example.kiit.health.helpers;

import android.content.Context;


import com.example.kiit.health.R;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

public class HelpDataDump {

    private Context context;

    public HelpDataDump(Context context) {
        this.context = context;
    }

    public LinkedHashMap<String, List<String>> getDataGeneral() {
        LinkedHashMap<String, List<String>> expandableListDetail = new LinkedHashMap<>();

        List<String> general = new ArrayList<>();
        general.add(context.getResources().getString(R.string.help_intro));
        general.add(context.getResources().getString(R.string.help_functionality_step_counter_summary));
        expandableListDetail.put(context.getResources().getString(R.string.help_overview_heading), general);

        List<String> notifications = new ArrayList<>();
        notifications.add(context.getResources().getString(R.string.help_functionality_notification_summary));
        notifications.add(context.getResources().getString(R.string.help_functionality_notification_delete));
        expandableListDetail.put(context.getResources().getString(R.string.help_functionality_notification), notifications);

        List<String> motivationalert = new ArrayList<>();
        motivationalert.add(context.getResources().getString(R.string.help_functionality_motivation_alert_summary));
        expandableListDetail.put(context.getResources().getString(R.string.help_functionality_motivation_alert), motivationalert);

        List<String> walkingModes = new ArrayList<>();
        walkingModes.add(context.getResources().getString(R.string.help_walkingmodes_selection));
        expandableListDetail.put(context.getResources().getString(R.string.help_walkingmodes_heading), walkingModes);

        List<String> training = new ArrayList<>();
        training.add(context.getResources().getString(R.string.help_training_selection));
        expandableListDetail.put(context.getResources().getString(R.string.help_training_heading), training);

        List<String> distancemeasurement = new ArrayList<>();
        distancemeasurement.add(context.getResources().getString(R.string.help_distancemeasurement_selection));
        expandableListDetail.put(context.getResources().getString(R.string.help_distancemeasurement_heading), distancemeasurement);

        List<String> correctsteps = new ArrayList<>();
        correctsteps.add(context.getResources().getString(R.string.help_correctsteps_selection));
        expandableListDetail.put(context.getResources().getString(R.string.help_correctsteps_heading), correctsteps);

        List<String> permissions = new ArrayList<>();
        permissions.add(context.getResources().getString(R.string.help_permissions_selection));
        expandableListDetail.put(context.getResources().getString(R.string.help_privacy_heading), permissions);

        List<String> bootpermission = new ArrayList<>();
        bootpermission.add(context.getResources().getString(R.string.help_permission_boot_description));
        expandableListDetail.put(context.getResources().getString(R.string.help_permission_boot_heading), bootpermission);

        List<String> wakePermission = new ArrayList<>();
        wakePermission.add(context.getResources().getString(R.string.help_permission_wake_description));
        expandableListDetail.put(context.getResources().getString(R.string.help_permission_wake_heading), wakePermission);

        List<String> gpsPermission = new ArrayList<>();
        gpsPermission.add(context.getResources().getString(R.string.help_permission_gps_description));
        expandableListDetail.put(context.getResources().getString(R.string.help_permission_gps_heading), gpsPermission);

        return expandableListDetail;
    }

}
