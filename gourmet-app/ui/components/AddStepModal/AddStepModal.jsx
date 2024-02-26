import { Button,  Icon,  Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";

const AddStepModal = ({ visible, onClose, selectedStep }) => {
    const [step, setStep] = useState('');
    const [detail, setDetail] = useState('');
    const [updatedStep, setUpdateStep] = useState(false);
    const [buttonText, setButtonText] = useState('Agregar');


    useEffect(() => {
        if (selectedStep) {
            setStep(selectedStep.name);
            setDetail(selectedStep.description);
            setUpdateStep(true);
            setButtonText('Editar');

        } else {
            setStep('');
            setDetail('');
            setButtonText('Agregar');
            setUpdateStep(false);
        }
    }, [visible, selectedStep]);

    const handleSubmit = () => {
        // esto ver que onda
        if (updatedStep) {
            onClose({ step, detail, updatedStep });
        }
        onClose({ step, detail });
    };

    const handleSubmitEliminar = () => {
        setDetail('');
        setUpdateStep('');
        onClose({ step, detail: '', selectedStep });
    }


    return (
        <Modal visible={visible} onRequestClose={onClose} transparent>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button icon={<Icon name="close" />} onPress={onClose} color={"#fff"} radius="lg" />
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input value={step} placeholder="Paso" onChangeText={setStep} keyboardType="numeric"/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Input value={detail} placeholder="Detalle" onChangeText={setDetail} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={buttonText}
                            icon={<Icon name="add" color="#FFA200" />}
                            color="#FFA200"
                            radius="lg"
                            onPress={handleSubmit}
                            disabled={ detail.trim() === ''}
                        />
                        {selectedStep && (   //para que solo se vea cuando es para editar un ingrediente
                            <Button
                                title="Eliminar"
                                icon={<Icon name="add" color="#FFF" />}
                                color="#4ecb71"
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

export default AddStepModal;