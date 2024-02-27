import React from 'react';
import MainNavigationContainer from './navigation/MainNavigationContainer';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigationContainer/>
    </NavigationContainer>
    );
}
