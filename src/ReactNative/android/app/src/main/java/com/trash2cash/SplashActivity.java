
package com.trash2cash;// Change this to your package name.

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.ReactActivity;

import com.trash2cash.MainActivity;

// SplashActivity must extend ReactActivity (and not AppCompatActivity) in order
// for Push Notifications to call onNotificationOpenedApp or for
// getInitialNotification to resolve a value

public class SplashActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Intent intent = new Intent(this, MainActivity.class);
        // startActivity(intent);
        // finish();

                try {
            Intent intent = new Intent(this, MainActivity.class);
            Bundle extras = getIntent().getExtras();

            if (extras != null) {
                // this line is critical for Push Notifications to call
                // onNotificationOpenedApp
                intent.putExtras(extras);
            }

            intent.setAction(getIntent().getAction());
            intent.setData(getIntent().getData());

            startActivity(intent);
            finish();
        } catch (Exception e) {
            e.printStackTrace();
            finishAffinity();
        }

    }
}