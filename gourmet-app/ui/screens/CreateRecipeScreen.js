import React, { useState, useRef  } from "react";
import { Button,  Icon,  Input } from "@rneui/themed";
import {  View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import TouchableCategory from "../components/TouchableCategory/TouchableCategory";
import IngredientesComponent from "../components/IngredientesComponent/IngredientesComponent";
import StepsComponent from "../components/StepsComponent/StepsComponent";
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';



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
    const [imagesArray, setImagesArray] = useState([]);
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



    // componente seleccionar sacar foto o galeria 
    const [imageUri, setImageUri] = useState(null);
    
    const actionSheetRef = useRef(null);

     // manejo de action sheet
    const openActionSheet = () => {
        actionSheetRef.current.show();
    };

    // Funcion manejo selección del ActionSheet
    const handleActionSheet = (index) => {
        if (index === 0) {
        // Tomar foto
        takeImage();
        } else if (index === 1) {
        // Elegir de la galería
        pickImage();
        }
    };
    
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

    /**
     * 
     *              POST
     * 
     * 
     */
    const handleCreateRecipe = async () => {
        try {
            // Construir el objeto de datos de la receta
            const recipeData = {
                 title: name,
                 description: description,
                 ingredients: ingredients.map(ingredient => ({ name: ingredient.name, quantity: +ingredient.cantidad })),
                 instructions: pasos.map(step => step.description),
                 user: "64a60d14592f32e512ada278", //  MUY IMPORTANTE 
                photo: imagesArray.filter(photo => photo !== null),
                 requiredTime: 20, // Este valor puede ser ajustado según tus necesidades
                 portion: 2, // Este valor puede ser ajustado según tus necesidades
                 hashtag: "Ensalada", // Este valor puede ser ajustado según tus necesidades
                  calorie: +calories,
                  fat: +grasas,
                  protein: +proteinas,
              

                rating: 4.9, // Este valor puede ser ajustado según tus necesidades
                sodium: +sodio, // Asumo que este valor está disponible en tu interfaz de usuario para que el usuario lo ingrese
                like: 0, // Puedes inicializarlo en 0 o ajustarlo según tus necesidades
                video: videoURL // Asumo que este valor está disponible en tu interfaz de usuario para que el usuario lo ingrese
             };
             const stringified = JSON.stringify(recipeData)
            const json = JSON.parse(stringified)
            console.log("json:",json)
            // const recipeData = {
            //     title: "Ensalada César dos",
            //     description: "Una deliciosa ensalada clásica con aderezo César.",
            //     ingredients: [
            //         { name: "Lechuga romana", quantity: 200 },
            //         { name: "Pollo a la parrilla", quantity: 150 },
            //         { name: "Pan tostado", quantity: 50 },
            //         { name: "Queso parmesano", quantity: 50 },
            //         { name: "Aderezo César", quantity: 50 }
            //     ],
            //     instructions: [
            //         "Lavar y cortar la lechuga romana.",
            //         "Cocinar el pollo a la parrilla y cortarlo en tiras.",
            //         "Tostar el pan y cortarlo en cubos.",
            //         "Mezclar la lechuga, el pollo, el pan tostado y el queso parmesano en un tazón grande.",
            //         "Agregar el aderezo César y mezclar bien.",
            //         "Servir frío y disfrutar."
            //     ],
            //     user: "64a60d14592f32e512ada278",
            //     photo: [
            //         "https://res.cloudinary.com/dy7r9rbsj/image/upload/v1708390382/Gourmet-app/xjtwnhovsqwfz2mdzcqd.jpg",
            //         "https://res.cloudinary.com/dy7r9rbsj/image/upload/v1708390434/Gourmet-app/s5osphvphvtora4fggx1.jpg"
            //     ],
            //     requiredTime: 20,
            //     portion: 2,
            //     hashtag: "Ensalada",
            //     calorie: 350,
            //     fat: 15,
            //     protein: 30,
            //     rating: 4.9,
            //     sodium: 25,
            //     like: 235,
            //     video: "youtube.com/ensalada_cesar"
            // };

            // Realizar la solicitud POST al servidor
            const response = await fetch('https://ad-backend-production.up.railway.app/api/recipes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipeData)
            });
                console.log("body:",JSON.stringify(recipeData))
            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                // Si la respuesta es exitosa, puedes manejar el resultado aquí
                console.log('Receta creada exitosamente');
            } else {
                // Si la respuesta no fue exitosa, maneja el error
                console.error('Error al crear la receta:', response.status);
            }
        } catch (error) {
            console.error('Error al crear la receta:', error);
        }
    };


    /**
     * 
     * 
     *    MANEJO DE IMAGENES
     * 
     * 
     */

    
  
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [cameraPermission, setCameraPermission] = useState(false);

     const getCameraPermission = async () => {
          console.log("pide permiso")
        //   const { status } = await Permissions.requestAsync(Permissions.CAMERA);
        requestPermission();
          if (status !== 'granted') {
              alert('Se requieren permisos de cámara para tomar fotos.');
         }
         console.log("status:",status)
         setCameraPermission(status === 'granted');
         console.log("cameraPermission:",cameraPermission)
     };

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [image, setImage] = useState("");

    const takeImage = async () => {
        console.log("entra a take image")
        getCameraPermission();
        console.log(status)
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsMultipleSelection: false
        });
    
        console.log("saca FOTO")
        console.log(result);
        
        setImagesArray([...imagesArray, result.assets[0].uri]);
        console.log("imagesArray en take image",imagesArray)

    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };


    
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
        orderedSelection: true,
        selectionLimit: 10,
  
      });
      console.log("saca FOTO")
      console.log(result);
      setImagesArray([...imagesArray, result.assets[0].uri]);

  
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    };
  
    
    
   
    
  
    const toggleCamera = () => {
      setIsCameraOpen(!isCameraOpen);
    };
  
    if(isCameraOpen) return <CameraComponent hideToggleSetter={setIsCameraOpen} allowImageSet={false} _cb={setImage}/>
  


    const pickImageExample = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
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
            {/* <View style={styles.containerScrollView}>
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
            </View> */}
            <View style={styles.container}>
            <View style={styles.containerScrollView}>
                <ScrollView
                style={{ flex: 1 }}
                horizontal
                contentContainerStyle={styles.imageContainer}
                showsHorizontalScrollIndicator={false}
                >
                {/* {arrayPhotos.map((photo, index) => (
                    <Image key={index} source={{ uri: photo }} style={styles.image} />
                ))} */}
                {imagesArray.map((photo, index) => (
                        console.log("pgoto",photo),
                        console.log("imagenesArray",imagesArray),
                    <Image key={index} source={{ uri: photo }} style={styles.image}  />
                ))}
                <Button
                    icon={<Icon name="add-circle-outline" size={30} />}
                    color={'white'}
                    style={[styles.addImageButtom, { backgroundColor: 'transparent' }]}
                    onPress={openActionSheet} // Llama a la función openActionSheet al presionar el botón
                />
                <Image source={{ uri: "null" }} style={styles.image} />
                </ScrollView>
            </View>

            {/* ActionSheet */}
            <ActionSheet
                ref={actionSheetRef}
                title={'Elige una opción'}
                options={['Tomar foto', 'Elegir de la galería', 'Cancelar']}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={handleActionSheet}
            />
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
                            <Input value={calories} onChangeText={(text) => setCalories(text)} keyboardType="numeric" />
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
                            <Input value={carbohidratos} onChangeText={(text) => setCarbohidratos(text)} keyboardType="numeric" />
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
                            <Input value={grasas} onChangeText={(text) => setGrasas(text)} keyboardType="numeric" />
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
                            <Input value={proteinas} onChangeText={(text) => setProteinas(text)} keyboardType="numeric" />
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
                            <Input value={sodio} onChangeText={(text) => setSodio(text)} keyboardType="numeric" />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>mg</Text>
                        </View>
                    </View>
                </View>
            </View>
            <IngredientesComponent ingredientesArray={ingredients} handleModalClose={handleIngredientModalClose} />

            <StepsComponent stepsArray={pasos}   handleModalClose={handleStepModalClose}     />

            <Button onPress={handleCreateRecipe}>Create Recipe</Button>

            <View style={styles.container}>
                <Text style={styles.title}>Cargar foto</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.col2} onPress={takeImage}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>Tomar Foto</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.col2} onPress={pickImage}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>Elegir Fotos</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                {/* Use a light status bar on iOS to account for the black space above the modal
                <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
            </View>




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
    buttomView:{
            width: "90%",
            height: 350,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10
        
    },
}
)
export default CreateRecipeScreen