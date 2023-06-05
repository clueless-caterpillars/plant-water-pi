import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Damion_400Regular } from "@expo-google-fonts/damion";

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
    <View style={styles.container}>
      <Image source={bgImage} contentPosition={{right: 0}} style={styles.image} />

      <LinearGradient 
        colors={['rgba(126, 216, 87, 0.6)', 'rgba(0, 151, 178, 0.6)']}
        style={styles.background}
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

        <Text style={{
          fontFamily: 'Montserrat_400Regular',
          fontSize: 24,
          textAlign: 'center',
          color: 'white',
        }}>
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

const styles =  StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  componentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
    width: 250,
    height: 50,
    backgroundColor: '#7ed957',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
  signUp: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24
  },
  image: {
    flex: 1,
    zIndex: -1,
    position: "absolute",
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    // flex: 1,
    fontSize: 72,
    textAlign: 'center',
    color: 'white',
  },
  subtitle: {
    // flex: 1,
    fontSize: 36,
    textAlign: 'center',
    color: 'white',
  }, 
  background: {
    flex: 1,
    zIndex: 0,
    position: "absolute",
    width: '100%',
    height: '100%',
  }
})

export default Home;