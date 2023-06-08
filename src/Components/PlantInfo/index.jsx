import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box, Spinner, HStack } from 'native-base';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import styles from "../../styles";

import axios from "axios";
import moment from "moment/moment";

import { useSelector, useDispatch } from "react-redux";
import plantsSlice from "../../redux/plantsSlice";
import { Video, ResizeMode } from 'expo-av'

import Constants from 'expo-constants'


const bgImage = require('../../../assets/homebg.jpg');
const bgVideo = require('../../../assets/Videos/bgVideo1.mp4')

const API_URL = Constants.manifest.extra.API_URL

function Plant({navigation}){
  
  const [isWatering, setIsWatering] = useState(false);
  const plantsState = useSelector(state => state.plants);
  const dispatch = useDispatch();
  const { updateMostRecentPlantData, updatePlantHistory } = plantsSlice.actions;

  const [plantIdx, setPlantIdx] = useState(0);

  const fetchPlantData = () => async() => {
    let plantInfo = axios
      .get(`${API_URL}/status`)
      .then(response => response.data)
      .catch(e => 'Your plant is dead 😭' )
      return plantInfo;
  }

  const fetchPlantHistory = () => async() => {
    let plantHistory = axios
      .get(`${API_URL}/status/day`)
      .then(response => response.data)
      .catch(e => e)
      return plantHistory;
  }

  const handlePlantData = () => {
    dispatch(fetchPlantData())
    .then(plantData => {
      dispatch(updateMostRecentPlantData(plantData));
    })

    dispatch(fetchPlantHistory())
    .then(plantHistory => {
      dispatch(updatePlantHistory(plantHistory))
    })
  }

  const handleWaterNow = async() => {
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
      }, 30000);
    } catch (e) {
      console.log('An error occurred.');
      console.log(e);
    }
    //change state to watering.


    //Need to update with current measurements.
    //Use a GET method after watering is done.
    handlePlantData();

  }

  // fetches all plant data and sets it to state on 'componentDidMount'
  useEffect(() => {
    handlePlantData();
  }, [])


  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  })

  if(!fontsLoaded){
    return null;
  }

  const navigateToHistory = () => {
    navigation.navigate('History');
  }

  let formattedTime = moment(plantsState.plant.timeStamp).format("ddd, MMM D YYYY, h:mm a");

  return(
    <View style={styles.mainContainer}>
      
      {
        isWatering ? 
        <Video 
        ref={null}
        style={videoStyle.bgVideo}
        source={bgVideo}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={true}
      />  
        : 
        <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} />
      }
      <LinearGradient 
        colors={['rgba(126, 216, 87, 0.6)', 'rgba(0, 151, 178, 0.6)']}
        style={styles.gradient}
      />
          
      <View style={styles.componentContainer}>
        <Text style={[styles.name, {textAlign: 'center'}]}>{`My Plant`}</Text> 
        <Text style={[styles.label, {textAlign: 'center', fontSize: 18}]}>{`Last Updated: ${formattedTime}`}</Text>
      </View>


      <View style={styles.componentContainer}>
          <Text style={styles.label}>Soil Moisture</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={(100 - plantsState.plant.soilMoisture)} 
              mx='8' 
              size='2xl'
              bg="blueGray.400"
              _filledTrack={{
                bg: 'cyan.400'
              }}
              borderColor='white'
              borderWidth={2}
              style={styles.progress}
            >
              <Text style={{color: 'white'}}>{(100 - plantsState.plant.soilMoisture).toFixed(0)}</Text>  
            </Progress>        
          </Box>

          <Text style={styles.label}>Temperature °C</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={plantsState.plant.temperature} 
              mx='8' 
              size='2xl'
              bg="blueGray.400"
              _filledTrack={{
                bg: 'yellow.400'
              }}
              borderColor='white'
              borderWidth={2}
              style={styles.progress}
            >
              <Text style={{color: 'black'}}>{plantsState.plant.temperature?.toFixed(0)}</Text> 
            </Progress>        
          </Box>

          <Text style={styles.label}>Humidity</Text>
          <Box w='90%' maxW='400'>
            <Progress 
              value={plantsState.plant.humidity} 
              mx='8' 
              size='2xl'
              bg='blueGray.400'
              _filledTrack={{
                bg: 'lime.400'
              }}
              borderColor='white'
              borderWidth={2}
              style={styles.progress}
            >
              <Text style={{color: 'black'}}>{plantsState.plant.humidity?.toFixed(0)}</Text> 
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

const videoStyle = StyleSheet.create({
  bgVideo: {
    flex: 1,
    zIndex: -1,
    position: "absolute",
    width: '100%',
    height: '100%',
    opacity: 1
  }
})

export default Plant;