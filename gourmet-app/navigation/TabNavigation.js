import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FavoriteRecipesScreen from '../ui/screens/FavoriteRecipesScreen';
import RecipeScreen from '../ui/screens/RecipeScreen';

import CreateRecipeScreen from '../ui/screens/CreateRecipeScreen';
import ProfileScreen from '../ui/screens/ProfileScreen';
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../ui/screens/HomeScreen';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RecipesUser from '../ui/components/Recipes';
import { createStackNavigator } from '@react-navigation/stack';
import { BookOutlined } from '@ant-design/icons';
import SearchRecipesScreen from '../ui/screens/MyRecipeScreen';
import MyRecipeScreen from '../ui/screens/MyRecipeScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: "#fff"
    }
};

export default function TabNavigation({ route }) {
    const { responseBody } = route.params;
    console.log(responseBody,'console log en tab nav')






    return (
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
                name="MyRecipes"
                component={MyRecipeScreen}
                initialParams={{ responseBody }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (

                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <MaterialCommunityIcons name="notebook" size={24} color={focused ? "#F39E0B" : "#111"} />


                            </View>
                        );
                    }
                }}
            />

            <Tab.Screen
                name="Create"
                component={CreateRecipeScreen}
                initialParams={{ responseBody }} // Aquí defines el parámetro que deseas enviar
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
                initialParams={{ responseBody }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Feather name="bookmark" size={24} color={focused ? "#F39E0B" : "#111"} />
                            </View>
                        );
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={{ responseBody }}
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
            <Tab.Screen
                name="RecipeDetail"
                component={RecipeScreen}
                initialParams={{ responseBody }}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,

                }}
            />




            {/* <Tab.Screen  
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
                />  */}





        </Tab.Navigator>
    );
}





