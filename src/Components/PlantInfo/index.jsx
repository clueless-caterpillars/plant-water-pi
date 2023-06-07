import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box } from 'native-base';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import styles from "../../styles";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import plantsSlice from "../../redux/plantsSlice";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

function Plant({navigation}){

  const plantsState = useSelector(state => state.plants);
  const dispatch = useDispatch();
  const {updateAllPlants, setActivePlant} = plantsSlice.actions;

  const [soil, setSoil] = useState(50);
  const [water, setWater] = useState(35);

  const fetchData = () => async() => {
    let plantInfo = axios
      .get('http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/status')
      .then(response => response.data)

      return plantInfo;
  }

  const handlePlantData = () => {
    dispatch(fetchData())
    .then(response => {
      dispatch(updateAllPlants(response));
      dispatch(setActivePlant(response[0]))
      // console.log(response[0])
    })
  }

  // fetches all plant data and sets it to state on 'componentDidMount'
  useEffect(() => {
    handlePlantData();
  }, [])


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

  let formattedTime = new Date(plantsState.activePlant.timeStamp).toString().split(' ')[4];


  return(
    <View style={styles.mainContainer}>
      <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} />
      <LinearGradient 
        colors={['rgba(126, 216, 87, 0.6)', 'rgba(0, 151, 178, 0.6)']}
        style={styles.gradient}
      />
      <View style={styles.componentContainer}>
        <Text style={styles.name}>{`${plantsState.activePlant.plantId}`}</Text> 
        <Text style={styles.label}>{`Last Updated: ${formattedTime}`}</Text>       
      </View>


      <View style={styles.componentContainer}>
          <Text style={styles.label}>Soil Moisture</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={plantsState.activePlant.soilMoisture} 
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
              <Text style={{color: 'white'}}>{plantsState.activePlant.soilMoisture}</Text>  
            </Progress>        
          </Box>

          <Text style={styles.label}>Temperature</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={plantsState.activePlant.temperature} 
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
              <Text style={{color: 'black'}}>{plantsState.activePlant.temperature}</Text> 
            </Progress>        
          </Box>

          <Text style={styles.label}>Humidity</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={plantsState.activePlant.humidity} 
              mx='8' 
              size='2xl'
              bg="green.800"
              _filledTrack={{
                bg: 'lime.400'
              }}
              borderColor='white'
              borderWidth={2}
              style={styles.progress}
            >
              <Text style={{color: 'white'}}>{plantsState.activePlant.humidity}</Text> 
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