using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class toggle : MonoBehaviour
{
    public ARPlaneManager planeManager;
    public ARPointCloudManager pointCloudManager;

    public void OnValueChanged(bool isOn){
        VisualizePlanes(isOn);
        VisualizePoints(isOn);
    }

    public void Disable()
    {
        VisualizePlanes(false);
        VisualizePoints(false);
    }


    void VisualizePlanes(bool active){
        planeManager.enabled= active;
        foreach (ARPlane plane in planeManager.trackables){
            plane.gameObject.SetActive(active);
        }
    }

     void VisualizePoints(bool active){
        pointCloudManager.enabled= active;
        foreach (ARPointCloud point in pointCloudManager.trackables){
            point.gameObject.SetActive(active);
        }
    }
}
