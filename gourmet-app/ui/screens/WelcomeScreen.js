import React, { useEffect, useRef } from 'react';
import { StatusBar, View, Image, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export function WelcomeScreen() {
  const ring1Size = width * 0.6; 
  const ring2Size = width * 0.8; 
  const imageSize = width * 0.5; 

  const ring1padding = useRef(new Animated.Value(0)).current;
  const ring2padding = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const animation1 = Animated.timing(ring1padding, {
      toValue: ring1Size,
      duration: 1000,
      useNativeDriver: false,
    });

    const animation2 = Animated.timing(ring2padding, {
      toValue: ring2Size,
      duration: 1000,
      useNativeDriver: false,
    });

    Animated.parallel([animation1, animation2]).start();

    const timeout = setTimeout(() => {
      navigation.navigate('Home');
    }, 2500); // Navigate after 2.5 seconds

    return () => clearTimeout(timeout);
  }, [navigation, ring1padding, ring2padding, ring1Size, ring2Size]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* logo image with rings */}
      <View style={[styles.logoWrapper, { width: ring2Size, height: ring2Size }]}>
        <Animated.View style={[styles.logoInnerWrapper, { width: ring1padding, height: ring1padding }]}>
          <Animated.View style={[styles.logoInnerWrapper, { width: ring2padding, height: ring2padding }]}>
            <Image source={require('../../assets/images/icon-gourmet.png')} style={[styles.logoImage, { width: imageSize, height: imageSize }]} />
          </Animated.View>
        </Animated.View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F39E0B',
    paddingVertical: height * 0.05,
  },
  logoWrapper: {
    borderRadius: width * 0.5, 
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  logoInnerWrapper: {
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain', // Ensure that the image does not stretch beyond its container
  },
  titleContainer: {
    marginTop: height * 0.05, // 5% of screen height
  },
  titleText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 4,
    fontSize: width * 0.2, // 20% of screen width
  },
  subtitleText: {
    fontWeight: 'medium',
    color: '#FFFFFF',
    letterSpacing: 4,
    fontSize: width * 0.04, // 4% of screen width
  },
});
