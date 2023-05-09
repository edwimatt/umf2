package com.understanding_my_facility;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class SplashActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.launch_screen);

        Intent intent = new Intent(com.understanding_my_facility.SplashActivity.this, MainActivity.class);
        com.understanding_my_facility.SplashActivity.this.startActivity(intent);
        finish();

    }
}