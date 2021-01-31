package com.android.qhackfst.ui.home.oldie

import android.app.Application
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import com.android.qhackfst.network.VisionResponse
import com.android.qhackfst.util.createTempImage
import com.google.gson.Gson
import okhttp3.*
import java.io.IOException
import java.util.concurrent.TimeUnit


class OldieViewModel(val app: Application) : AndroidViewModel(app) {
    val heartRateMessage = MutableLiveData<String>()
    val visionAIMessage = MutableLiveData<String>()
    val perkinsonType = MutableLiveData<String>()
    val perkinsonMessage = MutableLiveData<String>()


    fun visionAI(fileUri: Uri) {
        val imageFile = app.createTempImage(fileUri)
        visionAIMessage.postValue("Processing Image...")
        val client = getClient()
        val body: RequestBody = MultipartBody.Builder().setType(MultipartBody.FORM)
            .addFormDataPart(
                "input_image", "test.jpeg",
                RequestBody.create(
                    MediaType.parse("application/octet-stream"),
                    imageFile
                )
            )
            .addFormDataPart("platform", "app")
            .build()
        val request: Request = Request.Builder()
            .url("http://visionaiapp.herokuapp.com/")
            .method("POST", body)
            .build()
        client.newCall(request).enqueue(object : okhttp3.Callback {
            override fun onFailure(call: okhttp3.Call, e: IOException) {
                visionAIMessage.postValue("Error in response")
                println("com.android.qhackfst.ui.home.oldie>>OldieViewModel>onFailure  ")
            }

            override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                val string = response.body()?.string()
                val vision = Gson().fromJson(string, VisionResponse::class.java)
                if (vision != null) {
                    visionAIMessage.postValue(vision.caption)
                }
                println("com.android.qhackfst.ui.home.oldie>>OldieViewModel>onResponse  ")
            }
        })
    }

    private fun getClient(): OkHttpClient {
        val client = OkHttpClient().newBuilder()
            .callTimeout(60, TimeUnit.MINUTES)
            .readTimeout(60, TimeUnit.MINUTES)
            .connectTimeout(60, TimeUnit.MINUTES).build()
        return client
    }

    fun parkinson(type: String, imageUri: Uri) {
        perkinsonMessage.postValue("Processing Image..")
        val tempImage = app.createTempImage(imageUri)
        val client = getClient()
        val body: RequestBody = MultipartBody.Builder().setType(MultipartBody.FORM)
            .addFormDataPart(
                "InputImg", "pp.jpeg",
                RequestBody.create(
                    MediaType.parse("application/octet-stream"),
                    tempImage
                )
            )
            .build()
        val request: Request = Request.Builder()
            .url("https://parkinsonsai.herokuapp.com/$type")
            .method("POST", body)
            .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                perkinsonMessage.postValue("Error in Response")
            }

            override fun onResponse(call: Call, response: Response) {
                val string = response.body()?.string()
                perkinsonMessage.postValue(string)
            }
        })

    }


}