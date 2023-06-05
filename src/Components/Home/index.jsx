import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Damion_400Regular } from "@expo-google-fonts/damion";
import styles from "../../styles";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

function Home (props) {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Damion_400Regular
  })

  if(!fontsLoaded){
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} />

      <LinearGradient 
        colors={['rgba(126, 216, 87, 0.6)', 'rgba(0, 151, 178, 0.6)']}
        style={styles.gradient}
      />

      <Image source={logo} style={styles.logo} />

      <View style={styles.componentContainer}>

        <Text style={
          { 
          fontFamily: 'Damion_400Regular',
          fontSize: 108,
          color: 'white',
          width: '100%',
          }}>
            PlantPal
        </Text>

        <Text style={styles.buttonText}>
          Your Plant's Best Pal
        </Text>          
      </View>

      <View style={styles.componentContainer}>
        <Pressable style={styles.login}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Home;