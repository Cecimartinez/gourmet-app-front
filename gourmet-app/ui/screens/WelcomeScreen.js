import React from 'react';
import { StatusBar, View, Image, Text, StyleSheet } from 'react-native';

export function WelcomeScreen() {
  return (
    <View style={styles.container}>
    <StatusBar style="light" />
    {/* logo image with rings */}
    <View style={styles.logoWrapper}>
      <View style={styles.logoInnerWrapper}>
        <Image source={require('../../assets/images/icon-gourmet.png')} style={styles.logoImage} />
      </View>
    </View>
    {/* title and punchline */}
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Gourmet</Text>
      <Text style={styles.subtitleText}>Food is always right</Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:  1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F39E0B', 
    paddingVertical:  20, 
  },
  logoWrapper: {
    backgroundColor: 'rgba(255,  255,  255,  0.2)', 
    borderRadius:  9999, 
    padding:  10, 
  },
  logoInnerWrapper: {
    backgroundColor: 'rgba(255,  255,  255,  0.2)', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:  9999,
    padding:  8,
  },
  logoImage: {
    width:  200,
    height:  200,
  },
  titleContainer: {
    flexDirection: 'center',
    alignItems:'center',
    justifyContent: 'center', 
    marginTop:  20, 
  },
  titleText: {
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    letterSpacing:  4,
    fontSize:  60, 
  },
  subtitleText: {
    fontWeight: 'medium',
    color: '#FFFFFF', 
    letterSpacing:  4, 
    fontSize:  16, 
  },
});
