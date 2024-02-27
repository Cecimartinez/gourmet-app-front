export default{
  "expo": {
    "name": "gourmet-app",
    "slug": "gourmet-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon-gourmet.png",
    "userInterfaceStyle": "light",
    "assetBundlePatterns": [
      "**/*"
    ],
    "splash": {
      "image": "./assets/images/icon-gourmet.png",
      "resizeMode": "contain",
      "backgroundColor": "#ff9900"
    },

    "plugins":[
      "@react-native-google-signin/google-signin" 
    ],

    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.godeli.gourmet",
      "infoPlist": {
        "CFBundleURLTypes": [
          {
            "CFBundleURLSchemes": [
              "com.googleusercontent.apps.715063980560-pctr6n6pkedvd32od686d2ged3tv2sq9"
            ]
          }
        ]
      }
    },
    "android": {
      "package": "com.godeli.gourmet",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/icon-gourmet.png",
        "backgroundColor": "#ffffff"
      },
      },
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO"
      ]
    },
    
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "a98db635-6103-4fdd-8624-979064f24dde"
      }
    },
    "plugins": [
      "@react-native-google-signin/google-signin",
      [
        "expo-camera",
        {
          "cameraPermission": "Allow app to access your camera."
        }
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow app to access your photos."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "a00963db-55c3-41db-9796-d65c46388f2b"
      }
    }
  }
