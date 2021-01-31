package com.android.qhackfst


import android.app.Application
import com.android.qhackfst.data.FirebaseUserRepository
import com.android.qhackfst.data.UserRepository
import com.android.qhackfst.ui.signup.RegistrationViewModel
import com.google.firebase.auth.FirebaseAuth
import io.paperdb.Paper
import org.koin.android.ext.koin.androidContext
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.context.startKoin
import org.koin.dsl.module

class OptumApp : Application() {


    val myModule = module {
        single { FirebaseAuth.getInstance() }
        viewModel { RegistrationViewModel(get()) }
        single<UserRepository> { FirebaseUserRepository(get()) }
    }

    override fun onCreate() {
        super.onCreate()
        println("com.meghdut.covid>>CovidApplication>onCreate  ds")
        Paper.init(this)
        startKoin {
            androidContext(this@OptumApp)
            modules(myModule)
        }
    }
}