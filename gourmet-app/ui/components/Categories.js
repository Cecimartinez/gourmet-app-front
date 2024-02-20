import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { categories } from '../../constants/categories.js';

export default function Categories({ activeCategory, setActiveCategory }) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {categories.map(category => {
                    // Determinar si la categoría está activa
                    const isActive = category.name === activeCategory;
                    // Aplicar estilos según si la categoría está activa o no
                    const categoryStyle = isActive ? styles.activeCategoryContainer : styles.categoryContainer;
                    const textStyle = isActive ? styles.activeCategoryText : styles.categoryText;
                    
                    return (
                        <TouchableOpacity  
                            key={category.id}  
                            onPress={() => setActiveCategory(category.name)}  
                            style={categoryStyle}
                        >
                            <Text style={textStyle}>{category.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:  1,
        marginBottom:  10,
    },
    scrollViewContent: {
        marginBottom:  20,
    },

    categoryContainer: {  
        marginTop:30,
        paddingBottom:  8,
        marginHorizontal:  3,
        paddingVertical:  8,
        paddingHorizontal:  12,
        backgroundColor: '#F1F1F1',
        borderRadius:  20,
        shadowColor: '#000',
        shadowOffset: {
            width:  0,
            height:  1,
        },
        shadowOpacity:  2,
        shadowRadius:  1,
        borderWidth:  1,
        borderColor: '#E2E2E2',
    },
    activeCategoryContainer: {
        // Estilos para la categoría activa
        marginTop:30,
        marginHorizontal:  3,
        paddingVertical:  8,
        paddingHorizontal:  12,
        backgroundColor: '#FFA200',
        borderRadius:  20,
        shadowColor: '#000',
        shadowOffset: {
            width:  0,
            height:  1,
        },
        shadowOpacity:  2,
        shadowRadius:  1,
        borderWidth:  1,
        borderColor: '#E2E2E2',
    },
    categoryText: {
        fontSize:  16,
        color: '#FFA200',
    },
    activeCategoryText: {
        // Estilos para el texto de la categoría activa
        fontSize:  16,
        color: 'white',
    },
});
