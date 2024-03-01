import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native';



export default function ProfileScreen() {
    const [userId, setUserId] = useState('105801571809384299538');

    const [error, setError] = useState(null);


    const route = useRoute();

    const { responseBody } = route.params;
  //  console.log(userInfo, 'user info en profile')
    console.log(responseBody.name,'user info name')



    useEffect(() => {
        const fetchUserData = async () => {
            try {
               

                // Corrected URL syntax
                const response = await fetch(`https://ad-backend-production.up.railway.app/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los detalles del usuario');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error al obtener los detalles del usuario:', error.message);
                setError('Error al cargar los detalles del usuario');
            }
        };

        fetchUserData();
    }, [userId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            navigation.reset({
                index: 0,
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
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ color: "#FFA200", fontSize: 18, fontWeight: "500", paddingLeft: 10 }}>User Profile</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 'auto', marginTop: 100 }}>

                <Image
                        source={{ uri: responseBody.picture }}
                        style={styles.profileImage}
                    /> 

                    {/* Assuming userData has a property for the user's photo URL */}
                  
                    {/* Assuming userData has a property for the user's name */}
                    <Text style={styles.userName}>{responseBody.name}</Text>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#FFA200', paddingLeft: 100, paddingRight: 100, marginTop: 150 }]}
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
    container: {
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75, // To make the image round
        marginBottom: 20,
    },
    userName: {
        color: '#123123',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
