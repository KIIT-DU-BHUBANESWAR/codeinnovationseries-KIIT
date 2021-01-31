package com.example.kiit.health;

import android.content.pm.PackageManager;

import com.example.kiit.health.services.AbstractStepDetectorService;
import com.example.kiit.health.services.AccelerometerStepDetectorService;
import com.example.kiit.health.services.HardwareStepDetectorService;
import com.example.kiit.health.utils.AndroidVersionHelper;
public class Factory {

    /**
     * Returns the class of the step detector service which should be used
     *
     * The used step detector service depends on different soft- and hardware preferences.
     * @param pm An instance of the android PackageManager
     * @return The class of step detector
     */
    public static Class<? extends AbstractStepDetectorService> getStepDetectorServiceClass(PackageManager pm){
        if(pm != null && AndroidVersionHelper.supportsStepDetector(pm)) {
            return HardwareStepDetectorService.class;
        }else{
            return AccelerometerStepDetectorService.class;
        }
    }
}
