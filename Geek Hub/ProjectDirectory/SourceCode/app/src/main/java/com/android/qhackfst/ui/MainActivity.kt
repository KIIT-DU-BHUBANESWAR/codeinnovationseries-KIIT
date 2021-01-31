package com.android.qhackfst.ui

import android.content.Intent
import android.os.Bundle
import android.provider.MediaStore
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.android.qhackfst.R
import com.android.qhackfst.ui.home.adult.DashboardViewModel
import com.android.qhackfst.ui.home.adult.UploadState
import com.android.qhackfst.util.tempFile
import com.google.android.material.bottomnavigation.BottomNavigationView

private const val RC_UPLOAD_FILE = 102

class MainActivity : AppCompatActivity() {


    private val dashboardViewModel by lazy {
        ViewModelProvider(this).get(DashboardViewModel::class.java)
    }

    var isStarted = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main2)
        val navView: BottomNavigationView = findViewById(R.id.nav_view)

        val navController = findNavController(R.id.nav_host_fragment)


        navView.setupWithNavController(navController)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, intent: Intent?) {
        super.onActivityResult(requestCode, resultCode, intent)
        if (resultCode == RESULT_OK && requestCode==RC_UPLOAD_FILE) {
            val pair =
                tempFile(intent!!.data!!) ?: return
            dashboardViewModel.upload(pair)
        }
    }

    override fun onResume() {
        super.onResume()
        isStarted = false
        dashboardViewModel.uploadStatus.observe(this, Observer {
            when (it) {
                is UploadState.ChooseFile -> {
                    if (!isStarted) {
                        val intent =
                            Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                        dashboardViewModel.uploadStatus.postValue(UploadState.FileNotChosen)
                        startActivityForResult(intent, RC_UPLOAD_FILE)
                        isStarted = true
                    }
                }
            }
        })

    }
}