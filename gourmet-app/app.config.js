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
      "bundleIdentifier":"com.godeli.gourmet",
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/icon-gourmet.png",
        "backgroundColor": "#ffffff"
      }
      ,
      "package":"com.godeli.gourmet",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
    },
    
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "a98db635-6103-4fdd-8624-979064f24dde"
      }
    }
  }
}
