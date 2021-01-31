package com.example.kiit.health.utils;

import android.content.pm.PackageManager;
import android.os.Build;

public class AndroidVersionHelper {
    /**
     * Decides whether the current soft- and hardware setup allows to use hardware step detection
     * @param pm An instance of the android PackageManager
     * @return true if hardware step detection can be used otherwise false
     */
    public static boolean supportsStepDetector(PackageManager pm) {
        // (Hardware) step detection was introduced in KitKat (4.4 / API 19)
        // https://developer.android.com/about/versions/android-4.4.html
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT
                // In addition to the system version
                // the hardware step detection is not supported on every device
                // let's check the device's ability.
                && pm.hasSystemFeature(PackageManager.FEATURE_SENSOR_STEP_COUNTER)
                && pm.hasSystemFeature(PackageManager.FEATURE_SENSOR_STEP_DETECTOR);
    }

    /**
     * Decides whether the hardware step counter should be used. In this case the step counter-service
     * will not show any notification and update the step count not in real time. This helps to save
     * energy and increases the accuracy - but is only available on some devices.
     * @param pm An instance of the android PackageManager
     * @return true if hardware step counter should and can be used.
     */
    public static boolean isHardwareStepCounterEnabled(PackageManager pm){
        return supportsStepDetector(pm);
    }
}
