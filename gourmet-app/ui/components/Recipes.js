import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet, FlatList, TouchableOpacity  } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
// import { getRecipes } from '../../api/Recipe';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';


export default function Recipes({ activeCategory, activeSearch }) {
    const [recipes, setRecipes] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchFilteredRecipes = async () => {
            try {
                // const filteredRecipes = await getRecipes(activeCategory);
                const filteredRecipes = await getRecipes(activeCategory, activeSearch);
                setRecipes(filteredRecipes.recipes);
                setError(null);
            } catch (error) {
                console.error('Error fetching filtered recipes:', error);
                setError('Error fetching filtered recipes');
            }
        };

        if (activeCategory) {
            fetchFilteredRecipes();
        } else {
            fetchAllRecipes();
        }
    }, [activeCategory,activeSearch]);



    // //nuevo category
    // const getRecipes = async (category = null) => {
    //     try {
    //         let url = 'https://ad-backend-production.up.railway.app/api/recipes/search/by?';
            
    //         if (category) {
    //             console.log("entra al category get recipe");
    //             url += `&category[]=${category}`;
    //         } 
    //         if (category === 'All' || !category) {
    //             console.log("entra al all get recipe");
    //             url = 'https://ad-backend-production.up.railway.app/api/recipes/search/by?limit=100';
    //         }
            
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         throw new Error('Error fetching recipes');
    //     }
    // };
    
//nuevo con category y search
    const getRecipes = async (category = null, searchTerm = null) => {
        try {
            let url = 'https://ad-backend-production.up.railway.app/api/recipes/search/by?';
    
            // Construir la URL según los parámetros recibidos
            if (category && category !== 'All') {
                url += `category[]=${category}&`;
            }
            if (searchTerm) {
                url += `title=${encodeURIComponent(searchTerm)}&`;
            }
    
            // Si no hay categoría o es 'All', establecer el límite como 100
            if (!category || category === 'All') {
                url += 'limit=100';
            }
    
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching recipes');
        }
    };
    



    
    useEffect(() => {
        async function fetchRecipes() {
            try {
                const recipesData = await getRecipes();
                setRecipes(recipesData.recipes);
                console.log(recipes);
                setError(null); // Limpiar cualquier error previo si la obtención de recetas es exitosa
            } catch (error) {
                console.error('Error fetching recipes 2:', error);
                setError(error.message); // Establecer el mensaje de error en el estado si hay un error
            }
        }

        fetchRecipes();
    }, []);


    const fetchRecipes = async () => {
        try {
            const recipesData = await getRecipes();
            setRecipes(recipesData.recipes);
            console.log(recipes);
            setError(null); // Limpiar cualquier error previo si la obtención de recetas es exitosa
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setError(error.message); // Establecer el mensaje de error en el estado si hay un error
        }        
    };


        //este va catregory
    // const handleRefresh = () => {
    //     setRefreshing(true);
    //     fetchRecipes().finally(() => setRefreshing(false));
    // };


    // const handleButtonPress = () => {
    //     console.log('Button pressed');
    //     async function fetchRecipes() {
    //         try {
    //             const recipesData = await getRecipes();
    //             console.log("paso")
    //             setRecipes(recipesData.recipes);
    //         } catch (error) {
    //             console.error('Error fetching recipes:', error);
    //             console.log("error")
    //         }
    //     }
    //     console.log('Button pasa');

    //     fetchRecipes();


    // }
    const handleButtonPress = () => {
        console.log('Button pressed');
        fetchRecipes(); // Llamar a la función para obtener recetas cuando se presione el botón
    }

    
    const handleCloseError = () => {
        setError(null); // Limpiar el estado de error al cerrar el mensaje
    }

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const allRecipes = await getRecipes();
                setRecipes(allRecipes.recipes);
                setError(null);
            } catch (error) {
                console.error('Error fetching recipes 3:', error);
                setError('Error fetching recipes');
            }
        };
    
        fetchAllRecipes();
    }, []);
    

    const fetchAllRecipes = async () => {
        try {
            const allRecipes = await getRecipes();
            setRecipes(allRecipes.recipes);
            setError(null);
        } catch (error) {
            console.error('Error fetching recipes 4:', error);
            setError('Error fetching recipes');
        }
    }



 
    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            const refreshedRecipes = await getRecipes(activeCategory);
            setRecipes(refreshedRecipes.recipes);
            setError(null);
        } catch (error) {
            console.error('Error refreshing recipes:', error);
            setError('Error refreshing recipes');
        } finally {
            setRefreshing(false);
        }
    };


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
                 {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseError}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    );
}


const RecipeCard = ({ item, index }) => {
    const navigation = useNavigation();
    let isEven = index % 2 === 0;

    const handleRecipePress = () => {
        // Navegar a la pantalla CreateReceta con el ID de la receta como parámetro
        navigation.navigate('Create', { id: item._id });
    };

    return (
        <View style={styles.recipeCard}>
            <Pressable onPress={handleRecipePress} style={[styles.pressable, { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }]}>
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
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
