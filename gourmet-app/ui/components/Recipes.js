import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { mockRecipes } from '../../mock/mockRecipes';

export default function Recipes() {
    return (
        <View style={styles.container}>

            <View style={styles.masonryList}>
                <MasonryList
                    data={mockRecipes}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <RecipeCard item={item} index={index} />}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>
    );
}

const RecipeCard = ({ item, index }) => {
    let isEven = index %  2 ===  0;

    return (
        <View style={styles.recipeCard}>
            <Pressable style={[styles.pressable, { paddingLeft: isEven ?  0 :  8, paddingRight: isEven ?  8 :  0 }]}>
            {/* TODO: refactorizar imagen item.img */}
            <Image source={require("../../assets/images/recipes/tarta-manzana.png")} style={styles.image} />
                <Text style={styles.recipeName}>{item.nombre}</Text>
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
