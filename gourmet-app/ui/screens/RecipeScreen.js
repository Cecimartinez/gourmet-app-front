import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, TouchableCategory } from 'react-native'; // Asegúrate de importar FlatList
import { Picker } from '@react-native-picker/picker';
import { mockRecipes } from '../../mock/mockRecipes'; // Cambia la ruta según tu proyecto
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Ingredients from '../components/ViewRecipeContent/Ingredients';
import Steps from '../components/ViewRecipeContent/Steps';
import Video from '../components/ViewRecipeContent/Video';
import InformacionNutricional from '../components/ViewRecipeContent/InformacionNutricional';
import { useRoute } from '@react-navigation/native';








export default function RecipeScreen({ route, navigation, navigator }) {


    const categoriesArray = [
        { id: 1, name: 'Ingredientes' },
        { id: 2, name: 'Pasos' },
        { id: 3, name: 'Video' },
        { id: 4, name: 'Información Nutricional' },
    ];



    const { recipe } = route.params;
    console.log(recipe, 'recipe en recipe screen');
    const route2 = useRoute();

    const { responseBody } = route2.params;
  //  console.log(userInfo, 'user info en profile')
    console.log(responseBody._id, 'user info id')

    

   




    const [selectedCategory, setSelectedCategory] = useState(1);

    const [recipes, setRecipes] = useState([]); // Estado para almacenar las recetas

    const handleBookmarkClick = (id) => {
        fetch(`https://ad-backend-production.up.railway.app/api/users/favorite/${responseBody._id}/${id}`, {
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
        fetch(`https://ad-backend-production.up.railway.app/api/users/favorite/${responseBody._id}`)
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


            <Image source={{ uri: recipe.photo[0] }} style={styles.recipeImage} />



            <View>
                <Text style={styles.title}>{recipe.title}</Text>
                <View style={styles.barraSuperior}>
                    <MaterialCommunityIcons name="clock" size={24} color="black" style={styles.timeImage} />
                    <Text style={styles.recipeTime}>{recipe.requiredTime}</Text>
                    <MaterialIcons name="star-rate" size={24} color="gold" style={styles.recipeStarsIcon} />
                    <Text style={styles.recipeStars}>{recipe.rating}</Text>
                    <FontAwesome5 name="fire-alt" size={24} color="gold" style={styles.recipeStarsIcon} />
                    <Text style={styles.recipeStars}>{recipe.calorie}</Text>
                    <TouchableOpacity
                        onPress={() => handleBookmarkClick(recipe._id)}
                        activeOpacity={0.6} // Define la opacidad al hacer clic
                        style={styles.bookmark}
                    >
                        <FontAwesome name="bookmark" size={24} color="orange" />
                    </TouchableOpacity>



                </View>
                <View style={styles.barraMedio}>

                    <ScrollView
                        horizontal
                        contentContainerStyle={{ flexDirection: 'row' }}
                    >
                        {categoriesArray.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() => setSelectedCategory(category.id)}
                                style={{
                                    borderRadius: 12,
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    backgroundColor:
                                        selectedCategory === category.id ? 'orange' : 'white',
                                    height: 45,
                                }}
                            >
                                <Text style={{ fontWeight: 'bold', }}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>


                <View style={styles.detallesReceta} >

                    {selectedCategory === categoriesArray[0].id && <Ingredients ingredients={recipe.ingredients} />}
                    {selectedCategory === categoriesArray[1].id && <Steps steps={recipe.instructions} />}
                    {selectedCategory === categoriesArray[2].id && <Video video={recipe.video} />}
                    {selectedCategory === categoriesArray[3].id && <InformacionNutricional calorie={recipe.calorie} fat={recipe.fat} protein={recipe.protein} sodium={recipe.sodium} />}
                </View>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {


        backgroundColor: '#fefefe',
        flex: 1,
        alignItems: 'center',

        padding: 20,
        marginVertical: 50,
        marginHorizontal: 12,


    },
    recipeImage: {
        height: "40%",
        width: "100%",
        alignItems: 'center',

        borderRadius: 32,
        resizeMode: 'cover',



    },
    barraMedio: {
        margin: 10,
        borderRadius: 24,
        height: '10%',

        padding: 10,
    },
    title: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        alignSelf: 'center',
        marginVertical: 45,
    },
    detallesReceta: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: '#fff',

    },
    recipeItem: {

        flexDirection: 'row',
        fontSize: 22,
        flex: 1,
        backgroundColor: '#fefefe',
        padding: 5,
        marginVertical: 15,
        borderRadius: 24,
        marginRight: 5,

        width: '50%',
    },
    recipeName: {
        margin: 10,
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    barraSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 5,

    },





    recipeTime: {
        fontSize: 15,
        fontWeight: 'bold',

        marginTop: 10,
        alignSelf: 'flex-start',

    },
    recipeStars: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'flex-start',
        marginBottom: 30,
        marginRight: 10,


    }, timeImage: {
        marginTop: 7,
        alignSelf: 'flex-start',
        marginBottom: 30,
    },

    recipeStarsIcon: {
        marginTop: 7,
        alignSelf: 'flex-start',
        marginBottom: 30,



    },
    bookmark: {
        marginTop: 7,
        alignSelf: 'flex-start',
        marginBottom: 30,

    },
    ingredientsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',




    },
    ingredientsItems: {
        fontSize: 15,
        fontWeight: 'bold',


    },


});