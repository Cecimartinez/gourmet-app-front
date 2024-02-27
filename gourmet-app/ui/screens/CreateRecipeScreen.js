import React, { useState, useRef, useEffect  } from "react";
import { Button,  Icon,  Input } from "@rneui/themed";
import {  View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import TouchableCategory from "../components/TouchableCategory/TouchableCategory";
import IngredientesComponent from "../components/IngredientesComponent/IngredientesComponent";
import StepsComponent from "../components/StepsComponent/StepsComponent";
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';



const CreateRecipeScreen = ({route : route}) => {
    
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
    const [cantidadPasos, setCantidadPasos] = useState(0);
    const [requiredTime, setRequiredTime] = useState(0);
   
    const categoriesArray = [ {id: 1, name: 'Vegetariana'}, {id: 2, name: 'Gluten Free'}, {id: 3, name: 'Cena'}, {id: 4, name: 'Postre'},{id: 5, name: 'Mediteranea'}, {id: 6, name: 'Vegana'}, {id: 7, name: 'Sin TACC'}, {id: 8, name: 'Celiaca'}]

    // esto estaba cuando funcionaba antes de params edit
    //useEffect(() => {
    //     setImagesArray([])
    //     setError(null); //  Esto no se si esta bien ojo 

    // }, [])



    const [isEditing, setIsEditing] = useState(false);
    const [recipeId, setRecipeId] = useState(null);

    // Verificar si se ha pasado un ID como parámetro
    useEffect(() => {
        // console.log(" ANTES route.params:",route.params)
        // console.log("DESPUES route.params.id:",route.params.id)
        if (route.params && route.params.id) {
            // Si se pasa un ID, establecer el estado correspondiente y almacenar el ID de la receta
            setIsEditing(true);
            setRecipeId(route.params.id);
            console.log("toma como que esta editando")
            console.log("en primer use effect recipeId:",recipeId)
            fetchRecipeDetails(route.params.id);
            route.params.id = null;
        }else {
        setImagesArray([])
        setIsEditing(false);
        setError(null); //  Esto no se si esta bien ojo 
        console.log("toma como que no esta editando")
        }
      
    }, [route.params]);



    

        const [recipeDetails, setRecipeDetails] = useState({
            name: '',
            description: '',
            calories: 0,
            carbohidratos: 0,
            proteinas: 0,
            grasas: 0,
            sodio: 0,
            ingredients: [],
            steps: [],

        });
    
        // useEffect(() => {
        //     if (recipeId!==null ) {
        //         fetchRecipeDetails(recipeId);
        //     }
        //     //console.log("USE EFFECT FETCH RECIPES route.params.id:",route.params.id)
        //     console.log(" USE EFFECT FETCH RECIPES  route.params:",route.params)
        //     console.log(" USE EFFECT FETCH RECIPES  recipeId:",recipeId)
            
        // }, [route.params]);
        

    const fetchRecipeDetails = async (recipeIdd) => {
        try {
            console.log("entra a fetch recipe details")
            console.log("en primer use effect recipeId:",recipeIdd)

            const response = await fetch(`https://ad-backend-production.up.railway.app/api/recipes/${recipeIdd}`);
            if (response.ok) {
                const recipeData = await response.json();
               
                setIngredients(recipeData.ingredients); //ok
                setDescription(recipeData.description);//ok
                //setPasos(recipeData.steps);
                //setCarbohidratos(recipeData.carbohidratos);
                setImagesArray(recipeData.photo);
                setCategories(recipeData.category); //ok
                setVideoURL(recipeData.video);//ok
                // setPasos(recipeData.instructions);//ok
                //setCalories(parseFloat(recipeData.calorie));
                setCalories(recipeData.calorie)
                if (recipeData.requiredTime) {
                    setRequiredTime(recipeData.requiredTime);                
                }
                setGrasas(parseFloat(recipeData.fat));
                setProteinas(parseFloat(recipeData.protein));
                setSodio(parseFloat(recipeData.sodium));
                setName(recipeData.title);
                setCarbohidratos(parseFloat(recipeData.carbohydrates));
                // Suponiendo que `recipeData.ingredients` es el array de ingredientes recibido del backend
                const transformedIngredients = recipeData.ingredients.map(ingredient => ({
                    name: ingredient.name,
                    cantidad: ingredient.quantity
                }));

                const transformedSteps = recipeData.instructions.map((instruction, index) => ({
                    name: index + 1, // El nombre del paso será un número
                    description: instruction // La descripción del paso es la instrucción recibida del backend
                }));
                
                // Ahora `transformedSteps` es un array de objetos con el formato { name: number, description: string }
                // Puedes establecerlo en el estado `pasos`
                setPasos(transformedSteps);
                
                // Ahora `transformedIngredients` es un array de objetos con la forma { name: cantidad }
                // Puedes establecerlo en el estado ingredients
                setIngredients(transformedIngredients);

               

            } else {
                console.error('Error al obtener los detalles de la receta:', response.status);
            }
        } catch (error) {
            console.error('Error al obtener los detalles de la receta:', error);
        }
    };

    const handleRecipeFieldChange = (fieldName, value) => {
        setRecipeDetails(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const handleCreateOrEditRecipe = () => {
        console.log('Detalles de la receta:', recipeDetails);
    };


    
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
    
    const handleIngredientModalClose = ({ ingredient, cantidad, updatedIngredient }) => {
        if (updatedIngredient) {
            // Si el ingrediente se actualizó, actualiza el estado del ingrediente existente
            const updatedIngredients = ingredients.map(item =>
                item.id === updatedIngredient.id ? { ...item, name: ingredient, cantidad: cantidad } : item
            );
            setIngredients(updatedIngredients);
        } else if (cantidad !== '') {
            // Si la cantidad no está vacía, actualiza o agrega un nuevo ingrediente
            const existingIngredientIndex = ingredients.findIndex(item => item.name === ingredient);
            if (existingIngredientIndex !== -1) {
                // Si se encuentra un ingrediente existente con el mismo nombre, actualizarlo
                const updatedIngredients = [...ingredients];
                updatedIngredients[existingIngredientIndex] = { ...updatedIngredients[existingIngredientIndex], cantidad: cantidad };
                setIngredients(updatedIngredients);
            } else {
                // Si es un nuevo ingrediente, crea un nuevo objeto con un id único
                const newIngredient = { id: ingredients.length + 1, name: ingredient, cantidad: cantidad };
                setIngredients([...ingredients, newIngredient]);
            }
        } else {
            // Si la cantidad está vacía, elimina el ingrediente del estado
            const filteredIngredients = ingredients.filter(item => item.name !== ingredient);
            setIngredients(filteredIngredients);
        }
    };
    
    
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
                
                const newStep = { name: pasos.length+1, description: detail };
                setPasos([...pasos, newStep]);
                setCantidadPasos(pasos.length + 1)
                
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

        if (!result.canceled) {
            console.log(result.uri);
            // Aquí puedes manejar la imagen seleccionada, como mostrarla en tu interfaz de usuario
        }
    };



    /**
     * 
     *              POST
     * 
     * 
     */

    const [loading, setLoading] = useState(false);
    const [recipeCreated, setRecipeCreated] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateRecipe = async () => {
        try {
            setLoading(true); // Comenzar la carga
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
                category: selectedCategories,

                rating: 4.9, // Este valor puede ser ajustado según tus necesidades
                sodium: +sodio, // Asumo que este valor está disponible en tu interfaz de usuario para que el usuario lo ingrese
                like: 0, // Puedes inicializarlo en 0 o ajustarlo según tus necesidades
                video: videoURL // Asumo que este valor está disponible en tu interfaz de usuario para que el usuario lo ingrese
             };
             const stringified = JSON.stringify(recipeData)
            const json = JSON.parse(stringified)
           
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
            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                // Si la respuesta es exitosa, puedes manejar el resultado aquí
                setRecipeCreated(true);
            } else {
                // Si la respuesta no fue exitosa, maneja el error
                console.error('Error al crear la receta:', response.status);
                setError('Error al crear la receta: ' + response.status);
            }
        } catch (error) {
            console.error('Error al crear la receta:', error);
            setError('Error al crear la receta: ' + error.message);
        } finally {
            setLoading(false); // Finalizar la carga, independientemente del resultado
        }
    };


    const handleDeleatRecipe = async () => {
        try {
            setLoading(true); // Comenzar la carga
            // Realizar la solicitud DELETE al servidor
            //const response = await fetch(`https://ad-backend-production.up.railway.app/api/recipes/${recipeId}`, {
            const response = await fetch(`https://ad-backend-production.up.railway.app/api/recipes/${recipeId}`, {
                method: 'DELETE'
            });
            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                // Si la respuesta es exitosa, puedes manejar el resultado aquí
                setRecipeCreated(true);
            } else {
                // Si la respuesta no fue exitosa, maneja el error
                console.error('Error al eliminar la receta:', response.status);
                setError('Error al eliminar la receta: ' + response.status);
            }
        } catch (error) {
            console.error('Error al eliminar la receta:', error);
            setError('Error al eliminar la receta: ' + error.message);
        } finally {
            setLoading(false); // Finalizar la carga, independientemente del resultado
        }
    };


    const handleCreateRecipeWithPhoto = async () => {
        try {
            setLoading(true); // Comenzar la carga
            
            const formData = new FormData();
    
            // Agrega los datos de la receta al FormData
            formData.append('title', name);
            formData.append('description', description);
            formData.append('user', "64a60d14592f32e512ada278"); //  MUY IMPORTANTE 
            formData.append('requiredTime', "20"); 
            formData.append('portion', "2"); 
            formData.append('hashtag', "Ensalada"); 
            //formData.append('calorie', "2");
            formData.append('calorie', calories.toString());
            //console.log("requiredTime:",requiredTime.toString())
            //formData.append('requiredTime', requiredTime.toString());

            //formData.append('fat', "2");
            formData.append('fat', grasas.toString());
            //formData.append('protein', "3");
            formData.append('protein', proteinas.toString());
             formData.append('category', JSON.stringify(categories)); 
            formData.append('rating', "4.9"); 
            formData.append('sodium', "3"); 
            formData.append('video', videoURL); 
            // formData.append('instructions',JSON.stringify(["nada","nada2"]));
            // formData.append('ingredients',JSON.stringify([{"name":"algo","quantity":5},{"name":"algo2","quantity":10}]));

              // Agrega los ingredientes al FormData
              let newIngredients = [];
                // ingredients.forEach((ingredient, index) => {
                //     newIngredients.push({ name: ingredient.name, quantity: ingredient.cantidad.toString() });
                // });

                ingredients.forEach((ingredient, index) => {
                    let cantidad = ingredient.cantidad != null ? ingredient.cantidad.toString() : ''; // Si es null o undefined, asigna una cadena vacía
                    console.log("ingediente cantidad:",cantidad)
                    newIngredients.push({ name: ingredient.name, quantity: cantidad });
                });
                
                let newSteps = [];
                pasos.forEach((step, index) => {
                    newSteps.push( step.description );
                });

            //   ingredients.forEach((ingredient, index) => {
            //       formData.append(JSON.stringify({ name: ingredient.name, quantity: ingredient.cantidad.toString() }));
            //   });
                formData.append('ingredients',JSON.stringify(newIngredients));
                formData.append('instructions',JSON.stringify(newSteps));

             
    
            // Agrega las imágenes al FormData
            imagesArray.forEach((photo, index) => {
                if (photo !== null) {
                    formData.append(`photo`, {
                        uri: photo,
                        type: 'image/jpeg',
                        name: `photo${index}.jpg`,
                    });
                }
            });
            let response;
            if(isEditing==false){
                    console.log("-------MANDA Post")

                    // Realizar la solicitud POST al servidor
                     response = await fetch('https://ad-backend-production.up.railway.app/api/recipes/recipeWithPhoto', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "multipart/form-data",
                        },
                    });
            }else{              
                // Realizar la solicitud POST al servidor
                if( route.params && route.params.id){
                    setRecipeId(route.params.id)
                }
                console.log("-------MANDA PATCH")   //automatizar este id
                response = await fetch(`https://ad-backend-production.up.railway.app/api/recipes/recipeWithPhoto/${recipeId}`,
                {
                    method: 'PATCH',
                    body: formData,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                });
               
            }

    
            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                // Si la respuesta es exitosa, puedes manejar el resultado aquí
                setRecipeCreated(true);
            } else {
                // Si la respuesta no fue exitosa, maneja el error
                console.error('Error al crear la receta:', response.status);
                setError('Error al crear la receta: ' + response.status);
            }
        } catch (error) {
            console.error('Error al crear la receta:', error);
            setError('Error al crear la receta: ' + error.message);
        } finally {
            setLoading(false); // Finalizar la carga, independientemente del resultado
        }
    };
    


    const handleCloseError = () => {
        setError(null); // Limpiar el estado de error al cerrar el mensaje
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
        //   const { status } = await Permissions.requestAsync(Permissions.CAMERA);
        requestPermission();
          if (status !== 'granted') {
              alert('Se requieren permisos de cámara para tomar fotos.');
         }
         setCameraPermission(status === 'granted');
     };

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [image, setImage] = useState("");

    const takeImage = async () => {
        getCameraPermission();
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsMultipleSelection: false
        });
    
        
        
        setImagesArray([...imagesArray, result.assets[0].uri]);

    
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
      
      setImagesArray([...imagesArray, result.assets[0].uri]);

  
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    };
  
    
    
   
    
  
    if(isCameraOpen) return <CameraComponent hideToggleSetter={setIsCameraOpen} allowImageSet={false} _cb={setImage}/>
  

    //eliminar la imagen
    const handleImagePress = (index) => {
        // Crear una copia del array de imágenes sin la imagen en el índice dado
        const newArray = imagesArray.filter((_, i) => i !== index);
        setImagesArray(newArray);
    };

    const handleCancelar = () => {
        setImagesArray([])
        setIsEditing(false);
        setError(null); //  Esto no se si esta bien ojo 
        setCalories('');
        setCarbohidratos('');
        setProteinas('');
        setGrasas('');
        setSodio('');
        setRequiredTime('');
        setName('');
        setDescription('');
        setVideoURL('');
        setCategories([]);
        setImagesArray([]);
        setIngredients([]);
        setNutritionalInfo([ ]);
        setPasos([]);
        setCantidadPasos(0);
        setRecipeId(null);
    }

    const handleImprimirEstados = () => {
        console.log(" handleImprimirEstados is Editing:",isEditing)
        console.log(" handleImprimirEstados recipeId:",recipeId)
    }

    
    return(
        <View style={styles.container}>
        

           
        <StatusBar style='dark'/>
        <ScrollView style={{marginTop: 50}}
                    contentContainerStyle={{ paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
        >
            <Text style={{color:"#FFA200", fontSize:18, fontWeight:"500", paddingLeft:10}} >Create Recipe</Text>
            
            <View style={styles.container}>
            <View style={styles.containerScrollView}>
                <ScrollView
                        style={{ flex: 1 }}
                        horizontal
                        contentContainerStyle={styles.imageContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        {imagesArray.map((photo, index) => (
                            <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                                <Image source={{ uri: photo }} style={styles.image} />
                            </TouchableOpacity>
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
                 <View style={styles.formItem}>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>tiempo requerido</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Input value={requiredTime.toString()} onChangeText={(text) => setRequiredTime(text)} keyboardType="numeric" />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>min</Text>
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
                            <Input value={calories.toString()} onChangeText={(text) => setCalories(text)} keyboardType="numeric" />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Kcal</Text>
                        </View>
                    </View>
                    
                    <View style={styles.formItem}>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Grasas</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Input value={grasas.toString()} onChangeText={(text) => setGrasas(text)} keyboardType="numeric" />
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
                            <Input value={proteinas.toString()} onChangeText={(text) => setProteinas(text)} keyboardType="numeric" />
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
                            <Input value={sodio.toString()} onChangeText={(text) => setSodio(text)} keyboardType="numeric" />
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>mg</Text>
                        </View>
                    </View>
                </View>
            </View>
            <IngredientesComponent ingredientesArray={ingredients} handleModalClose={handleIngredientModalClose} />

            <StepsComponent stepsArray={pasos}   handleModalClose={handleStepModalClose}     />

            {/* <Button onPress={handleCreateRecipe}>Create Recipe</Button> */}

            <Button onPress={handleCreateRecipeWithPhoto}> Guardar </Button>
            {isEditing && (
                <Button onPress={handleDeleatRecipe}>Eliminar Receta</Button>
            )}
            
            <Button onPress={handleCancelar}> Cancelar </Button>
            <Button onPress={handleImprimirEstados}> Imprimir Estados </Button>


               
                <View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : null}
                    {recipeCreated ? (
                        <View style={styles.successContainer}>
                            <Text style={styles.successText}>Accion exitosa</Text>
                            <Button title="OK" onPress={() => {
                                setRecipeCreated(false);
                                handleCancelar();
                            }} />
                        </View>
                    ) : null}
                    {error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity onPress={handleCloseError} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>



                {/* <Text>{isEditing ? 'Editar Receta' : 'Crear Receta'}</Text> */}
                {/* Aquí puedes colocar los campos  <Button title={isEditing ? 'Editar Receta' : 'Crear Receta'} onPress={handleCreateOrEditRecipe} />
                y controles para crear o editar la receta */}
                




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
    successContainer: {
        backgroundColor: '#d3f7a4',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorContainer: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        flex: 1,
        color: 'red',
    },
    closeButton: {
        backgroundColor: '#999',
        borderRadius: 10,
        padding: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
}
)
export default CreateRecipeScreen