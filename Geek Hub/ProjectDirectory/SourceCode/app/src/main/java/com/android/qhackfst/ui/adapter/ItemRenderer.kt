package com.android.qhackfst.ui.adapter

import android.view.View

interface ItemRenderer<T> {
    fun renderItem(layout: View?, item: T, position: Int)
}