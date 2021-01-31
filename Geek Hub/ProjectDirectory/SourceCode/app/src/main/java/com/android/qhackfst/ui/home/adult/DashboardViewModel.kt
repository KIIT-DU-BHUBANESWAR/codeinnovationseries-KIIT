package com.android.qhackfst.ui.home.adult

import android.app.Application
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import com.android.qhackfst.data.MedicalRecord
import com.android.qhackfst.data.User
import com.android.qhackfst.data.UserRepository
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.UploadTask
import com.google.firebase.storage.ktx.storage
import com.google.firebase.storage.ktx.storageMetadata

import org.koin.java.KoinJavaComponent.inject
import java.io.File
import java.math.BigInteger
import java.util.*
import kotlin.random.Random

val diseases = arrayListOf("Covid-19", "SARS", "ARDS", "Streptococcus", "Pneumonia")

class DashboardViewModel(application: Application) : AndroidViewModel(application) {


    val uploadStatus: MutableLiveData<UploadState> = MutableLiveData()
    private val storageRef = Firebase.storage.reference
    private val userDataBase by inject(UserRepository::class.java)
    var uploadTask: UploadTask? = null
    val userData: MutableLiveData<User> = MutableLiveData()


    val allResultsLiveData = MutableLiveData<MutableList<MedicalRecord>>()
    val currentRecord = MutableLiveData<MedicalRecord>()

    val recentRecordLiveData = Transformations.map(allResultsLiveData) { mutableList ->
        mutableList.sortedByDescending { it.time }.take(4)
    }
    val indianNames =
        arrayListOf("Rohan", "Shubham", "Shruti", "Deepak", "Aksash", "Nitin", "Preet", "Gautam")
    val partOfBodies = arrayListOf("Head", "Stomach", "Lung", "Left Hand", "Right Hand")
    val links = arrayListOf(
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Skull_X-ray_-_lateral_view.jpg/712px-Skull_X-ray_-_lateral_view.jpg",
        "https://www.popsci.com/resizer/ksKKzcVtF6p9Bvqm4tbKO4J0rEI=/719x490/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/ZGTZC255L2RSTTKEAJLWHZRIFE.png",
        "https://www.sciencesource.com/Doc/TR1_WATERMARKED/c/2/8/5/SS2301022.jpg?d63641849923"
    )

    fun loadData() {
        val mutableList = arrayListOf<MedicalRecord>()
        (0..20).map {
            val rn = Random.nextInt(232323)
            val name = indianNames[rn % indianNames.size]
            val part = partOfBodies[rn % partOfBodies.size]
            val path = links[rn % links.size]
            val title = "$name's $part X-Ray Scan"
            val time = Date().time - Random.nextLong(1000L * 60 * 60 * 24 * 170)
            val map = hashMapOf<String, String>()
            diseases.forEach {
                if (Random.nextBoolean()) {
                    map[it] = "true"
                }
            }
            MedicalRecord(System.currentTimeMillis(), title, time, path, "Quite accurate", map)
        }.forEach {
            mutableList.add(it)
        }

        val title = "Meghdut Chest X-Ray A03D4"
        val time = Date().time - Random.nextLong(1000L * 60 * 60 * 24 * 170)
        val path = "https://litfl.com/wp-content/uploads/2019/05/Chest-XR-LLL-pneumonia-768x782.jpg"
        MedicalRecord(
            System.currentTimeMillis(), title, time, path, "Accurate diagnosis",
            hashMapOf("Pneumonia" to "true")
        ).also {
            mutableList.add(it)
        }

        allResultsLiveData.postValue(mutableList)
    }

    fun addRecord(medicalRecord: MedicalRecord) {
        val mutableList = this.allResultsLiveData.value ?: arrayListOf()
        mutableList.add(medicalRecord)
        this.allResultsLiveData.postValue(mutableList)
    }

    init {
        userDataBase.getUser {
            userData.postValue(it)
            loadData()
        }
    }


    var chossenName = ""
    fun chooseFile(name: String) {
        chossenName = name
        uploadStatus.postValue(UploadState.ChooseFile(name))
    }


    fun upload(
        file: File
    ) {
        val fileChosen = UploadState.FileChosen(file, chossenName)
        uploadStatus.postValue(fileChosen)
        userDataBase.getUserID { id ->
            try {
                transferFile(id, file, fileChosen)
//                dummyUpload(fileChosen)
            } catch (e: Exception) {
                uploadStatus.postValue(UploadState.UploadingError(fileChosen, e))
            }
        }
    }

    private fun dummyUpload(fileChosen: UploadState.FileChosen) {
        Thread {
            for (i in 1..100) {
                Thread.sleep(100)
                uploadStatus.postValue(UploadState.Uploading(fileChosen, i))
            }
            uploadStatus.postValue(UploadState.UploadComplete)
            val mutableList = allResultsLiveData.value ?: return@Thread

            val time = System.currentTimeMillis()
            mutableList.add(
                0,
                MedicalRecord(time, fileChosen.name, time, fileChosen.path.absolutePath)
            )
            allResultsLiveData.postValue(mutableList)
        }.start()
    }

    private fun transferFile(
        id: String,
        file: File,
        fileChosen: UploadState.FileChosen
    ) {

        val name =
            BigInteger(fileChosen.path.absolutePath.toByteArray()).toString(Character.MAX_RADIX)
        val riversRef = storageRef.child("images/$id/${name}")
        val metadata = storageMetadata {
            contentType = "image/jpg"
            this.setCustomMetadata("time", System.currentTimeMillis().toString())
        }
        uploadTask = riversRef.putFile(Uri.fromFile(file), metadata)
        uploadTask!!.addOnProgressListener { taskSnapshot ->
            val progress =
                ((100 * taskSnapshot.bytesTransferred) / taskSnapshot.totalByteCount).toInt()
            uploadStatus.postValue(UploadState.Uploading(fileChosen, progress))
        }.addOnFailureListener {
            uploadStatus.postValue(UploadState.UploadingError(fileChosen, it))
        }.addOnSuccessListener {
            it.metadata?.reference?.downloadUrl?.addOnCompleteListener {result->
                fileChosen.name
                val medicalRecord = MedicalRecord(
                    System.currentTimeMillis(),
                    fileChosen.name,
                    System.currentTimeMillis(),
                    result.result.toString(),
                    diseaseStatus = hashMapOf("Covid-19" to "true")
                )
                addRecord(medicalRecord)
                uploadStatus.postValue(UploadState.UploadComplete)
            }

        }
    }

    fun pause() = uploadTask?.pause()
    fun cancel(): Boolean? {
        uploadStatus.postValue(UploadState.UploadCancelled)
        return uploadTask?.cancel()
    }


}