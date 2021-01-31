package com.android.qhackfst.ui.home.child

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.android.qhackfst.R
import com.android.qhackfst.util.navController
import kotlinx.android.synthetic.main.fragment_child.*

class ChildFragment : Fragment() {

    private val dashboardViewModel: ChildViewModel by lazy {
        ViewModelProvider(requireActivity()).get(
            ChildViewModel::class.java
        )
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_child, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        docto_chat.setOnClickListener {
            navController.navigate(R.id.action_navigation_child_to_doctoChat)
        }
        heart_mon.setOnClickListener {
            navController.navigate(R.id.action_navigation_child_to_cameraFragment)
        }
    }
}