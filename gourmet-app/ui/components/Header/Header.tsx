import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const staticInfo = {
    title: "My App",
    uri: 'data:image/jpeg;base64,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'

};


const Header = () => {
    //si vine de otro lado daria true
    const{canGoBack, goBack} = useNavigation();

  return( 
    <View style={styles.container}>
        {canGoBack () ? (
            <Button icon={<Icon name="arrow-back" size={19} />} onPress={goBack} />
        ) : null}

        <View style={styles.leftContainer}>
            <Text style={styles.title} >{'Hello'+staticInfo.title}</Text>
            <Text style={styles.subTitle}>Welcome back</Text>
        </View>
        <View style={styles.rifhtContainer}>
          <Image source={{uri: staticInfo.uri}} style={{width: 40, height: 40}} />
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rifhtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle: {
    fontSize: 16,
    color: 'gray',
},

    
});

export default Header;
