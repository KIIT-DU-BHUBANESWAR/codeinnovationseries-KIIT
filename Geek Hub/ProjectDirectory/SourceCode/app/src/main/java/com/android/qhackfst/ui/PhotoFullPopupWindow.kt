package com.android.qhackfst.ui

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.drawable.BitmapDrawable
import android.os.Build
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.PopupWindow
import android.widget.ProgressBar
import com.android.qhackfst.R
import com.android.qhackfst.util.fastBlur
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.jsibbold.zoomage.ZoomageView
import kotlinx.android.synthetic.main.popup_photo_full.view.*

class PhotoFullPopupWindow(
    ctx: Context,
    layout: Int,
    v: View?,
    imageUrl: String?,
    bitmap: Bitmap?
) : PopupWindow(
    (ctx.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater).inflate(
        R.layout.popup_photo_full,
        null
    ), ViewGroup.LayoutParams.MATCH_PARENT,
    ViewGroup.LayoutParams.MATCH_PARENT
) {
    val mContext: Context = ctx
    val photoView: ZoomageView by lazy { contentView.image }
    val loading: ProgressBar by lazy { contentView.loading }
    val parent: ViewGroup by lazy { photoView.parent as ViewGroup }


    private val requestListener = object : RequestListener<Bitmap?> {
        override fun onLoadFailed(
            e: GlideException?,
            model: Any,
            target: Target<Bitmap?>,
            isFirstResource: Boolean
        ): Boolean {
            loading.isIndeterminate = false
            loading.setBackgroundColor(Color.LTGRAY)
            return false
        }

        override fun onResourceReady(
            resource: Bitmap?,
            model: Any,
            target: Target<Bitmap?>,
            dataSource: DataSource,
            isFirstResource: Boolean
        ): Boolean {
            parent.background = BitmapDrawable(
                mContext.resources,
                Bitmap.createScaledBitmap(
                    resource!!,
                    50,
                    50,
                    true
                ).fastBlur()
            )
            photoView.setImageBitmap(resource)
            loading.visibility = View.GONE
            return false
        }
    }

    init {
        if (Build.VERSION.SDK_INT >= 21) {
            elevation = 5.0f
        }

        isOutsideTouchable = true
        isFocusable = true

        val closeButton = contentView.findViewById<ImageButton>(R.id.ib_close)
        closeButton.setOnClickListener { // Dismiss the popup window
            dismiss()
        }

        if (bitmap != null) {
            loadBitmap(bitmap)
        } else {
            loadNetworkImage(ctx, imageUrl, v)
        }
    }

    private fun loadNetworkImage(
        ctx: Context,
        imageUrl: String?,
        v: View?
    ) {
        loading.isIndeterminate = true
        loading.visibility = View.VISIBLE
        Glide.with(ctx).asBitmap()
            .load(imageUrl)
            .error(R.drawable.x_ray)
            .listener(requestListener)
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .into(photoView)
        showAtLocation(v, Gravity.CENTER, 0, 0)
    }

    private fun loadBitmap(bitmap: Bitmap) {
        loading.visibility = View.GONE
        parent.background = BitmapDrawable(
            mContext.resources,
            Bitmap.createScaledBitmap(
                bitmap,
                50,
                50,
                true
            ).fastBlur()
        )
        photoView.setImageBitmap(bitmap)
    }

}
