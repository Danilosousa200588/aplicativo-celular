# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /Users/yourname/Library/Android/sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep rules here:

# Keep WebView and JavaScript interfaces
-keepclassmembers class fqcn.of.javascript.interface.for.webview {
   public *;
}

-keepattributes JavascriptInterface
-keepattributes *Annotation*
-keep public class com.finance.app.MainActivity$WebAppInterface {
    public *;
}
