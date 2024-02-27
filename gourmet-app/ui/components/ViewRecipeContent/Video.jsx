import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';




function Video({ video }) {console.log(video)
    return (

        <View style={{ flex: 1,  }}>
            <WebView style={{flex:1}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri:video }}
                
            />
        </View>);
}

export default Video;