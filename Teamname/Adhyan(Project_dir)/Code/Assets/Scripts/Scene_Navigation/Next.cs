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
}
