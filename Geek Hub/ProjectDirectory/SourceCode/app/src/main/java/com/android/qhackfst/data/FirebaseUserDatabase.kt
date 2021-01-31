package com.android.qhackfst.data

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.firestore.FirebaseFirestoreSettings
import com.google.firebase.firestore.SetOptions
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import io.paperdb.Book
import io.paperdb.Paper

private const val LOGED_IN_STATUS = "LoggedIn"


class FirebaseUserRepository(private val firebaseAuth: FirebaseAuth) : UserRepository {
    private val firestore by lazy {
        Firebase.firestore.apply {
            firestoreSettings = FirebaseFirestoreSettings.Builder()
                .setPersistenceEnabled(false)
                .build()
        }
    }

    private val userData by lazy { firestore.collection("AndroidUser") }
    private val offlineUserData: Book = Paper.book("userData")


    private val firebaseUser: FirebaseUser
        get() = firebaseAuth.currentUser!!

    override var exceptionHandler: (Exception) -> Unit = {
        println("com.android.qhackfst.data>>FirebaseUserRepository> ${it.localizedMessage}  ")
    }

    override fun getUserID(fund: (String) -> Unit) {
        fund(firebaseUser.uid)
    }

    override fun getUser(func: (User?) -> Unit) {
        firebaseAuth.currentUser
        userData.document(firebaseUser.uid).get().addOnSuccessListener {
            val map = it.get("user", User::class.java)
            func(map)
        }.addOnFailureListener {
            exceptionHandler(it)
        }
    }

    override fun setUser(user: User, onComplete: () -> Unit) {
        val userInfoMap = hashMapOf("user" to user).toMap()
        userData.document(firebaseUser.uid).set(userInfoMap, SetOptions.merge()).addOnCompleteListener {
            onComplete()
        }
    }


    override fun getUserDetails(func: (UserDetails?) -> Unit) {
        userData.document(firebaseUser.uid).get().addOnSuccessListener {
            val userDetails = it.get("userDetails",UserDetails::class.java)
            func(userDetails)
        }.addOnFailureListener {
            exceptionHandler(it)
        }

    }

    override fun setUserDetails(userDetails: UserDetails, onComplete: () -> Unit) {
        val userDetailsMap = hashMapOf("userDetails" to userDetails).toMap()
        userData.document(firebaseUser.uid).set(userDetailsMap, SetOptions.merge())
            .addOnCompleteListener {
                getUser {
                    val copy =
                        it?.copy(name = userDetails.name, isRegistered = true) ?: return@getUser
                    setUser(copy)
                    onComplete()
                }
            }
    }

     override val isLoggedIn: Boolean
        get() = firebaseAuth.currentUser!=null


    override fun logOut() {
        offlineUserData.write(LOGED_IN_STATUS, false)
        firebaseAuth.signOut()
    }


}