package com.android.qhackfst.ui.signup

sealed class RegistrationState {
    object Unfinished : RegistrationState()
    object Finished : RegistrationState()
}