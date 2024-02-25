import React from 'react'
import { View,StyleSheet, Text ,FlatList,Image,TouchableOpacity} from 'react-native'
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function MyRecipeScreen() {
    
  const [recipes, setRecipes] = useState([]); // Estado para almacenar las recetas
   
  const handleBookmarkClick = () => {
  setIsBookmarked(!isBookmarked); // Cambia el estado a su opuesto

  if (isBookmarked) {
    // Realiza la acción para eliminar el marcador de tus favoritos
    // (por ejemplo, hacer un push a tu historial de navegación).
    // Aquí puedes usar la función de navegación de tu framework o librería.
    console.log('Marcador eliminado');
  } else {
    console.log('Marcador agregado');
  }
};
    

  const navigation = useNavigation(); // Obtiene la función de navegación
  useEffect(() => {
    // Realiza una solicitud HTTP para obtener las recetas desde tu backend
    fetch('https://ad-backend-production.up.railway.app/api/users/favorite/64a60d14592f32e512ada278')
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con las recetas obtenidas
        setRecipes(data);
      })
      .catch((error) => {
        console.error('Error al obtener las recetas:', error);
      });
  }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Mis recetas </Text>
        
        
        <FlatList data={recipes}
        keyExtractor={(item)=>item._id}
        renderItem={({item}) =>(
          
          <View>
          <View style={styles.recipeItem}
          
           >
             
              <Image source={{uri:item.photo[0]}} style={styles.recipeImage}/>
              <View style={styles.recipeInformation}>
                  <Text style={styles.recipeName}>{item.title}</Text>
                  <Text style={styles.recipeDescription}>{item.description}</Text>
                  <View style={styles.recipeIndicators}>
                    
                    <MaterialCommunityIcons name="clock" size={24} color="black" style={styles.timeImage} />
                    <Text style={styles.recipeTime}>{item.requiredTime}</Text>

                
                   
                   
                    <MaterialIcons name="star-rate" size={24} color="gold" style={styles.recipeStarsIcon}/>
                    <Text style={styles.recipeStars}>{item.rating}</Text>
                    <FontAwesome onClick={handleBookmarkClick} name="bookmark" size={24} color="orange" style={styles.bookmark}/>
                    
                      
                  </View>
              </View>
              

          </View>
          </View>
        )}
        />
        
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fefefe',
      
      alignItems: 'center',
      justifyContent: 'center',
      padding:20,
      marginVertical:8,
      marginHorizontal:12,
      
      
    },
  recipeImage:{
      height:150,
      width:150,
      alignItems:'center',
    
      borderRadius:32,
      marginRight:14,
  
  },
    title: {
      color:'#FFA200',
      fontSize: 15,
          fontWeight: 'bold',
          marginBottom: 10,
          marginLeft: 10,
          alignSelf:'flex-start',
          marginVertical:45,
    },
    recipeItem: {
      
      flexDirection: 'row',
      fontSize:22,
      flex:1,
      backgroundColor:'#fefefe',
      padding: 5,
      marginVertical:15,
      borderRadius:24,
      marginRight:5,
      
      width:'50%',
    },
    recipeName: {
      margin:10,
      alignSelf:'flex-start',
      fontSize: 16,
      fontWeight: 'bold',
      color:'#000',
    },
    
    recipeDescription: {
      marginLeft:5,    
      alignSelf:'flex-start',
      fontSize: 16,
       color:'#000',
    },
    recipeIndicators:{
      flexDirection: 'row',
      justifyContent:'space-evenly',
      marginBottom:5,
  
    },
  
    recipeTime:{
      fontSize:15,
      fontWeight:'bold',
    
      marginTop:10,
         alignSelf:'flex-start',
  
    },
    recipeStars:{
      fontSize:15,
      fontWeight:'bold',
      marginTop:10,
      alignSelf:'flex-start',
      marginBottom:30,
      marginRight:10,
      
  
    },recipeStarsIcon:{
      marginTop:7,
      alignSelf:'flex-start',
      marginBottom:30,
     
  
  
    }
    ,
    timeImage:{
      marginTop:10,
      marginLeft:10,
      width:30,
      height:30,
    },
    bookmark:{
      marginTop:10,
      alignSelf:'flex-start',
      marginBottom:30,
      marginRight:10,
  
    },
    recipeInformation:{
      backgroundColor:'rgb(249,247,248)',
      borderRadius:24,
      width:'100%',
      
    
      
  
    },
    
  });
