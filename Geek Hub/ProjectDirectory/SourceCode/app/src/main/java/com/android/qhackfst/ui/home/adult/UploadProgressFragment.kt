package com.android.qhackfst.ui.home.adult

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.android.qhackfst.R
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import kotlinx.android.synthetic.main.fragment_upload_progres.*


class UploadProgressFragment : BottomSheetDialogFragment() {

    private val dashboardViewModel by lazy {
        ViewModelProvider(requireActivity()).get(DashboardViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_upload_progres, container, false)
    }

    override fun onResume() {
        super.onResume()
        dashboardViewModel.uploadStatus.observe(viewLifecycleOwner, {
            when (it) {
                is UploadState.Uploading -> {
                    progressBar.isIndeterminate = !(it.progress in 1..100)
                    progressBar.progress = it.progress
                    progress_text.text = "${it.progress} % done"
                }
                is UploadState.UploadComplete -> {
                    this.dismiss()
                }
                is UploadState.UploadCancelled -> {
                    this.dismiss()
                }
            }
        })
    }


}