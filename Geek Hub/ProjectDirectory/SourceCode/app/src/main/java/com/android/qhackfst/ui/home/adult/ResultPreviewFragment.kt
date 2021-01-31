package com.android.qhackfst.ui.home.adult

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.transition.TransitionInflater
import com.android.qhackfst.R
import com.android.qhackfst.data.MedicalRecord
import com.android.qhackfst.ui.PhotoFullPopupWindow
import com.android.qhackfst.util.navController
import com.bumptech.glide.Glide
import kotlinx.android.synthetic.main.fragment_result_preview.*
import java.text.SimpleDateFormat
import java.util.*


class ResultPreviewFragment : Fragment() {
    private val dashboardViewModel by lazy {
        ViewModelProvider(requireActivity()).get(DashboardViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_result_preview, container, false)
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        sharedElementEnterTransition = TransitionInflater.from(context).inflateTransition(android.R.transition.move)
    }

    fun display(item: MedicalRecord) {
        title.text = item.name
        var report = item.diseaseStatus.filter { it.value == "true" }.keys.joinToString(", ")
        if (report.isBlank()) {
            report = "Processing"
        }
        identified_field.text = report
        rating_accuracy.rating = item.accuracy
        feedback_field.setText(item.feedback)
        val format = SimpleDateFormat("d,MMMM YYYY")
        date_field.text = format.format(Date(item.time))
        Glide.with(requireView())
            .load(item.storagePath)
            .fitCenter()
            .into(specimein_preview)
        specimein_preview.setOnClickListener {
            PhotoFullPopupWindow(requireContext(), R.layout.popup_photo_full, view, item.storagePath, null)
        }


    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        dashboardViewModel.currentRecord.observe(viewLifecycleOwner, Observer {
            if (it != null) {
                display(it)
            }
        })
        save_button.setOnClickListener {
            navController.navigateUp()
        }
        delete_button.setOnClickListener {

        }
    }

}