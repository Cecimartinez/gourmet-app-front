import React from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';




function Video({ video }) {
    return (

        <View style={{ flex: 1, marginBottom: 30, }}>
            <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: 'https://youtu.be/0aDB39jyLG0' }}
            />
        </View>);
}

export default Video;