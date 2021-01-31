package com.android.qhackfst.ui.signup

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import com.android.qhackfst.R
import com.android.qhackfst.ui.MainActivity
import ernestoyaquello.com.verticalstepperform.listener.StepperFormListener
import kotlinx.android.synthetic.main.fragment_registration.*
import org.koin.androidx.viewmodel.ext.android.viewModel


class RegistrationFragment : Fragment(), StepperFormListener {

    private val registrationViewModel: RegistrationViewModel by viewModel()

    private val ageStep = AgeStep("Current Age")
    private val genderStep = GenderStep("Your Gender")
    private val nameStep = NameStep("Name of the User")

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? =
        inflater.inflate(R.layout.fragment_registration, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        registrationViewModel.load()
        stepper_form.setup(this, nameStep, genderStep, ageStep)
            .allowNonLinearNavigation(true)
            .lastStepCancelButtonText("Finish Registration")
            .init()
        registrationViewModel.userLiveData.observe(viewLifecycleOwner, Observer {
            if (it != null) {
                nameStep.restoreStepData(it.name)
            }
        })
        registrationViewModel.formState.observe(viewLifecycleOwner, Observer {
            when (it) {
                RegistrationState.Unfinished -> {

                }
                RegistrationState.Finished -> {
                    val intent = Intent(activity, MainActivity::class.java)
                    startActivity(intent)
                    activity?.finish()
                }
            }
        })
    }

    override fun onCompletedForm() {
        val age = ageStep.stepData
        val gender = genderStep.stepData
        val name = nameStep.stepData
        registrationViewModel.register(name, age, gender)
    }

    override fun onCancelledForm() {

    }
}