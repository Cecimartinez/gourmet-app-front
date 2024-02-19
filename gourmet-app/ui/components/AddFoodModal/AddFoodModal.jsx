import { Button,  Icon,  Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";


const AddFoodModal = ({visible, onClose }) => {
    //dentro de route viene on close y visible
    //recomienda usar dos contenedores
    const [calories, setCalories] = useState('');
    const [name, setName] = useState('');
    const [portion, setPortion] = useState('');
    const [updatedFood, setUpdatedFood] = useState(false);

    //useEffect que funciona solo si visible cambia, osea se borra lo que ponemos en el input en la veaz anterior
    useEffect(() => {
        setCalories('');
        setName('');
        setPortion('');
    }, [visible])

    const handleSubmit = () => {
        
        //aqui se envia la informacion al padre
        onClose({calories, name, portion});
    }


    return(
        <Modal visible={visible} onRequestClose={onClose} transparent>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Button icon={<Icon name="close" />} onPress={onClose} color="#4ecb71" radius="lg" />
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={calories} onChangeText={(text) => setCalories(text)} />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Kcal</Text>
                        </View>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input  value={name} onChangeText={(text) => setName(text)} />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Nombre</Text>
                        </View>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={portion} onChangeText={(text) => setPortion(text)} />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Porcion</Text>
                        </View>
                        
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Add" icon={<Icon name="add" color="#FFF"></Icon>} 
                        color="#4ecb71" 
                        radius="lg"
                        onPress={handleSubmit}
                        disabled={calories.trim()=='' || name.trim()=='' || portion.trim()=='' } //si no hay nada deshabilita el boton
                        />
                    </View>
                   
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,


    },
    content:{
        width: '75%',
        height: '49%',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    formItem:{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputContainer:{
        width: '65%',
    },
    legendContainer:{
        width: '30%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    legend:{
        fontSize: 17,
        fontWeight: 'bold',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'flex-end',
    }

})

export default AddFoodModal;