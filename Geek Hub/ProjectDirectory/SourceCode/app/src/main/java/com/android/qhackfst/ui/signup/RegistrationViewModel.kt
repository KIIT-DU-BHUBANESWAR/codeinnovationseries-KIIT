package com.android.qhackfst.ui.signup

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import com.android.qhackfst.data.User
import com.android.qhackfst.data.UserDetails
import com.android.qhackfst.data.UserRepository
import com.android.qhackfst.ui.signup.RegistrationState.Finished
import org.koin.core.KoinComponent
import org.koin.java.KoinJavaComponent.inject

class RegistrationViewModel(val app: Application) : AndroidViewModel(app), KoinComponent {

    private val userRepository by inject(UserRepository::class.java)
    val userLiveData: MutableLiveData<User> = MutableLiveData()
    val formState: MutableLiveData<RegistrationState> = MutableLiveData()

    init {
        load()
    }


    fun load() {
        userRepository.getUser {
            userLiveData.postValue(it)
            formState.postValue(RegistrationState.Unfinished)
        }
    }

    fun register(userName: String, age: Int, gender: String) {

        val userID = userLiveData.value!!.id
        val userDetails = UserDetails(userID)
        userDetails.name = userName
        userDetails.age = age.toString()
        userDetails.gender = gender
        userRepository.setUserDetails(userDetails) {
            formState.postValue(Finished)
        }
    }
}