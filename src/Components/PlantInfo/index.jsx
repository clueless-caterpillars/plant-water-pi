import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box } from 'native-base';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import styles from "../../styles";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

function Plant({navigation}){

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
        <Pressable style={styles.waterNow} onPress={() => handleWaterNow(20, 10)}>
          <Text style={styles.buttonText}>Water Now</Text>
        </Pressable>
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