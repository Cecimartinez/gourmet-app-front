import React,{FC} from 'react';
import { View, Text, FlatList, StyleSheet,Image } from 'react-native'; // Asegúrate de importar FlatList
import { mockRecipes } from '../../mock/mockRecipes'; // Cambia la ruta según tu proyecto


export default function FavoriteRecipesScreen() {
    // Filtra las recetas favoritas (por ejemplo, si tienen la propiedad isFavorite establecida en true)
    const favoriteRecipes = mockRecipes;
     // Función para generar las estrellas
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push('⭐'); // Puedes usar cualquier otro ícono o estilo
    }
    return stars;
  };
  
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Recetas Favoritas</Text>
          <FlatList data={favoriteRecipes}
          keyExtractor={(item)=>item.nombre}
          renderItem={({item}) =>(
            <View style={styles.recipeItem}>
               
                <Image source={{uri:item.img}} style={styles.recipeImage}/>
                <View style={styles.recipeInformation}>
                    <Text style={styles.recipeName}>{item.nombre}</Text>
                    <Text style={styles.recipeDescription}>{item.descripcion}</Text>
                    <View style={styles.recipeIndicators}>
                        <Image source={require('../../assets/icon-time.png')} style={styles.timeImage}/>
                        <Text style={styles.recipeTime}>{item.tiempo}</Text>
                        <Text style={styles.recipeStars}>{renderStars(item.estrellas)}</Text>
                    </View>
                </View>
                

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
  
    borderRadius:12,
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
    backgroundColor:'rgb(249,247,248)',
    padding: 16,
    marginVertical:10,
    borderRadius:24,
    
    padding:5,
    width:'50%',
  },
  recipeName: {
    
    alignSelf:'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color:'#000',
  },
  recipeDescription: {
    
    alignSelf:'flex-start',
    fontSize: 16,
     color:'#000',
  },
  recipeIndicators:{},

  recipeTime:{

    alignSelf:'flex-start',

  },
  recipeStars:{
    alignSelf:'flex-start',


  },
  timeImage:{
    marginTop:15,
    width:30,
    height:30,
  },
  recipeInformation:{
    

  },
  
});