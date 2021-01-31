package com.android.qhackfst.ui.home.child

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.qhackfst.R
import com.android.qhackfst.data.Question
import com.android.qhackfst.ui.adapter.GenericAdapter
import com.android.qhackfst.ui.adapter.ItemRenderer
import com.android.qhackfst.util.navController
import kotlinx.android.synthetic.main.fragment_docto_chat.*
import kotlinx.android.synthetic.main.option_layout.*

import kotlin.concurrent.thread

class DoctoChat : Fragment(), ItemRenderer<String> {

    val adpater by lazy { GenericAdapter(R.layout.option_layout, this) }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        options.layoutManager = LinearLayoutManager(requireContext())
        options.adapter = adpater
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_docto_chat, container, false)
    }

    var currentIndex = -1
    fun TextView.setTextAnimation(
        text: String,
        duration: Long = 300,
        completion: (() -> Unit)? = null
    ) {
        fadOutAnimation(duration) {
            this.text = text
            fadInAnimation(duration) {
                completion?.let {
                    it()
                }
            }
        }
    }


    fun View.fadOutAnimation(
        duration: Long = 300,
        visibility: Int = View.INVISIBLE,
        completion: (() -> Unit)? = null
    ) {
        animate()
            .alpha(0f)
            .setDuration(duration)
            .withEndAction {
                this.visibility = visibility
                completion?.let {
                    it()
                }
            }
    }

    fun View.fadInAnimation(duration: Long = 300, completion: (() -> Unit)? = null) {
        alpha = 0f
        visibility = View.VISIBLE
        animate()
            .alpha(1f)
            .setDuration(duration)
            .withEndAction {
                completion?.let {
                    it()
                }
            }
    }

    private val questions = listOf(
        Question("We will now guide you through some questions", listOf("Start")),

        Question(
            "Do you have any pain?",
            listOf("In Muscles", "Forehead", "Stomach", "Arms and Legs")
        ),
        Question("How's your throat?", listOf("Sore throat", "Dry throat", "Swollen throat")),
        Question(
            "Any problem with skin?",
            listOf("Itchy red spots", "Rashes", "Dry scaly skin", "Blisters")
        ),
        Question("Experiencing any pain in joints?", listOf("Yes", "No", "Occasionally")),
        Question(
            "Condtion of your nose ?",
            listOf("Running nose", "Blocked nose", "Swollen red nose")
        ),
    )


    override fun onResume() {
        super.onResume()
        currentIndex = -1
        nextQuestion()
    }

    private fun nextQuestion() {
        currentIndex++
        if (currentIndex == questions.size) {
            currentIndex = -1
            navController.navigate(R.id.action_doctoChat_to_checkupCompleteFragment)
        } else {
            val curr = questions[currentIndex]
            question_lable.setTextAnimation(curr.title, 500) {
                adpater.submitList(curr.options)
            }
        }
    }

    override fun renderItem(layout: View?, item: String, position: Int) {
        layout?.setOnClickListener {
            nextQuestion()
        }
        val lable = layout?.findViewById<TextView>(R.id.labeled_option)
        lable?.text = item
    }


}