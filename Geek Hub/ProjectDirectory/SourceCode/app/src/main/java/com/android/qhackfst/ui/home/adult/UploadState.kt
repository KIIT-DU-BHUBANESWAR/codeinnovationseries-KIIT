package com.android.qhackfst.ui.home.adult

import java.io.File
import java.lang.Exception

sealed  class UploadState {
    object FileNotChosen : UploadState()
    data class ChooseFile(val name:String) : UploadState()
    data class FileChosen(val path: File,val name:String) : UploadState()
    data class Uploading(val fileChosen: FileChosen, val progress: Int) : UploadState()
    data class UploadingError(val fileChosen: FileChosen, val exception: Exception) : UploadState()
    object UploadCancelled : UploadState()
    object UploadComplete : UploadState()

    override fun toString(): String {
        return this::class.simpleName?:""
    }


}