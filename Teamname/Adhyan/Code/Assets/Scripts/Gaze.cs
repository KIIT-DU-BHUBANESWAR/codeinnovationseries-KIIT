using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class Gaze : MonoBehaviour
{
    public Info current;
    [SerializeField]
    TMP_Text StateName;

    bool isSelected = true;
    private void Update()
    {
        if(Physics.Raycast(transform.position, transform.forward, out RaycastHit hit))
        {
            GameObject go = hit.collider.gameObject;
            if (go.CompareTag("HasInfo") && current!= go.GetComponent<Info>() && isSelected)
            {
                if (current != null) current.Deselected();
                current = go.GetComponent<Info>();
                StateName.text = current.name;
                current.Selected();
                StartCoroutine(Wait());
            }
            else if(go.CompareTag("HasInfo")==false)
            {
                StateName.text = "Point your camera towards a state to know its name!";
            }
        }
    }

    IEnumerator Wait()
    {
        isSelected = false;
        yield return new WaitForSeconds(1f);
        isSelected = true;
    }
}
