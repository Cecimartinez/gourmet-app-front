import React from 'react'
import {  Text, Image, StyleSheet, Button, SafeAreaView} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react';

export default function SignInScreen() {

    const [error, setError] = useState();
    const [userInfo, setUserInfo] = useState();

    const configureGoogleSignIn = () =>{
        GoogleSignin.configure({
            webClientId:
            "715063980560-4kupte0f8oi6jotbq8t1c7q0v4qheebq.apps.googleusercontent.com",
            androidClientId:
            "715063980560-7ii2nm0sliade375u2qh40rlcvr5hntd.apps.googleusercontent.com",
            iosClientId:
            "715063980560-pctr6n6pkedvd32od686d2ged3tv2sq9.apps.googleusercontent.com"
        })
    }

    useEffect(() => {
        configureGoogleSignIn();
      });
    
      const signIn = async () => {
        console.log("Pressed sign in");
    
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setUserInfo(userInfo);
          setError();
        } catch (e) {
          setError(e);
        }
      };
    
      const logout = () => {
        setUserInfo(undefined);
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
      };


    return (
        <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={styles.titleText} >Gourmet</Text>
            <Image source={require('../../assets/images/icon-gourmet.png')} style={{width: 200, height: 200, marginTop:75, marginBottom:75}} />
            <Text>{JSON.stringify(error)}</Text>
                {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
                {userInfo ? (
                    <Button title="Logout" onPress={logout} />
                ) : (
                    <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                    />
            )}
        <StatusBar style='auto' />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    titleText: {
        fontWeight: 'bold',
        color: '#F39E0B',
        letterSpacing: 4,
        fontSize:50, 
        marginTop:70
      },


})