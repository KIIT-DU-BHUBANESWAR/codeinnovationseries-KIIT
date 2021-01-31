package com.android.qhackfst.ui.login

import android.app.Application
import android.util.Patterns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.android.qhackfst.R
import com.android.qhackfst.data.User
import com.android.qhackfst.data.UserRepository
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import org.koin.core.KoinComponent
import org.koin.java.KoinJavaComponent


class LoginViewModel(application: Application) : AndroidViewModel(application), KoinComponent {
    private val mAuth by lazy { FirebaseAuth.getInstance() }

    private val _loginForm = MutableLiveData<LoginFormState>()
    val loginFormState: LiveData<LoginFormState> = _loginForm
    private val userDataBase by KoinJavaComponent.inject(UserRepository::class.java)
    val userLiveData: MutableLiveData<User> = MutableLiveData()
    private val _loginResult = MutableLiveData<LoginResult>()
    val loginResult: LiveData<LoginResult> = _loginResult

    init {
        userDataBase.exceptionHandler={
            println("com.meghdut.covid.ui.login>>LoginViewModel>  $it")
            it.printStackTrace()
        }
    }

    fun login(email: String, password: String) {

        mAuth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    val user = mAuth.currentUser!!

                    val userEmail = user.email
                    val username = user.displayName
                    _loginResult.postValue(LoginResult("LoggedIn $userEmail"))
                    userDataBase.getUser {
                        userLiveData.postValue(it)
                    }
                } else {

                    _loginResult.postValue(
                        LoginResult(
                            error = task.exception?.localizedMessage ?: " Unidentified Error"
                        )
                    )
                }
            }



    }


    private fun saveNewUser(firebaseUser: FirebaseUser){
        val user=User(firebaseUser.uid,firebaseUser.displayName?:"",firebaseUser.email?:"")
        userDataBase.setUser(user){
            userLiveData.postValue(user)
        }
    }


    fun signUp(email: String, password: String) {
        mAuth.createUserWithEmailAndPassword(email, password).addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val user = mAuth.currentUser!!
                val username = user.displayName
                _loginResult.postValue(LoginResult("LoggedIn $username"))

                saveNewUser(user)
            } else {

                _loginResult.postValue(
                    LoginResult(
                        error = task.exception?.localizedMessage ?: " Unidentified Error"
                    )
                )
            }

        }


    }

    fun loginDataChanged(username: String, password: String) {
        if (!isUserNameValid(username)) {
            _loginForm.value = LoginFormState(usernameError = R.string.invalid_username)
        } else if (!isPasswordValid(password)) {
            _loginForm.value = LoginFormState(passwordError = R.string.invalid_password)
        } else {
            _loginForm.value = LoginFormState(isDataValid = true)
        }
    }

    // A placeholder username validation check
    private fun isUserNameValid(username: String): Boolean {
        return if (username.contains('@')) {
            Patterns.EMAIL_ADDRESS.matcher(username).matches()
        } else {
            username.isNotBlank()
        }
    }

    // A placeholder password validation check
    private fun isPasswordValid(password: String): Boolean {
        return password.length > 5
    }
}