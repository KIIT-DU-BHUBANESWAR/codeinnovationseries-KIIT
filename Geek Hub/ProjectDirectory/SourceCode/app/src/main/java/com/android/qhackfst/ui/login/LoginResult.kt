package com.android.qhackfst.ui.login

/**
 * Authentication result : success (user details) or error message.
 */
data class LoginResult(
    val success: String = "",
    val error: String = ""
)