package com.example.kiit.health.persistence;

import android.content.Context;
import android.content.Intent;
import android.util.Log;


import com.example.kiit.health.models.WalkingMode;

import java.util.List;

public class WalkingModePersistenceHelper {

    /**
     * Broadcast action identifier for messages broadcast when walking mode changed
     */
    public static final String BROADCAST_ACTION_WALKING_MODE_CHANGED = "com.example.kiit.health.WALKING_MODE_CHANGED";
    public static final String BROADCAST_EXTRA_OLD_WALKING_MODE = "com.example.kiit.health.EXTRA_OLD_WALKING_MODE";
    public static final String BROADCAST_EXTRA_NEW_WALKING_MODE = "com.example.kiit.health.EXTRA_NEW_WALKING_MODE";
    public static final String LOG_CLASS = WalkingModePersistenceHelper.class.getName();

    /**
     * @deprecated Use {@link WalkingModeDbHelper#getAllWalkingModes()} instead.
     *
     * Gets all not deleted walking modes from database
     *
     * @param context The application context
     * @return a list of walking modes
     */
    public static List<WalkingMode> getAllItems(Context context) {
        return new WalkingModeDbHelper(context).getAllWalkingModes();
    }

    /**
     * @deprecated Use {@link WalkingModeDbHelper#getWalkingMode(int)} instead.
     *
     * Gets the specific walking mode
     *
     * @param id      the id of the walking mode
     * @param context The application context
     * @return the requested walking mode or null
     */
    public static WalkingMode getItem(long id, Context context) {
        return new WalkingModeDbHelper(context).getWalkingMode((int) id);
    }

    /**
     * Stores the given walking mode to database.
     * If id is set, the walking mode will be updated else it will be created
     *
     * @param item    the walking mode to store
     * @param context The application context
     * @return the saved walking mode (with correct id)
     */
    public static WalkingMode save(WalkingMode item, Context context) {
        if (item == null) {
            return null;
        }
        if (item.getId() <= 0) {
            long insertedId = insert(item, context);
            if (insertedId == -1) {
                return null;
            } else {
                item.setId(insertedId);
                return item;
            }
        } else {
            int affectedRows = update(item, context);
            if (affectedRows == 0) {
                return null;
            } else {
                return item;
            }
        }
    }

    /**
     * @deprecated Use {@link WalkingModeDbHelper#deleteWalkingMode(WalkingMode)} instead.
     *
     * Deletes the given walking mode from database
     *
     * @param item    the item to delete
     * @param context The application context
     * @return true if deletion was successful else false
     */
    public static boolean delete(WalkingMode item, Context context) {
        new WalkingModeDbHelper(context).deleteWalkingMode(item);
        return true;
    }

    /**
     * Soft deletes the item.
     * The item will be present via @{see #getItem()} but not in @{see #getAllItems()}.
     *
     * @param item    The item to soft delete
     * @param context The application context
     * @return true if soft deletion was successful else false
     */
    public static boolean softDelete(WalkingMode item, Context context) {
        if (item == null || item.getId() <= 0) {
            return false;
        }
        item.setIsDeleted(true);
        return save(item, context).isDeleted();
    }

    /**
     * Sets the given walking mode to the active one
     *
     * @param mode    the walking mode to activate
     * @param context The application context
     * @return true if active mode changed to given one
     */
    public static boolean setActiveMode(WalkingMode mode, Context context) {
        Log.i(LOG_CLASS, "Changing active mode to " + mode.getName());
        if (mode.isActive()) {
            // Already active
            Log.i(LOG_CLASS, "Skipping active mode change");
            return true;
        }
        WalkingMode currentActiveMode = getActiveMode(context);

        if (currentActiveMode != null) {
            currentActiveMode.setIsActive(false);
            save(currentActiveMode, context);
        }
        mode.setIsActive(true);
        boolean success = save(mode, context).isActive();
        // broadcast the event
        Intent localIntent = new Intent(BROADCAST_ACTION_WALKING_MODE_CHANGED);
        localIntent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
        if (currentActiveMode != null) {
            localIntent.putExtra(BROADCAST_EXTRA_OLD_WALKING_MODE, currentActiveMode.getId());
        }
        localIntent.putExtra(BROADCAST_EXTRA_NEW_WALKING_MODE, mode.getId());
        // Broadcasts the Intent to receivers in this app.
        context.sendBroadcast(localIntent);
        return success;
    }

    /**
     * @deprecated Use {@link WalkingModeDbHelper#getActiveWalkingMode} instead.
     *
     * Gets the currently active walking mode
     *
     * @param context The application context
     * @return The walking mode with active-flag set
     */
    public static WalkingMode getActiveMode(Context context) {
        return new WalkingModeDbHelper(context).getActiveWalkingMode();
    }

    /**
     * @deprecated Use {@link WalkingModeDbHelper#addWalkingMode(WalkingMode)} instead.
     *
     * Inserts the given walking mode as new entry.
     *
     * @param item    The walking mode which should be stored
     * @param context The application context
     * @return the inserted id
     */
    protected static long insert(WalkingMode item, Context context) {
        return new WalkingModeDbHelper(context).addWalkingMode(item);
    }

    /**
     * @deprecated Use {@link WalkingModeDbHelper#updateWalkingMode(WalkingMode)} instead.
     *
     * Updates the given walking mode in database
     *
     * @param item    The walking mode to update
     * @param context The application context
     * @return the number of rows affected
     */
    protected static int update(WalkingMode item, Context context) {
        return new WalkingModeDbHelper(context).updateWalkingMode(item);
    }
}
