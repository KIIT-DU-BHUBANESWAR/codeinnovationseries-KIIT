package com.android.qhackfst.ui.signup

import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.EditText
import android.widget.Spinner
import ernestoyaquello.com.verticalstepperform.Step


class UserType(title: String?) : Step<String>(title) {
    override fun restoreStepData(data: String?) {
        TODO("Not yet implemented")
    }

    override fun isStepDataValid(stepData: String?): IsDataValid = IsDataValid(true)

    override fun onStepMarkedAsCompleted(animated: Boolean) = Unit

    override fun getStepDataAsHumanReadableString(): String = "User Type"

    override fun createStepContentLayout(): View {
        TODO("Not yet implemented")
    }

    override fun getStepData(): String {
        TODO("Not yet implemented")
    }

    override fun onStepOpened(animated: Boolean) = Unit

    override fun onStepMarkedAsUncompleted(animated: Boolean) = Unit

    override fun onStepClosed(animated: Boolean) = Unit

}


class GenderStep(title: String?) : Step<String>(title) {

    companion object {
        const val MALE = "male"
        const val FEMAlE = "female"
        const val OTHER = "other"
        val GENDER_ARRAY = arrayOf(MALE, FEMAlE, OTHER)
    }

    private val spinner: Spinner by lazy {
        Spinner(context).apply {
            adapter = arrayAdapter
            onItemSelectedListener=object : AdapterView.OnItemSelectedListener {
                override fun onNothingSelected(parent: AdapterView<*>?) {
                    markAsUncompleted("Gender is mandatory",true)
                }
                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
                ) {
                    markAsCompleted(true)
                }
            }
        }
    }
    private val arrayAdapter by lazy {
        ArrayAdapter(
            context,
            android.R.layout.simple_spinner_dropdown_item,
            GENDER_ARRAY
        )

    }


    override fun restoreStepData(data: String) {
        val indexOf = GENDER_ARRAY.indexOf(data)
        if (indexOf > 0)
            spinner.setSelection(indexOf)
    }

    override fun isStepDataValid(stepData: String?) = IsDataValid(true)

    override fun onStepMarkedAsCompleted(animated: Boolean) {

    }

    override fun getStepDataAsHumanReadableString(): String {
        return stepData
    }

    override fun createStepContentLayout() = spinner

    override fun getStepData(): String = spinner.selectedItem.toString()

    override fun onStepOpened(animated: Boolean) {
    }

    override fun onStepMarkedAsUncompleted(animated: Boolean) {
    }

    override fun onStepClosed(animated: Boolean) {
    }
}

class AgeStep(title: String?) : Step<Int>(title) {
    override fun restoreStepData(data: Int?) {
        edit.setText((data ?: 1).toString())
    }

    override fun isStepDataValid(stepData: Int?): IsDataValid = if (stepData in 1..100) {
        IsDataValid(true)
    } else IsDataValid(false, "Invalid age")

    override fun onStepMarkedAsCompleted(animated: Boolean) = Unit

    override fun getStepDataAsHumanReadableString(): String = stepData.toString()
    private val edit: EditText by lazy { EditText(context) }


    override fun createStepContentLayout(): View {
        edit.setHorizontallyScrolling(true);
        edit.inputType = InputType.TYPE_CLASS_NUMBER
        edit.afterTextChanged {
            markAsCompletedOrUncompleted(true)
        }
        return edit
    }

    override fun getStepData(): Int {

        val text = edit.text.toString()
        return  if(text.isBlank())0 else text.toInt()
    }

    override fun onStepOpened(animated: Boolean) = Unit

    override fun onStepMarkedAsUncompleted(animated: Boolean) = Unit

    override fun onStepClosed(animated: Boolean) = Unit
}

class NameStep(title: String) : Step<String>(title) {
    override fun onStepMarkedAsCompleted(animated: Boolean) = Unit

    private val edit by lazy { EditText(context) }

    override fun getStepDataAsHumanReadableString(): String = stepData
    override fun createStepContentLayout(): View {
        edit.setHorizontallyScrolling(true)
        edit.inputType = InputType.TYPE_CLASS_TEXT
        edit.afterTextChanged {
           markAsCompletedOrUncompleted(true)
        }
        return edit
    }


    override fun onStepOpened(animated: Boolean) = Unit

    override fun onStepMarkedAsUncompleted(animated: Boolean) = Unit

    override fun onStepClosed(animated: Boolean) = Unit

    override fun restoreStepData(data: String?) {
        edit.setText(data)
    }

    override fun isStepDataValid(stepData: String?) =
        if (stepData.isNullOrBlank()) IsDataValid(false, "Invalid Name") else IsDataValid(true)

    override fun getStepData(): String = edit.text.toString()

}

/**
 * Extension function to simplify setting an afterTextChanged action to EditText components.
 */
fun EditText.afterTextChanged(afterTextChanged: (String) -> Unit) {
    this.addTextChangedListener(object : TextWatcher {
        override fun afterTextChanged(editable: Editable?) {
            afterTextChanged.invoke(editable.toString())
        }

        override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}

        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
    })
}