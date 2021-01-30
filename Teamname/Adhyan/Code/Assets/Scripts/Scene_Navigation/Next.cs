using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Next : MonoBehaviour
{
    public void NextScreen(){
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex+1);
    }

    public void SecScreen(){
        SceneManager.LoadScene(3);
    }
    
    public void PriScreen(){
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex-1);
    }

    public void Sec_Back(){
        SceneManager.LoadScene(1);
    }

    public void Alpha_Sreen(){
        SceneManager.LoadScene(4);
    }

    public void MapScene()
    {
        SceneManager.LoadScene(5);
    }

    public void back_pri(){
        SceneManager.LoadScene(2);
    }

    public void back_sec(){
        SceneManager.LoadScene(3);
    }
}
