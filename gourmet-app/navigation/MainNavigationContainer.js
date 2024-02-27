import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../ui/screens/SignInScreen';
import TabNavigation from '../navigation/TabNavigation';

const Stack = createStackNavigator();

export default function MainNavigationContainer() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
