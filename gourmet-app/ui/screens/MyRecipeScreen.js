import React from 'react'
import { View,StyleSheet, Text ,FlatList,Image,TouchableOpacity} from 'react-native'
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function MyRecipeScreen() {
    
  const [recipes, setRecipes] = useState([]); // Estado para almacenar las recetas

  const [bookmark,setBookmark] = useState(null);

  const handleEditClick = (recipe) =>{
      // Navegar a la pantalla CreateReceta con el ID de la receta como parámetro
      navigation.navigate('Create', { id: recipe });
    };
    
  
  
  const handleNavigateToRecipe = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };
   
   
  // Función para manejar el evento de clic en el botón de favoritos para sacar y poner del mismo endpoint de favoritos
  const handleBookmarkClick = (id) => {

    fetch(`https://ad-backend-production.up.railway.app/api/users/favorite/64a60d14592f32e512ada278/${id}`, {
      method: 'POST'
    }).then((response) => response.json())
    .then((data) => {
      setBookmark(id);
      console.log('Receta añadida a favoritos:', data);
    })
    .catch((error) => {
      console.error('Error al añadir la receta a favoritos:', error);
    });
  };
  

  const navigation = useNavigation(); // Obtiene la función de navegación
  useEffect(() => {
    // Realiza una solicitud HTTP para obtener las recetas desde tu backend
    fetch('https://ad-backend-production.up.railway.app/api/recipes/user/64a60d14592f32e512ada278')
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con las recetas obtenidas
        setRecipes(data.recipes);
      })
      .catch((error) => {
        console.error('Error al obtener las recetas:', error);
      });
  }, [bookmark]); // Se ejecuta solo una vez al montar el componente

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Mis recetas </Text>
        
        
        <FlatList data={recipes}
        keyExtractor={(item)=>item._id}
        renderItem={({item}) =>(
          
          <View>
          <TouchableOpacity style={styles.recipeItem}
              onPress={() => handleNavigateToRecipe(item)} // Navega a la página de detalles
            >
             
              <Image source={{uri:item.photo[0]}} style={styles.recipeImage}/>
              <View style={styles.recipeInformation}>
                  <Text style={styles.recipeName}>{item.title}</Text>
                  <Text style={styles.recipeDescription} numberOfLines={3}>{item.description}</Text>
                  <View style={styles.recipeIndicators}>
                    
                    <MaterialCommunityIcons name="clock" size={24} color="black" style={styles.timeImage} />
                    <Text style={styles.recipeTime}>{item.requiredTime}</Text>

                
                   
                   
                    <MaterialIcons name="star-rate" size={24} color="gold" style={styles.recipeStarsIcon}/>
                    <Text style={styles.recipeStars}>{item.rating}</Text>
                    <TouchableOpacity
                       onPress={() => handleEditClick(item._id)}
                     activeOpacity={0.6} // Define la opacidad al hacer clic
                    style={styles.bookmark}
               >
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>
                    
                      
                  </View>
              </View>
              

              </TouchableOpacity>
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