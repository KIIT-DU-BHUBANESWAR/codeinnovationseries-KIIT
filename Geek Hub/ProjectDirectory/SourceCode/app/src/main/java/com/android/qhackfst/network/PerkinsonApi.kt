package com.android.qhackfst.network

import okhttp3.RequestBody
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface PerkinsonApi {

    @Multipart
    @POST("/spiral")
    fun spiralCheck(@Part("InputImg") file: RequestBody)

}