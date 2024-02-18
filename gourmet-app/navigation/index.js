import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../ui/screens/WelcomeScreen';
import HomeScreen from '../ui/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
