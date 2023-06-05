import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box, Center } from 'native-base';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

function Plant(){

  const [soil, setSoil] = useState(50);
  const [temp, setTemp] = useState(78);
  const [water, setWater] = useState(35);
  const [plantName, setPlantName] = useState('My Plant');

  const handleWaterNow = (moisture, waterUsed) => {
    setSoil(soil + moisture);
    setWater(water - waterUsed);
  }

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  })

  if(!fontsLoaded){
    return null;
  }

  return(
    <View style={styles.container}>
      <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} />
      <LinearGradient 
        colors={['rgba(126, 216, 87, 0.6)', 'rgba(0, 151, 178, 0.6)']}
        style={styles.gradient}
      />
      <View style={styles.componentContainer}>
        <Text style={styles.name}>{`${plantName}`}</Text>        
      </View>


      <View style={styles.componentContainer}>
          <Text style={styles.label}>Soil Moisture</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={soil} 
              mx='8' 
              size='2xl'
              bg="blue.800"
              _filledTrack={{
                bg: 'cyan.400'
              }}
              borderColor='white'
              borderWidth={2}
              style={styles.progress}
            >
              <Text style={{color: 'white'}}>Soil %</Text>  
            </Progress>        
          </Box>

          <Text style={styles.label}>Temperature</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={temp} 
              mx='8' 
              size='2xl'
              bg="error.500"
              _filledTrack={{
                bg: 'yellow.400'
              }}
              borderColor='white'
              borderWidth={2}
              style={styles.progress}
            >
              <Text style={{color: 'black'}}>Temp °</Text> 
            </Progress>        
          </Box>

          <Text style={styles.label}>Reservoir</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={water} 
              mx='8' 
              size='2xl'
              bg="blue.800"
              _filledTrack={{
                bg: 'cyan.400'
              }}
              borderColor='white'
              borderWidth={2}
              style={styles.progress}
            >
              <Text style={{color: 'white'}}>Reservoir %</Text> 
            </Progress>        
          </Box>
      </View>

      <View style={styles.componentContainer}>
        <Pressable style={styles.waterNow} onPress={() => handleWaterNow(20, 10)}>
          <Text style={styles.buttonText}>Water Now</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Edit Plant</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>History Logs</Text>
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
    alignItems: 'center',
    width: '100%',
    // borderColor: 'white',
    // borderWidth: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24
  },
  gradient: {
    flex: 1,
    zIndex: 0,
    position: "absolute",
    width: '100%',
    height: '100%',
  },
  bgImage: {
    flex: 1,
    zIndex: -1,
    position: "absolute",
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 48,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  label: {
    fontSize: 24,
    color: 'white'
  },
  progress: {
    marginBottom: 50
  },
  buttons: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
  waterNow: {
    width: 250,
    height: 50,
    backgroundColor: '#7ed957',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
})

export default Plant;