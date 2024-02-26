import React from 'react';
import { View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Search({ activeSearch, setActiveSearch}) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <AntDesign name="search1" style={styles.icon} strokeWidth={3} color="gray" />
            </View>
            <TextInput
                placeholder="Search.."
                placeholderTextColor={'gray'}
                style={styles.input}
                onChangeText={(text) => setActiveSearch(text)}
            />
        </View>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E2E2E2',
        borderRadius: 20, 
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        fontSize: 20,
        paddingLeft: 10,
    },
    iconContainer: {
        borderRadius: 999, 
        padding: 10,
    },
    icon: {
        fontSize: 24,
    },
};
