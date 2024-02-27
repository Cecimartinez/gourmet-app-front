import { FlatList, ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";


function Steps({ steps }) {


    return (
        <View >
            <FlatList
                style={styles.listContainer}
                data={steps}
                horizontal={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (

                    <View style={styles.stepsContainer}>

                        <Text style={styles.stepsItems}>

                            <View style={styles.numberContainer} >
                                <Text style={styles.numberItem}>{index + 1}</Text>
                            </View>
                            {item}
                        </Text>

                    </View>

                )}
            />
        </View>
    );

}


export default Steps;

const styles = StyleSheet.create({
    stepsContainer: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,

    },
    stepsItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',

        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 15,




    },
    listContainer: {

        height: 180,
        paddingBottom: 20,
        overflow: 'scroll',
        marginBottom: 10,

    },
    numberContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 100,
        marginRight: 10,

    },
    numberItem: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,

        width: 40,
        height: 40,

    },
    itemText: {
        textAlign: 'center',
        marginLeft: 15,


    },

})

