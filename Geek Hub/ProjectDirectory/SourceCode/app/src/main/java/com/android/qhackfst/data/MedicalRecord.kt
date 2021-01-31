package com.android.qhackfst.data

data class MedicalRecord(
    val id: Long,
    val name: String,
    val time: Long,
    val storagePath: String,
    val feedback: String = "",
    val diseaseStatus: HashMap<String, String> = hashMapOf(),
    val accuracy: Float = 3.0f
)