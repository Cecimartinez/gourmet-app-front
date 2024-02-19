import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TouchableCategory = ({ category, selectedCategories, setSelectedCategories }) => {


  const toggleCategory = () => {
    if (selectedCategories.includes(category.id)) {
      setSelectedCategories(selectedCategories.filter(catId => catId !== category.id));
    } else {
      setSelectedCategories([...selectedCategories, category.id]);
    }
  };

  return (
    <TouchableOpacity onPress={toggleCategory}>
      <View style={[styles.container, selectedCategories.includes(category.id) && styles.activeCategoryContainer]}>
        <Text style={[styles.categoryText, selectedCategories.includes(category.id) && styles.activeCategoryText]} >{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:15,
    marginBottom:15,
        marginHorizontal:  3,
        paddingVertical:  8,
        paddingHorizontal:  12,
        backgroundColor: '#F1F1F1',
        borderRadius:  20,
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
export default TouchableCategory;