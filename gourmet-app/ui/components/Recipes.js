import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet, FlatList , FlatList  } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
// import { getRecipes } from '../../api/Recipe';
import { Button } from '@rneui/themed';


export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const getRecipes = async () => {
        try {
            console.log("entrando a getRecipes");
            const data = await fetch(
                `https://ad-backend-production.up.railway.app/api/recipes/search/by?limit=100` // Endpoint para obtener todas las recetas
            );
            const json = await data.json();
            console.log(json)
            return json;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const recipesData = await getRecipes();
                setRecipes(recipesData.recipes);
                console.log(recipes)
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }

        fetchRecipes();
    }, []);
    const handleButtonPress = () => {
        console.log('Button pressed');
        async function fetchRecipes() {
            try {
                const recipesData = await getRecipes();
                console.log("paso")
                setRecipes(recipesData);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                console.log("error")
            }
        }
        console.log('Button pasa');

        fetchRecipes();


    }

    return (
          <View style={styles.container}>
              <View style={styles.masonryList}>
                  <MasonryList
                      data={recipes}
                      keyExtractor={(item) => item._id}
                      numColumns={2}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) => <RecipeCard item={item} index={index} />}
                      onEndReachedThreshold={0.1}
                  />
                 <Button    buttonStyle={{ backgroundColor: '#ff9900', marginBottom: 30 }} onPress={handleButtonPress}>Cargar más</Button>
             
                  <Button    buttonStyle={{ backgroundColor: '#ff9900', marginBottom: 30 }} onPress={handleButtonPress}>Cargar más</Button>
             </View>
          </View>
        // <View style={styles.container}>
        //     <FlatList
        //         data={recipes}
        //         keyExtractor={(item) => item._id}
        //         numColumns={2}
        //         showsVerticalScrollIndicator={false}
        //         renderItem={({ item, index }) => <RecipeCard item={item} index={index} />}
        //         onEndReachedThreshold={0.1}
        //         refreshing={refreshing}
        //         onRefresh={handleRefresh}
        //     />
        // </View>
        // <View style={styles.container}>
        //     <FlatList
        //         data={recipes}
        //         keyExtractor={(item) => item._id}
        //         numColumns={2}
        //         showsVerticalScrollIndicator={false}
        //         renderItem={({ item, index }) => <RecipeCard item={item} index={index} />}
        //         onEndReachedThreshold={0.1}
        //         refreshing={refreshing}
        //         onRefresh={handleRefresh}
        //     />
        // </View>
    );
}

const RecipeCard = ({ item, index }) => {
    let isEven = index %  2 ===  0;

    return (
        <View style={styles.recipeCard}>
            <Pressable style={[styles.pressable, { paddingLeft: isEven ?  0 :  8, paddingRight: isEven ?  8 :  0 }]}>
                {/* TODO: refactorizar imagen item.img
                <Image source={require("../../assets/images/recipes/tarta-manzana.png")} style={styles.image} />
                <Text style={styles.recipeName}>{item.title}</Text> */}
                <Image source={{ uri: item.photo[0] }} style={styles.image} />
                <Text style={styles.recipeName}>{item.title}</Text>
            </Pressable>
        </View>
    );
};

const RecipeCards = ({ item, index }) => {
    let isEven = index %  2 ===  0;

    return (
        <View style={styles.recipeCard}>
            <Pressable style={[styles.pressable, { paddingLeft: isEven ?  0 :  8, paddingRight: isEven ?  8 :  0 }]}>
                {/* Utilizamos la primera imagen del arreglo de fotos proporcionado */}
                <Image source={{ uri: item.photo[0] }} style={styles.image} />
                <Text style={styles.recipeName}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.ingredients}>Ingredients:</Text>
                <View style={styles.ingredientsList}>
                    {item.ingredients.map(ingredient => (
                        <Text key={ingredient._id} style={styles.ingredient}>{ingredient.name} - {ingredient.quantity}</Text>
                    ))}
                </View>
                <Text style={styles.instructions}>Instructions:</Text>
                <View style={styles.instructionsList}>
                    {item.instructions.map((instruction, idx) => (
                        <Text key={idx} style={styles.instruction}>{instruction}</Text>
                    ))}
                </View>
                <Text style={styles.portion}>Portion: {item.portion}</Text>
                <Text style={styles.hashtag}>#{item.hashtag}</Text>
                <Text style={styles.calorie}>Calories: {item.calorie}</Text>
                <Text style={styles.fat}>Fat: {item.fat}</Text>
                <Text style={styles.protein}>Protein: {item.protein}</Text>
                <Text style={styles.rating}>Rating: {item.rating}</Text>
                <Text style={styles.likes}>Likes: {item.like}</Text>
                <Text style={styles.video}>Video: {item.video}</Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginHorizontal:  3,
        marginTop:  8,
    },

    masonryList: {
        flex:  1,
    },
    recipeCard: {
        flex:  1,
    },
    pressable: {
        width: '100%',
        justifyContent: 'center',
        marginBottom:  16,
    },
    image: {
        width:  160,
        height:  160,
        borderRadius:  25,
        backgroundColor: 'rgba(0,  0,  0,  0.2)',
    },
    recipeName: {
        fontSize:  13,
        marginTop:  10,
        fontWeight: 'bold',
    },
});