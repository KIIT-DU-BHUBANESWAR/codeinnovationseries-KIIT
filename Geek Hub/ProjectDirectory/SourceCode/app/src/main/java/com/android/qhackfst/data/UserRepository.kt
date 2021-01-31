package com.android.qhackfst.data

interface UserRepository {
    fun getUserID(fund: (String) -> Unit)
    fun getUser(func: (User?) -> Unit)
    fun setUser(user: User, onComplete: () -> Unit = {})

    fun getUserDetails(func: (UserDetails?) -> Unit)
    fun setUserDetails(userDetails: UserDetails, onComplete: () -> Unit = {})

    val isLoggedIn: Boolean
    var exceptionHandler: (Exception) -> Unit

    fun logOut()
}