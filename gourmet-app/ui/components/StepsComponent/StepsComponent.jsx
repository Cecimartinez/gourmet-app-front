import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button,  Icon } from "@rneui/themed";
import AddStepModal from '../AddStepModal';


const StepsComponent = ({ stepsArray, handleModalClose }) => {
    const [visible, setVisible] = useState(false);
    const [selectedStep, setSelectedStep] = useState(null);

    const openModal = (step) => {
        setSelectedStep(step);
        setVisible(true);
    };

    const handleCloseModal = ({ step, detail }) => {
        setVisible(false);
        handleModalClose({ step, detail });
    };
    
    useEffect(() => {
        setVisible(false);
    }, [stepsArray]);

    return (
        <View>
            <View style={styles.stepesContainerTitle}>
                <Text style={styles.title}>Pasos</Text>
                <View style={styles.rightContainer}>
                    <Button icon={<Icon name="add-circle-outline" />} radius="lg" color="white" onPress={() => openModal(null)} />
                </View>
            </View>
            <View style={styles.stepsContainer}>
                {stepsArray.map((step, index) => (
                    <TouchableOpacity key={index} onPress={() => openModal(step)}>
                        <View style={styles.formItem}>
                            <View>
                                <Text style={styles.campo}>{step.name}</Text>
                            </View>
                            <View>
                                <Text style={styles.campo}>{step.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <AddStepModal visible={visible} onClose={handleCloseModal} selectedStep={selectedStep} stepsArr={stepsArray}/>
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
