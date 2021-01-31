package com.android.qhackfst.ui.home.adult

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.FragmentNavigatorExtras
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.qhackfst.R
import com.android.qhackfst.data.MedicalRecord
import com.android.qhackfst.ui.adapter.MedicalRecordAdapter
import com.android.qhackfst.ui.adapter.MedicalRecordHolder
import com.android.qhackfst.util.navController
import kotlinx.android.synthetic.main.fragment_results.*
import kotlinx.android.synthetic.main.item_record.view.*


class ResultsFragment : Fragment() {
    private val dashboardViewModel by lazy {
        ViewModelProvider(requireActivity()).get(DashboardViewModel::class.java)
    }
    private val recordAdapter by lazy { MedicalRecordAdapter() }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_results, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        records.layoutManager = LinearLayoutManager(requireContext())
        records.adapter = recordAdapter
        dashboardViewModel.allResultsLiveData.observe(viewLifecycleOwner, {
            if (it != null) {
                val list = it.sortedByDescending { it.time }
                recordAdapter.submitList(list)
                recordAdapter.onClickListener =
                    { medicalRecord: MedicalRecord, holder: MedicalRecordHolder ->
                        dashboardViewModel.currentRecord.postValue(medicalRecord)
                        holder.itemView.record_name.transitionName = "titleLabel"
                        val extras = FragmentNavigatorExtras(
                            holder.itemView.record_name to "titleLabel"
                        )
                        navController.navigate(
                            R.id.action_resultsFragment_to_resultPreviewFragment,
                            null,
                            null,
                            extras
                        )
                    }
            }
        })

    }


}