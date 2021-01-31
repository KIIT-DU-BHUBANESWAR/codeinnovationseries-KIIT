package com.android.qhackfst.data


data class UserDetails(
    val id: String,
    var gender: String = "",
    var age: String = "",
    var name: String = "",
    var userType:String ="patient"
)