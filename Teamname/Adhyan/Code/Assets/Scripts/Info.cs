using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Info : MonoBehaviour
{
    public string Name = "";
    public Vector3 originalPosition, forwardPosition;
    public float time = 0.5f;
    private void Start()
    {
        Name = gameObject.name;
        originalPosition = transform.localPosition;
        forwardPosition = transform.localPosition + (transform.forward * 2);
    }

    public void Selected()
    {
        StartCoroutine(SmoothLerp(originalPosition, forwardPosition, time));
        StartCoroutine(SmoothScale(new Vector3(1.2f,1.2f,1.2f), time));
    }

    public void Deselected()
    {
        StartCoroutine(SmoothLerp(forwardPosition, originalPosition, time));
        StartCoroutine(SmoothScale(new Vector3(1f, 1f, 1f), time));
    }

    private IEnumerator SmoothLerp(Vector3 pos1, Vector3 pos2,float time)
    {
        Vector3 startingPos = pos1;
        Vector3 finalPos = pos2;
        float elapsedTime = 0;

        while (elapsedTime < time)
        {
            transform.localPosition = Vector3.Lerp(startingPos, finalPos, (elapsedTime / time));
            elapsedTime += Time.deltaTime;
            yield return null;
        }
        transform.localPosition = finalPos;
    }

    private IEnumerator SmoothScale(Vector3 scale, float time)
    {
        Vector3 targetScale = scale;
        float elapsedTime = 0;

        while (elapsedTime < time)
        {
            transform.localScale = Vector3.Lerp(transform.localScale, targetScale, (elapsedTime / time));
            elapsedTime += Time.deltaTime;
            yield return null;
        }
        transform.localScale = scale;
    }
}
