const categories = [
    { id: 1, name: 'Veggie' },
    { id: 2, name: 'Gluten Free' },
    { id: 3, name: 'Dinner' },
    { id: 4, name: 'Dessert' },
    { id: 5, name: 'Mediterranean' },
    { id: 6, name: 'Vegan' },
    { id: 7, name: 'Celiac' }
];

export const mockRecipes = [
  {
    img: "https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187701_1706x960.jpg", 
    categoria: categories[3].name, // Dinner
    nombre: "Tarta de Manzana",
    descripcion: "Deliciosa tarta de manzana casera.",
    pasos: ["Pelar y cortar las manzanas.", "Preparar la masa.", "Hornear la tarta."],
    infoNutricional: { calorias: 300, proteinas: 5, carbohidratos: 50, grasas: 10 },
    videoYoutube: "https://www.youtube.com/watch?v=video1",
    ingredientes: ["manzanas", "harina", "azúcar", "mantequilla"],
    tiempo:["20 min"],
    estrellas:["3"],
  },
  {
    img: "https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187701_1706x960.jpg",
    categoria: categories[3].name, // Dinner
    nombre: "Pollo al Curry",
    descripcion: "Pollo cocinado con una deliciosa salsa de curry.",
    pasos: ["Cocinar el pollo.", "Preparar la salsa de curry.", "Mezclar todo y servir."],
    infoNutricional: { calorias: 400, proteinas: 30, carbohidratos: 20, grasas: 15 },
    videoYoutube: "https://www.youtube.com/watch?v=video2",
    ingredientes: ["pollo", "curry", "cebolla", "ajo", "crema"],
    tiempo:["30 min"],
    estrellas:["4.5"],
  },
  {
    img: "https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187701_1706x960.jpg",
    categoria: categories[4].name, // Dessert
    nombre: "Batido de Frutas",
    descripcion: "Batido refrescante de frutas variadas.",
    pasos: ["Cortar las frutas.", "Licuar con hielo.", "Servir y disfrutar."],
    infoNutricional: { calorias: 200, proteinas: 3, carbohidratos: 40, grasas: 2 },
    videoYoutube: "https://www.youtube.com/watch?v=video3",
    ingredientes: ["fresas", "plátano", "kiwi", "jugo de naranja"],
    tiempo:["15 min"],
    estrellas:["4.5"],
  },
  {
    img: "https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187701_1706x960.jpg",
    categoria: categories[5].name, // Mediterranean
    nombre: "Ensalada Griega",
    descripcion: "Ensalada fresca con tomate, pepino, cebolla, queso feta y aceitunas.",
    pasos: ["Cortar los vegetales.", "Agregar el queso feta y las aceitunas.", "Aliñar con aceite de oliva y orégano."],
    infoNutricional: { calorias: 250, proteinas: 10, carbohidratos: 15, grasas: 18 },
    videoYoutube: "https://www.youtube.com/watch?v=video4",
    ingredientes: ["tomate", "pepino", "cebolla", "queso feta", "aceitunas"],
    tiempo:["330 min"],
    estrellas:["4.5"],
  },
  {
    img: "https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187701_1706x960.jpg",
    categoria: categories[6].name, // Vegan
    nombre: "Hamburguesa Vegana",
    descripcion: "Hamburguesa hecha con garbanzos, zanahoria y especias.",
    pasos: ["Triturar los garbanzos y mezclar con zanahoria rallada y especias.", "Formar las hamburguesas y cocinar a la plancha.", "Servir en pan integral con vegetales frescos."],
    infoNutricional: { calorias: 320, proteinas: 12, carbohidratos: 45, grasas: 8 },
    videoYoutube: "https://www.youtube.com/watch?v=video5",
    ingredientes: ["garbanzos", "zanahoria", "cebolla", "pan integral"],
    tiempo:["30 min"],
    estrellas:["4"],
  },
  {
    img: "https://s1.eestatic.com/2015/06/10/cocinillas/cocinillas_40006005_116187701_1706x960.jpg",
    categoria: categories[4].name, // Dessert
    nombre: "Pastel de Chocolate",
    descripcion: "Pastel de chocolate esponjoso y decadente.",
    pasos: ["Preparar la masa de chocolate.", "Hornear el pastel.", "Decorar con crema batida y fresas."],
    infoNutricional: { calorias: 400, proteinas: 6, carbohidratos: 50, grasas: 20 },
    videoYoutube: "https://www.youtube.com/watch?v=video6",
    ingredientes: ["harina", "azúcar", "chocolate", "huevos", "mantequilla"],
    tiempo:["30 min"],
    estrellas:["4.5"],
  },
  
];
