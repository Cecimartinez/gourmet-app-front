import { FlatList, ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";

function InformacionNutricional({ calorie, fat, protein, sodium }) {
    return (

        <View >


            <View style={styles.infomationContainer}>


                <Text style={styles.ingredientsItems}>Valor Energetico
                </Text>


                <Text style={styles.ingredientsItems}>{calorie} kcal
                </Text>
            </View>

            <View style={styles.infomationContainer}>


                <Text style={styles.ingredientsItems}>Carbohidratos
                </Text>


                <Text style={styles.ingredientsItems}>{fat} g
                </Text>
            </View>


            <View style={styles.infomationContainer}>


                <Text style={styles.ingredientsItems}>Proteinas
                </Text>


                <Text style={styles.ingredientsItems}>{protein} g
                </Text>



            </View>


            <View style={styles.infomationContainer}>


                <Text style={styles.ingredientsItems}>Sodium
                </Text>


                <Text style={styles.ingredientsItems}>{sodium} mg
                </Text>
            </View>


        </View>


    );
}

export default InformacionNutricional;

const styles = StyleSheet.create({
    infomationContainer: {

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