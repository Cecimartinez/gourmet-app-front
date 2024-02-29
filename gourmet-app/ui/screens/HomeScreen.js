import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, Text, ScrollView, Modal } from 'react-native'
import Search from '../components/Search'
import Categories from '../components/Categories'
import Recipes from '../components/Recipes'

export default function HomeScreen() {
    
    const [activeCategory, setActiveCategory] =useState(null)
    const [activeSearch, setActiveSearch] =useState(null)

  

    return (
        <View style={{flex: 1}}>
            <StatusBar style='dark'/>
            <ScrollView
                style={{marginTop: 50}}
                contentContainerStyle={{paddingHorizontal: '5%', paddingBottom: 50}}
                showsVerticalScrollIndicator={false}
                
            >
                <View style={{marginBottom: 20}}>
                    <Text style={{fontSize: 18, color: '#555', textAlign: 'left'}}>Hello!</Text>
                    <View>
                        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#555', textAlign: 'left'}}>Make your own food,</Text>
                    </View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#555', textAlign: 'left'}}>stay at <Text style={{color: '#ff9900'}}>home</Text></Text>
                </View>

                <Search activeSearch={activeSearch} setActiveSearch={setActiveSearch} />
                <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

           

                <View>
                <Recipes activeCategory={activeCategory}  activeSearch={activeSearch} />
                                </View>    
            
            </ScrollView>
        </View>
    )
}


