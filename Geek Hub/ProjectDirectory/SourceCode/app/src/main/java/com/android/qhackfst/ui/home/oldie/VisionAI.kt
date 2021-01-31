package com.android.qhackfst.ui.home.oldie

import android.Manifest
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.FileProvider
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.android.qhackfst.R
import com.bumptech.glide.Glide
import com.livinglifetechway.quickpermissions_kotlin.runWithPermissions
import kotlinx.android.synthetic.main.fragment_vision_a_i.*
import java.io.File


class VisionAI : Fragment() {
    private val oldieViewModel by lazy {
        ViewModelProvider(requireActivity()).get(
            OldieViewModel::class.java
        )
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_vision_a_i, container, false)
    }

    lateinit var imageUri: Uri
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        oldieViewModel.visionAIMessage.observe(viewLifecycleOwner, {
            result_field.text = it
        })
        image_preview.setOnClickListener {
            runWithPermissions(Manifest.permission.CAMERA) {
                val imagePath = File(requireContext().filesDir, "external_files")
                imagePath.mkdirs()
                val newFile = File(imagePath, "test${System.currentTimeMillis()}.jpg")
                newFile.delete()
                imageUri = FileProvider.getUriForFile(
                    requireContext(),
                    "com.android.qhackfst.fileprovider",
                    newFile
                )
                getcontent.launch(imageUri)
            }
        }
    }

    private val getcontent = registerForActivityResult(ActivityResultContracts.TakePicture()) {
        if (it) {
            process()
        }
    }

    private fun process() {
        println("com.android.qhackfst.ui.home.oldie>>VisionAI>process  $imageUri")
        Glide.with(requireContext()).load(imageUri).into(image_preview)
        oldieViewModel.visionAI(imageUri)
    }


}