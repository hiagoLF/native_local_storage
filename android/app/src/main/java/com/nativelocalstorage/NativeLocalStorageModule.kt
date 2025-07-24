package com.nativelocalstorage

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import androidx.core.content.edit
import com.facebook.react.bridge.Arguments

class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {
  override fun getName() = NAME

  override fun setItem(value: String?, key: String?) {
    var shouldEmit = false
    if (getItem(key) == null) {
      shouldEmit = true
    }
    val sharedPref = reactApplicationContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    sharedPref.edit {
      putString(key, value)
    }

    if (shouldEmit) {
      val eventData = Arguments.createMap().apply {
        putString("key", key)
        putString("value", value)
      }

      emitOnKeyAdded(eventData)
    }
  }

  override fun getItem(key: String?): String? {
    val sharedPref = reactApplicationContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val itemResult = sharedPref.getString(key, null) ?: return null

    return itemResult
  }

  override fun removeItem(key: String?) {
    val sharedPref = reactApplicationContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    sharedPref.edit {
      remove(key)
    }
  }

  override fun clear() {
    val sharedPref = reactApplicationContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    sharedPref.edit {
      clear()
    }
  }

  companion object {
    const val NAME = "NativeLocalStorage"
  }
}