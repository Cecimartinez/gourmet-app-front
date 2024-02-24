import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignInScreen({promptAsync}) {
    return (
    
        <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={styles.titleText} >Gourmet</Text>
            <Image source={require('../../assets/images/icon-gourmet.png')} style={{width: 200, height: 200, marginTop:75}} />
            <TouchableOpacity style={{
                width:"90%",
                flexDirection:"row",
                backgroundColor: '#F39E0B',
                alignItems: 'center',
                justifyContent: 'center',
                width:'auto',
                marginTop:100,
                padding:10,
                paddingLeft:20,
                paddingRight:20,
                borderRadius:20,
                gap:15,
                marginBottom:150
            }}
            
            onPress={() => promptAsync()}
            >
            
            <AntDesign name="google" size={30} color="white" />
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
            Sign In with Google
            </Text>
                        
        </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    titleText: {
        fontWeight: 'bold',
        color: '#F39E0B',
        letterSpacing: 4,
        fontSize:50, 
        marginTop:150
      },


})