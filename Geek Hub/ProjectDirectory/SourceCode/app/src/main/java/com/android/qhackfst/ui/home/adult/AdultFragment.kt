package com.android.qhackfst.ui.home.adult

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.FragmentNavigatorExtras
import androidx.recyclerview.widget.LinearLayoutManager
import com.afollestad.materialdialogs.MaterialDialog
import com.afollestad.materialdialogs.input.input
import com.android.qhackfst.R
import com.android.qhackfst.data.MedicalRecord
import com.android.qhackfst.ui.adapter.MedicalRecordAdapter
import com.android.qhackfst.ui.adapter.MedicalRecordHolder
import com.android.qhackfst.util.navController
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.fragment_adult.*
import kotlinx.android.synthetic.main.item_record.view.*

class AdultFragment : Fragment() {

    private val dashboardViewModel by lazy {
        ViewModelProvider(requireActivity()).get(DashboardViewModel::class.java)
    }

    private val recentRecordAdapter by lazy { MedicalRecordAdapter() }


    private fun showUploadFragment() {
        val progressFragment = UploadProgressFragment()
        progressFragment.showNow(childFragmentManager, "")
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ) = inflater.inflate(R.layout.fragment_adult, container, false)


    private fun askForName(afterInput: (String) -> Unit) {
        MaterialDialog(requireContext()).show {
            title(text = "Name of the Specimen")
            input(prefill = "Untitled Specimen ") { dialog: MaterialDialog, text: CharSequence ->
                afterInput(text.toString())
            }
            positiveButton(text = "Done")
        }
    }


    private var isShown = false

    override fun onResume() {
        super.onResume()
        dashboardViewModel
        upload_x_ray.setOnClickListener {
            askForName {
                dashboardViewModel.chooseFile(it)
            }
        }

        dashboardViewModel.userData.observe(viewLifecycleOwner, {
            name_field.text == "Dr. " + it.name
        })
        recent_records.layoutManager = LinearLayoutManager(requireContext())
        recent_records.adapter = recentRecordAdapter
        dashboardViewModel.recentRecordLiveData.observe(viewLifecycleOwner, {
            if (it != null) {
                recentRecordAdapter.submitList(it)
                recentRecordAdapter.onClickListener =
                    { medicalRecord: MedicalRecord, holder: MedicalRecordHolder ->
                        dashboardViewModel.currentRecord.postValue(medicalRecord)
                        holder.itemView.record_name.transitionName = "titleLabel"
                        val extras = FragmentNavigatorExtras(
                            holder.itemView.record_name to "titleLabel"
                        )
                        navController.navigate(
                            R.id.action_navigation_adult_to_resultPreviewFragment,
                            null,
                            null,
                            extras
                        )
                    }
                recent_records.smoothScrollToPosition(0)
            }
        })
        all_results_textview.setOnClickListener {
            navController.navigate(R.id.action_navigation_adult_to_resultsFragment)
        }
        dashboardViewModel.uploadStatus.observe(viewLifecycleOwner, Observer {
            println("com.meghdut.covid.ui.dashboard>>DashBoardFragment>onViewCreated Current State $it")
            when (it) {
                is UploadState.Uploading -> {
                    if (!isShown) {
                        showUploadFragment()
                        isShown = true
                    }
                }
                is UploadState.UploadingError -> {
                    isShown = false
                    Snackbar.make(
                        imageView5,
                        "Sorry the upload failed please try again",
                        Snackbar.LENGTH_LONG
                    ).show()
                    it.exception.printStackTrace()
                    dashboardViewModel.uploadStatus.postValue(UploadState.FileNotChosen)
                }
                is UploadState.UploadComplete -> {
                    isShown = false
                    Snackbar.make(imageView5, "The upload was successful", Snackbar.LENGTH_LONG)
                        .show()
                    dashboardViewModel.uploadStatus.postValue(UploadState.FileNotChosen)
                }
            }
        })
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

    }

}