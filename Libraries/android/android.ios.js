/**
 * @providesModule android
 * @flow
 */
'use strict';

var Nativeandroid = require('NativeModules').android;

/**
 * High-level docs for the android iOS API can be written here.
 */

var android = {
  test: function() {
    Nativeandroid.test();
  }
};

module.exports = android;
