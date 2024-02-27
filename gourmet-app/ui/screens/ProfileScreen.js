import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SimpleLineIcons } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {

    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            // Optionally, navigate the user back to the sign-in screen or clear user info from state/local storage
            navigation.reset({
                index:  0,
                routes: [{ name: 'SignIn' }],
              });
              
        } catch (error) {
            console.error(error);
        }
    };
    
    

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <ScrollView
                style={{ flex:  1 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{color:"#FFA200", fontSize:18, fontWeight:"500", paddingLeft:10}} >User Profile</Text>
                <View style={{alignItems:'center', justifyContent:'center', width:'auto', marginTop:100}}>
                    <Image
                        source={require('../../assets/images/patito.jpg')}
                        style={styles.profileImage}
                    />   
                    <Text style={styles.userName}>Maximiliano Roisentul</Text>
                       
                        <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#FFA200', paddingLeft:100, paddingRight:100 , marginTop:150}]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.buttonText}>Cerrar Sesión</Text>
                            </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop:  50,
        paddingLeft:  10,
        paddingRight:  10,
        flex:  1,
        width: '100%',
        backgroundColor: 'white',
    },
    profileImage: {
        width:  100,
        height:  100,
        borderRadius:  75, // Para hacer la imagen redonda
        marginBottom:  20,
    },
    userName: {
        fontSize:  20,
        fontWeight: '500',
        marginBottom:  20,
    },
    button: {
        paddingVertical:  10,
        paddingHorizontal:  20,
        borderRadius:  20,
        marginBottom:  20,
    },
    buttonText: {
        color: 'white',
        fontSize:  16,
        textAlign: 'center',
    },
});
