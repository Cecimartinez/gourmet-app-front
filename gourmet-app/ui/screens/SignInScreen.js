import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, Button, SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';




export default function SignInScreen() {
    const [error, setError] = useState();
    const [userInfo, setUserInfo] = useState();
    const navigation = useNavigation();

    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId: "715063980560-4kupte0f8oi6jotbq8t1c7q0v4qheebq.apps.googleusercontent.com",
            androidClientId: "715063980560-7ii2nm0sliade375u2qh40rlcvr5hntd.apps.googleusercontent.com",
            iosClientId: "715063980560-pctr6n6pkedvd32od686d2ged3tv2sq9.apps.googleusercontent.com"

        });
    };


    useEffect(() => {
        configureGoogleSignIn();
    }, []);

    const signIn = async (userInfo) => {
        console.log("Pressed sign in");

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfo(userInfo);


            console.log("User info: " + userInfo.user)

            const { photo, name, familyName } = userInfo.user;
            console.log("Profile Image URL: ", photo);
            console.log("Name: ", name);
            console.log("Surname: ", familyName);

            setError();
            const accessToken = await GoogleSignin.getTokens();
            console.log("Access Token: " + accessToken.accessToken);
            // Obtener los tokens (ID Token y Access Token)
            const tokens = await GoogleSignin.getTokens();
            console.log("ID Token: ", tokens.idToken);
            console.log("Access Token: ", tokens.accessToken);
            const dataLogIn = {
                sessionToken: tokens.accessToken,
                idToken: tokens.idToken,

            }


            // Realizar la solicitud POST al servidor
            const response = await fetch('https://ad-backend-production.up.railway.app/api/recipes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataLogIn)
            });


            const responseUserId = await fetch('https://ad-backend-production.up.railway.app/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataLogIn) // Formatea correctamente el objeto como JSON
            });

            const responseBody = await responseUserId.json(); // Lee la respuesta como JSON

            console.log(responseBody, 'Response User ID resol');




            // Navegar a TabNavigation después de iniciar sesión
            // console.log(userInfo, 'VALOR DE userInfo');

            navigation.navigate('MainTabNavigation', { responseBody });
        } catch (e) {
            setError(e);
        }
    };





    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.titleText} >Gourmet</Text>
            <Image source={require('../../assets/images/icon-gourmet.png')} style={{ width: 200, height: 200, marginTop: 75, marginBottom: 75 }} />
            <Text>{JSON.stringify(error)}</Text>
            {!userInfo && (
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />
            )}
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}
export const logout = () => {
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    navigation.navigate('SignIn');
};

const styles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        color: '#F39E0B',
        letterSpacing: 4,
        fontSize: 50,
        marginTop: 70
    },
});

