import React, { useState, useEffect }  from 'react';
import { View, Text, FlatList, StyleSheet,Image,TouchableOpacity,ScrollView } from 'react-native'; // Asegúrate de importar FlatList
import { mockRecipes } from '../../mock/mockRecipes'; // Cambia la ruta según tu proyecto
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function RecipeScreen() {
    
   
  
 
    const [recipes, setRecipes] = useState([]); // Estado para almacenar las recetas
   
  
    

  const navigation = useNavigation(); // Obtiene la función de navegación




  const handleBookmarkClick = (id) => {
    fetch(`https://ad-backend-production.up.railway.app/api/users/favorite/64a60d14592f32e512ada278/${id}`, {
      method: 'POST'
    }).then((response) => response.json())
    .then((data) => {
      console.log('Receta añadida a favoritos:', data);
    })
    .catch((error) => {
      console.error('Error al añadir la receta a favoritos:', error);
    });
    
  };

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
  }, [recipes]); // Se ejecuta solo una vez al montar el componente

 
  
    return (
        <View style={styles.container}>
          <Text style={styles.title}>DETALLE RECETA</Text>
          
          
          <FlatList data={recipes}
          keyExtractor={(item)=>item._id}
          renderItem={({item}) =>(
            
            <View>
            <TouchableOpacity style={styles.recipeItem}
            onPress={() => navigation.useNavigate("Receta" , { recipeId: item._id })} // Navega a la página de detalles
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
                      onPress={() => handleBookmarkClick(item._id)}
                      activeOpacity={0.6} // Define la opacidad al hacer clic
                      style={styles.bookmark}
                     >
                        <FontAwesome name="bookmark" size={24} color="orange" />
                       </TouchableOpacity>
                      
                        
                    </View>
                </View>
                

            </TouchableOpacity>
            </View>
          )}
          />
          
        </View>
      );
    }


const styles = StyleSheet.create({
  container: {
    
    backgroundColor:'#fefefe',
    flex: 1,
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