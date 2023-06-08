import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box, Spinner, HStack } from 'native-base';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import styles from "../../styles";
import axios from 'axios';
import Constants from 'expo-constants'

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

const API_URL = Constants.manifest.extra.API_URL

function Plant({navigation}){

  const [soil, setSoil] = useState(50);
  const [temp, setTemp] = useState(78);
  const [water, setWater] = useState(35);
  const [isWatering, setIsWatering] = useState(false);
  const [plantName, setPlantName] = useState('My Plant');

  const handleWaterNow = async() => {
    /*setSoil(soil + moisture);
    setWater(water - waterUsed);*/
    
    //Send request to Raspberry Pi to turn on.
    const state_url = `${API_URL}/state`;
    const currentStatus_url = `${API_URL}/status`;
    try {
      let response = await axios.post(state_url, null, {
        params: {
          state: 'on'
        },
      })
      console.log('hey', response.data);
      setIsWatering(true);
      setTimeout(() => {
        setIsWatering(false);
      }, 5000);
    } catch (e) {
      console.log('An error occurred.');
      console.log(e);
    }
    //change state to watering.


    //Need to update with current measurements.
    //Use a GET method after watering is done.

  }

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  })

  if(!fontsLoaded){
    return null;
  }

  const navigateToHistory = () => {
    navigation.navigate('History');
  }

  return(
    <View style={styles.mainContainer}>
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
        {isWatering
        ?
        <Pressable style={styles.waterNow}>
          <HStack space={2} justifyContent="center" alignItems="center">
            <Spinner size="lg" color="white"/>
            <Text style={styles.loadingText}>Watering Plant...</Text>
          </HStack>
        </Pressable>
        :
        <Pressable style={styles.waterNow} onPress={handleWaterNow}>
          <Text style={styles.buttonText}>Water Now</Text>
        </Pressable>
        }
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Edit Plant</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText} onPress={navigateToHistory}>History Logs</Text>
        </Pressable>
      </View>

    </View>
  )
}


export default Plant;