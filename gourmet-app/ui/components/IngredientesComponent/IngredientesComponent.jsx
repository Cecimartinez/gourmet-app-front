import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddIngredientModal from '../AddIngredientModal';
import { Button,  Icon } from "@rneui/themed";

const IngredientesComponent = ({ ingredientesArray, handleModalClose }) => {
    const [visible, setVisible] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const openModal = (ingredient) => {
        setSelectedIngredient(ingredient);
        setVisible(true);
    };

    const handleCloseModal = ({ ingredient, amount }) => {
        setVisible(false);
        setSelectedIngredient(null);
        handleModalClose({ ingredient, amount });
    };

    useEffect(() => {
        setVisible(false);
    }, [ingredientesArray]);

    return (
        <View>
            <View style={styles.ingredientesContainerTitle}>
                <Text style={styles.title}>Ingredientes</Text>
                <View style={styles.rightContainer}>
                    <Button icon={<Icon name="add-circle-outline" />} radius="lg" color="#fff"  onPress={() => openModal(null)} />
                </View>
            </View>
            <View style={styles.ingredientsContainer}>
                {ingredientesArray.map((ingredient, index) => (
                    // Asegúrate de envolver el View en TouchableOpacity
                    <TouchableOpacity style={marginBottom=10 } key={index} onPress={() => openModal(ingredient)}>
                        <View style={styles.formItem}>
                            <View>
                                <Text style={styles.campo}>{ingredient.name}</Text>
                            </View>
                            <View>
                                <Text style={styles.campo}>{ingredient.cantidad}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <AddIngredientModal visible={visible} onClose={handleCloseModal} selectedIngredient={selectedIngredient} ingredientesArr={ingredientesArray}/>
        </View>
    );
};

const styles = StyleSheet.create({
    ingredientesContainerTitle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    title:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10
    },
    formItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    campo:{
        fontSize: 17,
        marginHorizontal: 30,
    },
    inputContainer:{
        width: '50%',
    },
    ingredientsContainer:{
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 40,
            marginRight: 40,
        },
})

export default IngredientesComponent;
