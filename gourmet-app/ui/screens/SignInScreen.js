import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import  {GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { useEffect, useState } from 'react'

export default function SignInScreen() {

    const [error, setError] = useState();
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        GoogleSignin.configure({
          webClientId:
          "1021968533763-p9hneaa9fu94lgm8rre172vga0mibp7b.apps.googleusercontent.com",
        });
      }, []);


      const signin = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const user = await GoogleSignin.signIn();
          setUserInfo(user);
          setError();
        } catch (e) {
          setError(e);
        }
      };
    
      const logout = () => {
        setUserInfo();
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
      };


    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{ fontSize: 55, fontWeight: "bold", color: "#F39E0B" }}>
              Gourmet
            </Text>

            <Image
              source={require('../../assets/images/icon-gourmet.png')}
              style={{ width: 200, height: 200, marginTop: 100, marginBottom: 100 }}
            />

            <Text>{JSON.stringify(error)}</Text>
            {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
            {userInfo ? (
                <Button title="Logout" onPress={logout} />
            ) : (
                <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
                onPress={signin}
                />
            )}            
            <StatusBar style='auto'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:  1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});