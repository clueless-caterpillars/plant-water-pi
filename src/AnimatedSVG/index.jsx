import React from 'react';
import { View } from 'react-native';
import styles from '../styles'; // Assuming your styles are defined in a file named "style.js"

function AnimatedSVG() {
  return (
    <View style={styles.container}>
      <View style={styles.plant} id="plant1"></View>
      <View style={styles.plant} id="plant2"></View>
      <View style={styles.plant} id="plant3"></View>
      <View style={styles.wateringCan} id="watering-can"></View>
    </View>
  );
}

export default AnimatedSVG;
