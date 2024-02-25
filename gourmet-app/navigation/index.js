import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../ui/screens/WelcomeScreen';
import HomeScreen from '../ui/screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga inicial
    setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Tiempo de espera de 2.5 segundos
  }, []);

  if (isLoading) {
    // Muestra la pantalla de carga mientras se carga la aplicación
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
