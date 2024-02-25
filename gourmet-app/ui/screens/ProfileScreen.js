import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SimpleLineIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';





export default function ProfileScreen() {
   

   
  const navigation = useNavigation(); // Obtiene la función de navegación
    

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <ScrollView
                style={{ flex:  1 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{color:"#FFA200", fontSize:18, fontWeight:"500", paddingLeft:10}} >Create Recipe</Text>
                <View style={{alignItems:'center', justifyContent:'center', width:'auto', marginTop:100}}>
                    <Image
                        source={require('../../assets/images/profile.jpg')}
                        style={styles.profileImage}
                    />   
                    <Text style={styles.userName}>Ana Rodriguez</Text>
                       
                       
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft:100, paddingRight:100, marginTop:50}} 
                         onPress={() => navigation.navigate('RecipesUser')}>

                        <SimpleLineIcons name="notebook" style={{color:'#FFA200', fontSize:15, paddingRight:10, justifyContent:'flex-start'}}/>
                            <Text style={{color:'#FFA200', fontWeight:'bold', fontSize:15}}>Mis Recetas</Text>
                        </TouchableOpacity>
                   
                   
                   
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FFA200', paddingLeft:100, paddingRight:100 , marginTop:150}]}>
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
