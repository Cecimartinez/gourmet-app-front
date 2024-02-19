import { Button,  Icon,  Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
const AddIngredientModal = ({ visible, onClose, selectedIngredient }) => {
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [updatedIngredient, setUpdatedIngredient] = useState(false);
    const [buttonText, setButtonText] = useState('Agregar');

    useEffect(() => {
        if (selectedIngredient) {
            setIngredient(selectedIngredient.name);
            setAmount(selectedIngredient.cantidad);
            setUpdatedIngredient(true);
            setButtonText('Editar');
        } else {
            setIngredient('');
            setAmount('');
            setButtonText('Agregar');
            setUpdatedIngredient(false);
        }
    }, [visible, selectedIngredient]);

    const handleSubmit = () => {
        if (updatedIngredient) {
            onClose({ ingredient, amount, updatedIngredient });
        } else {
            onClose({ ingredient, amount });
        }
    };
    const handleSubmitEliminar = () => {
        setAmount('');
        setUpdatedIngredient('');
        onClose({ ingredient, amount: '', updatedIngredient });
    }

    return (
        <Modal visible={visible} onRequestClose={onClose} transparent>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button icon={<Icon name="close" />} onPress={onClose} color="#fff" radius="lg" />
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={ingredient} placeholder="Ingrediente" onChangeText={setIngredient} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Input value={amount} placeholder="Cantidad" onChangeText={setAmount} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={buttonText}
                            icon={<Icon name="add" color="#fff" />}
                            color="#FFA200"
                            radius="lg"
                            onPress={handleSubmit}
                            disabled={ingredient.trim() === '' || amount.trim() === ''}
                        />
                      {updatedIngredient && (   //para que solo se vea cuando es para editar un ingrediente
                            <Button
                                title="Eliminar"
                                icon={<Icon name="add" color="#FFF" />}
                                color="#FFA200"
                                radius="lg"
                                onPress={handleSubmitEliminar}
                            />
                        )}



                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,

    },
    content:{
        width: '90%',
        height: '50%',
        backgroundColor: '#fff',
        borderColor: '#E2E2E2',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width:  0,
            height:  1,
        },
        shadowOpacity:  2,
        shadowRadius:  1,
        borderWidth:  1,
    },
    formItem:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputContainer:{
        width: '50%',
    },
    legendContainer:{
        width: '30%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    legend:{
        fontSize: 10,
        fontWeight: 'bold',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'flex-end',
    }

})

export default AddIngredientModal;