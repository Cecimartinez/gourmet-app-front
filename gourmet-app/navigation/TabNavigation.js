import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import FavoriteRecipesScreen from '../ui/screens/FavoriteRecipesScreen';
import SearchRecipesScreen from '../ui/screens/SearchRecipesScreen';
import CreateRecipeScreen from '../ui/screens/CreateRecipeScreen';
import ProfileScreen from '../ui/screens/ProfileScreen';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../ui/screens/HomeScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom:  0,
        right:  0,
        left:  0,
        elevation:  0,
        height:  60,
        background: "#fff"
    }
};

export default function TabNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen  
                name="Home"  
                component={HomeScreen}  
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <AntDesign name="home" size={24} color={focused ? "#F39E0B" : "#111"} />
                            </View>
                        );
                    }
                }}
                />

                <Tab.Screen  
                name="Search"  
                component={SearchRecipesScreen}  
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <AntDesign name="search1" size={24} color={focused ? "#F39E0B" : "#111"} />
                            </View>
                        );
                    }
                }}
                />
                
                <Tab.Screen  
                name="Create"  
                component={CreateRecipeScreen}  
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <AntDesign name="pluscircleo" size={24} color={focused ? "#F39E0B" : "#111"} />
                            </View>
                        );
                    }
                }}   
                />
                <Tab.Screen  
                name="Favorite"  
                component={FavoriteRecipesScreen}  
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <MaterialIcons name="favorite-border" size={24} color={focused ? "#F39E0B" : "#111"} />
                            </View>
                        );
                    }
                }}
                />
                <Tab.Screen  
                name="Profile"  
                component={ProfileScreen}  
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Ionicons name="person-outline" size={24} color={focused ? "#F39E0B" : "#111"} />
                            </View>
                        );
                    }
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
