# Lustre Chic Mobile App

This is a [react native](http://facebook.github.io/react-native/) based mobile app to run the Lustre Chic iot light.

# Setup the app

You need to copy the `DEFAULT_config.json` to `config.json` and fill in the values. The device ID is from the Particle dashboard, and you can find the Access Token from the build interface (click into the settings).


## Store the Android signing keystore password in Keychain

Create a password in **Keychain Access** under the name of `android_personal_keystore`. [Instructions on how to utilize the keychain for signing](https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/).  
  
If you need to generate a new keystore you can use the following line. Please use the same password from before.  

`keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`




# Building the deployment


