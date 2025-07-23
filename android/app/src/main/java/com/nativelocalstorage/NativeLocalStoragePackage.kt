package com.nativelocalstorage

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeLocalStoragePackage: BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == NativeLocalStorageModule.NAME) {
      NativeLocalStorageModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      mapOf(
        NativeLocalStorageModule.NAME to ReactModuleInfo(
          name = NativeLocalStorageModule.NAME,
          className = NativeLocalStorageModule.NAME,
          canOverrideExistingModule = false,
          needsEagerInit = false,
          hasConstants = false,
          isCxxModule = false,
          isTurboModule = true,
        )
      )
    }
  }
}