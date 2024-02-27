import { FlatList, ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";

function Ingredients({ ingredients }) {
    return (

        <View >
            <FlatList
                style={styles.listContainer}
                data={ingredients}
                horizontal={false}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (

                    <View style={styles.ingredientsContainer}>

                        <Text style={styles.ingredientsItems}>● {item.name}
                        </Text>
                        <Text style={styles.ingredientsItems}>{item.quantity}
                        </Text>
                    </View>

                )}
            />
        </View>);
}

export default Ingredients;

const styles = StyleSheet.create({
    ingredientsContainer: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    ingredientsItems: {

        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,


    },
    listContainer: {
        height: 180,
        paddingBottom: 20,
        overflow: 'scroll',
        marginBottom: 10,

    },
})