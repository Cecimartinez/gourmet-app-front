import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button,  Icon } from "@rneui/themed";
import AddStepModal from '../AddStepModal';
const StepsComponent = ({ stepsArray, handleModalClose }) => {
    const [visible, setVisible] = useState(false);
    const [selectedStep, setSelectedStep] = useState(null);

    // Ordenar los pasos por número de paso
    const sortedStepsArray = [...stepsArray].sort((a, b) => a.number - b.number);

    const openModal = (step) => {
        setSelectedStep(step);
        setVisible(true);
    };

    const openModalNew = () => {
        setSelectedStep(null); // Establecer selectedStep como null para indicar que se está agregando un nuevo paso
        setVisible(true);
    };

    const handleCloseModal = ({ step, detail }) => {
        setVisible(false);
        handleModalClose({ step, detail });
    };

    useEffect(() => {
        setVisible(false);
    }, [stepsArray]);

    // Obtener el siguiente número de paso disponible
    const getNextStepNumber = () => {
        const maxNumber = sortedStepsArray.length > 0 ? sortedStepsArray[sortedStepsArray.length - 1].number : 0;
        return maxNumber + 1;
    };

    return (
        <View>
            <View style={styles.stepsContainerTitle}>
                <Text style={styles.title}>Pasos</Text>
                <View style={styles.rightContainer}>
                    <Button icon={<Icon name="add-circle-outline" />} radius="lg" color="white" onPress={openModalNew} />
                </View>
            </View>
            <View style={styles.stepsContainer}>
                {sortedStepsArray.map((step, index) => (
                    <TouchableOpacity key={index} onPress={() => openModal(step)}>
                        <View style={styles.formItem}>
                            <View>
                                <Text style={styles.campo}>{index}</Text> 
                            </View>
                            <View>
                                <Text style={styles.campo}>{step.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <AddStepModal visible={visible} onClose={handleCloseModal} selectedStep={selectedStep} nextStepNumber={getNextStepNumber()} stepsArr={stepsArray} />
        </View>
    );
};


const styles = StyleSheet.create({
    stepesContainerTitle:{
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
    rightContainerCerrar:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    formItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    campo:{
        fontSize: 15,
        marginHorizontal: 30,
    },
    inputContainer:{
        width: '50%',
    },
    stepsContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 40,
    },
})

export default StepsComponent;
