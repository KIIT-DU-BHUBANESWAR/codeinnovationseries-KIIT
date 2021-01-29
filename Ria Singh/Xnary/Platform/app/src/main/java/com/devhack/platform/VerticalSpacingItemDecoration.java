package com.devhack.platform;

import android.graphics.Rect;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class VerticalSpacingItemDecoration extends RecyclerView.ItemDecoration {
    private final int verticalSpacing;
    @Override
    public void getItemOffsets(@NonNull Rect outRect, @NonNull View view, @NonNull RecyclerView parent, @NonNull RecyclerView.State state) {
        outRect.bottom=verticalSpacing;
    }

    public VerticalSpacingItemDecoration(int verticalSpacing) {
        this.verticalSpacing = verticalSpacing;

    }
}
