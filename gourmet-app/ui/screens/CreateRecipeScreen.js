import React, {useState } from "react";
import { Button,  Icon,  Input } from "@rneui/themed";
import {  View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import TouchableCategory from "../components/TouchableCategory/TouchableCategory";
import IngredientesComponent from "../components/IngredientesComponent/IngredientesComponent";
import { ImagePicker } from 'expo';
import StepsComponent from "../components/StepsComponent/StepsComponent";
import { StatusBar } from 'expo-status-bar'

const CreateRecipeScreen = () => {
    const [calories, setCalories] = useState('');
    const [carbohidratos, setCarbohidratos] = useState('');
    const [proteinas, setProteinas] = useState('');
    const [grasas, setGrasas] = useState('');
    const [sodio, setSodio] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [nutritionalInfo, setNutritionalInfo] = useState([ ]);
    const [pasos, setPasos] = useState([]);
    const ingredientesArray = [ {id: 1, name: 'Tomate', cantidad:"2"}, {id: 2, name: 'Lechuga', cantidad : "1"}, {id: 3, name: 'Cebolla', cantidad : "3"}, {id: 4, name: 'Azucar',cantidad : "100g"}]
    const nutritionalInformation = [ {id: 1, name: 'Calorias', value: "100"}, {id: 2, name: 'Proteinas', value: "10"}, {id: 3, name: 'Grasas', value: "5"}, {id: 4, name: 'Carbohidratos', value: "20"}]
    const pasosReceta= [ {id: 1, name: '1', description: "Cortar el tomate"}, {id: 2, name: '2', description: "Cortar la lechuga"}, {id: 3, name: '3', description: "Cortar la cebolla"}, {id: 4, name: '4', description: "Cortar el pepino"}]
    const arrayPhotos=[
        null, // Elemento vacío al principio para centrar la primera imagen
        "https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187701_1706x960.jpg",
        "https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187701_1706x960.jpg",
    ]
    const categoriesArray = [ {id: 1, name: 'Vegetariana'}, {id: 2, name: 'Gluten Free'}, {id: 3, name: 'Cena'}, {id: 4, name: 'Postre'},{id: 5, name: 'Mediteranea'}, {id: 6, name: 'Vegana'}, {id: 7, name: 'Sin TACC'}, {id: 8, name: 'Celiaca'}]
    const [visible, setIsVisible] = useState(false);
    
    const handleIngredientModalClose = ({ ingredient, amount, updatedIngredient }) => {
        if (updatedIngredient) {
            // Si el ingrediente se actualizó, actualiza el estado del ingrediente existente
            const updatedIngredients = ingredients.map(item =>
                item.id === updatedIngredient.id ? { ...item, name: ingredient, cantidad: amount } : item
            );
            setIngredients(updatedIngredients);
        } else if (amount !== '') {
            // Si la cantidad no está vacía, actualiza o agrega un nuevo ingrediente
            const existingIngredientIndex = ingredients.findIndex(item => item.name === ingredient);
            if (existingIngredientIndex !== -1) {
                // Si se encuentra un ingrediente existente con el mismo nombre, actualizarlo
                const updatedIngredients = [...ingredients];
                updatedIngredients[existingIngredientIndex] = { ...updatedIngredients[existingIngredientIndex], cantidad: amount };
                setIngredients(updatedIngredients);
            } else {
                // Si es un nuevo ingrediente, crea un nuevo objeto con un id único
                const newIngredient = { id: ingredients.length + 1, name: ingredient, cantidad: amount };
                setIngredients([...ingredients, newIngredient]);
            }
        } else {
            // Si la cantidad está vacía, elimina el ingrediente del estado
            const filteredIngredients = ingredients.filter(item => item.name !== ingredient);
            setIngredients(filteredIngredients);
        }
    };
    
    const [stepVisible, setStepIsVisible] = useState(false);
    
    const handleStepModalClose = ({ step, detail, updatedStep }) => {
        if (updatedStep) {
            // Si el paso se actualizó, actualiza el estado del paso existente
            const updatedSteps = pasos.map(item =>
                item.id === updatedStep.id ? { ...item, name: step, description: detail } : item
            );
            setPasos(updatedSteps);
        } else if (detail !== '') {
            // Si el detalle no está vacío, actualiza o agrega un nuevo paso
            const existingStepIndex = pasos.findIndex(item => item.name === step);
            if (existingStepIndex !== -1) {
                // Si se encuentra un paso existente con el mismo nombre, actualizarlo
                const updatedSteps = [...pasos];
                updatedSteps[existingStepIndex] = { ...updatedSteps[existingStepIndex], description: detail };
                setPasos(updatedSteps);
            } else {
                // Si es un nuevo paso, crea un nuevo objeto con un id único
                const newStep = { id: pasos.length + 1, name: step, description: detail };
                setPasos([...pasos, newStep]);
            }
        } else {
            // Si el detalle está vacío, elimina el paso del estado
            const filteredSteps = pasos.filter(item => item.name !== step);
            setPasos(filteredSteps);
        }
    };
    

    const [selectedCategories, setSelectedCategories] = useState([]);

    const selectImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result.uri);
            // Aquí puedes manejar la imagen seleccionada, como mostrarla en tu interfaz de usuario
        }
    };

    const takePhotoHandler = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result.uri);
            // Aquí puedes manejar la foto tomada, como mostrarla en tu interfaz de usuario
        }
    };

    return(
        <View style={styles.container}>
        <StatusBar style='dark'/>
            <ScrollView style={{marginTop: 50}}
                        contentContainerStyle={{ paddingBottom: 100}}
                        showsVerticalScrollIndicator={false}
            
            >
            <Text style={{color:"#FFA200", fontSize:18, fontWeight:"500", paddingLeft:10}} >Create Recipe</Text>
                <View style={styles.containerScrollView}>
                    <ScrollView style={{ flex: 1 }}
                        horizontal
                        contentContainerStyle={styles.imageContainer}
                        showsHorizontalScrollIndicator={false}>
                        {arrayPhotos.map((photo, index) => (
                        <Image key={index} source={{ uri: photo }} style={styles.image} />
                        ))}
                        <Button 
                            icon={<Icon name= "add-circle-outline" size={30} />}
                            color={'white'}
                            style={[styles.addImageButtom, { backgroundColor: 'transparent' }]}  
                            onPress={takePhotoHandler}
                        />
                        <Image source={{ uri: "null" }} style={styles.image} />

                    </ScrollView>
                </View>
            <View style={styles.infoContainer}>
                <View style={styles.formItem}>
                    <Input style={{fontSize:15}} value={name} placeholder="Name" onChangeText={(text) => setName(text)} />
                </View>
                <View style={styles.formItem}>
                    <Input style={{fontSize:15}}  value={description} placeholder="Descripción" onChangeText={(text) => setDescription(text)} />
                </View>
                <View style={styles.formItem}>
                    <Input style={{fontSize:15}} value={videoURL} placeholder="URL del video" onChangeText={(text) => setVideoURL(text)} />
                </View>
            </View>
            <View style={styles.categoriesContainer}>
                <Text style={styles.title}>Categorías</Text>
                <View style={{flex:1}}>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.scrollViewContent}
                    showsHorizontalScrollIndicator={false}
                >
                    {categoriesArray.map((category, index) => (
                        <TouchableCategory key={index} category={category} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />                  
                    ))}
                </ScrollView>

                </View>
            </View>
            <View style={styles.nutritionalInfo}>
                <Text style={styles.title}>Informacion nutricional</Text>
                    <View style={styles.nutritionalInfoContainer}>
                        <View style={styles.formItem}>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>Calorias</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Input value={calories} onChangeText={(text) => setCalories(text)} />
                            </View>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>Kcal</Text>
                            </View>
                        </View>
                        <View style={styles.formItem}>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>Carbohidratos</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Input  value={name} onChangeText={(text) => setCarbohidratos(text)} />
                            </View>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>g</Text>
                            </View>
                        </View>
                        <View style={styles.formItem}>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>Grasas</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Input  value={name} onChangeText={(text) => setGrasas(text)} />
                            </View>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>g</Text>
                            </View>
                        </View>
                        <View style={styles.formItem}>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>Proteinas</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Input  value={name} onChangeText={(text) => setProteinas(text)} />
                            </View>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>g</Text>
                            </View>
                        </View>
                        <View style={styles.formItem}>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>Sodio</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Input  value={name} onChangeText={(text) => setSodio(text)} />
                            </View>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>mg</Text>
                            </View>
                        </View>
                          
                    </View>
                    
            </View>

            <IngredientesComponent ingredientesArray={ingredients} handleModalClose={handleIngredientModalClose} />

            <StepsComponent stepsArray={pasos}   handleModalClose={handleStepModalClose}     />


            </ScrollView>   


        </View>

    )

        }

const styles = StyleSheet.create({
    container:{
        paddingTop: 10,
        paddingLeft: 10,
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    infoContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    containerScrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      imageContainer: {
        flexDirection: 'row',
        marginHorizontal: 38,
      },
      image: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
        borderRadius: 50, // para hacer que la imagen sea circular
      },
      addImageButtom:{
        width: 100,
        height: 100,
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 50, // para hacer que la imagen sea circular
        backgroundColor: 'orange',
      },
      scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
      },
 
    legendContainer:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },

    title:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10
    },

    nutritionalInfoContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    nutritionalInfo:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
    },
    ingredientsContainer:{
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 40,
    },
    rightContainerCerrar:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    formItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
    },
    inputContainer:{
        width: '18%',
    },

}
)
export default CreateRecipeScreen