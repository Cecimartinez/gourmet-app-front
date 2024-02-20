import {  StyleSheet } from "react-native";
// import { View } from "../Themed";
import { View } from "react-native";
const Card = ({children, ...props}) => {
  return <View
  style={[styles.container, props?.style]} darkColor="#050505" lightColor="#f5f5f5" avoid>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 350,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10
  },
});

export default Card;
