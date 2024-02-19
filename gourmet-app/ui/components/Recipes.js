import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { mockRecipes } from '../../mock/mockRecipes';

export default function Recipes() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipes</Text>

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
                <Image source={{ uri: item.img }} style={styles.image} />
                <Text style={styles.recipeName}>{item.nombre}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal:  16,
        marginTop:  8,
    },
    title: {
        fontSize:  22,
        fontWeight: '400',
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
        width:  100,
        height:  100,
        borderRadius:  35,
        backgroundColor: 'rgba(0,  0,  0,  0.2)',
    },
    recipeName: {
        fontSize:  15,
        marginTop:  10,
    },
});
