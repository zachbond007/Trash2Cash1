package com.trash2cash;

import android.app.Application;
import android.content.Context;

// import com.facebook.login.LoginManager;
import com.facebook.react.PackageList;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactActivity;
// import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactApplication;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.dooboolab.RNIap.RNIapPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
// import com.reactnativegooglesignin.RNGoogleSigninPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// import com.facebook.react.BuildConfig;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
//           packages.add(new MainReactPackage());
// //          packages.add(new FacebookLoginPackage());
// //            add(new MainReactPackage());
// //            packages.add(new FacebookLoginPackage());
//             packages.add(new TwitterSigninPackage());
//             packages.add(new RNGoogleSigninPackage());
//             packages.add(new VectorIconsPackage());
//            packages.add(new RNSvgPackage());
          return packages;
        }
        
        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    AppEventsLogger.activateApp(this);
     FacebookSdk.sdkInitialize(getApplicationContext());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.trash2cash.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
