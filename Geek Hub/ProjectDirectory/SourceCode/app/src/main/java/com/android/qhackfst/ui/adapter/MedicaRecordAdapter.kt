package com.android.qhackfst.ui.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.android.qhackfst.R
import com.android.qhackfst.data.MedicalRecord
import com.android.qhackfst.ui.PhotoFullPopupWindow
import kotlinx.android.synthetic.main.item_record.view.*
import java.text.SimpleDateFormat
import java.util.*

class MedicalRecordAdapter : ListAdapter<MedicalRecord, MedicalRecordHolder>(
    callback
) {

    var onClickListener: (MedicalRecord, MedicalRecordHolder) -> Unit = { medicalRecord: MedicalRecord, medicalRecordHolder: MedicalRecordHolder ->

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MedicalRecordHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_record, parent, false)
        return MedicalRecordHolder(view)
    }

    override fun onBindViewHolder(holder: MedicalRecordHolder, position: Int) {
        val item = getItem(position)
        holder.bindData(item, onClickListener)
    }

}

private val callback = object : DiffUtil.ItemCallback<MedicalRecord>() {
    override fun areItemsTheSame(oldItem: MedicalRecord, newItem: MedicalRecord): Boolean =
        oldItem == newItem

    override fun areContentsTheSame(oldItem: MedicalRecord, newItem: MedicalRecord): Boolean =
        oldItem == newItem
}

class MedicalRecordHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    fun bindData(
        item: MedicalRecord,
        onClickListener: (MedicalRecord, MedicalRecordHolder) -> Unit
    ) {
        itemView.setOnClickListener {
            onClickListener(item,this)
        }
        itemView.record_name.text = item.name
        itemView.record_name.setOnClickListener {
            onClickListener(item,this)
        }
        var report = item.diseaseStatus.filter { it.value == "true" }.keys.joinToString(", ")
        if (report.isBlank()){
            report="Processing"
        }
        itemView.report_field.text = report
        val format = SimpleDateFormat("d,MMMM")
        itemView.time_field.text = format.format(Date(item.time))
        itemView.preview_image.setOnClickListener {
            PhotoFullPopupWindow(itemView.context, R.layout.popup_photo_full,  itemView.preview_image, item.storagePath, null)
        }

    }

}
