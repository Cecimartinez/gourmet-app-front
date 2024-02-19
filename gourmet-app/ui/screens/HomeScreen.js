import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Search from '../components/Search'
import Categories from '../components/Categories'

export default function HomeScreen() {
    
    const [activeCategory, setActiveCategory] =useState('Veggie')

    return (
        <View style={{flex: 1}}>
            <StatusBar style='dark'/>
            <ScrollView
                style={{marginTop: 50}}
                contentContainerStyle={{paddingHorizontal: '5%', paddingBottom: 50}}
                showsVerticalScrollIndicator={false}
            >
                <View style={{marginBottom: 20}}>
                    <Text style={{fontSize: 18, color: '#555', textAlign: 'left'}}>Hello, Ana!</Text>
                    <View>
                        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#555', textAlign: 'left'}}>Make your own food,</Text>
                    </View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#555', textAlign: 'left'}}>stay at <Text style={{color: '#ff9900'}}>home</Text></Text>
                </View>

                <Search/>
                <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </ScrollView>
        </View>
    )
}
