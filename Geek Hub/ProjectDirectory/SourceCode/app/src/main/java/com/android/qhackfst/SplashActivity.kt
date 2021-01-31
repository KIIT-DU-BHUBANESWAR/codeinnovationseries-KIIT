package com.android.qhackfst

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.android.qhackfst.data.UserRepository
import com.android.qhackfst.ui.LoginSignUpActivity
import com.android.qhackfst.ui.MainActivity
import org.koin.core.KoinComponent
import org.koin.java.KoinJavaComponent
import kotlin.concurrent.thread

class SplashActivity : AppCompatActivity(), KoinComponent {
    private val userRepository by KoinJavaComponent.inject(UserRepository::class.java)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.splash_sd)
    }

    override fun onResume() {
        super.onResume()
        thread {
            Thread.sleep(500L)
            if (userRepository.isLoggedIn) {
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }else{
                val intent = Intent(this, LoginSignUpActivity::class.java)
                startActivity(intent)
            }
            finish()
        }

    }
}