import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet, Modal, TextInput, Dimensions } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box, Spinner, HStack, useToast } from 'native-base';
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
  
  const plantsState = useSelector(state => state.plants);
  const dispatch = useDispatch();
  const { updateMostRecentPlantData, updatePlantHistory, updateName } = plantsSlice.actions;
  const [isWatering, setIsWatering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempName, setTempName] = useState(plantsState.name);
  const toast = useToast();

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
    try {
      let response = await axios.post(state_url, null, {
        params: {
          state: 'on'
        },
      })
      setIsWatering(true);
      setTimeout(() => {
        setIsWatering(false);
      }, 30000);
    } catch (e) {
      setIsWatering(true);
      setTimeout(() => {
        setIsWatering(false);
      }, 5000);
      toast.show({
        title: 'ERROR: Watering failed.',
        placement: 'top'
      });
      console.log('An error occurred.');
      console.log(e);
    }

    //Need to update with current measurements.
    //Use a GET method after watering is done.
    handlePlantData();
  }

  const handleChangeName = (newName) => {
    dispatch(updateName(newName))
    setShowModal(!showModal)
  }

  const handleToggleModal = () => {
    console.log('handle toggle modal')
    setShowModal(!showModal)
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
    <View style={[styles.mainContainer, {minHeight: Math.round(Dimensions.get('window').height), marginTop: -50 }]}>
      
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
        <Text style={[styles.name, {textAlign: 'center'}]}>{plantsState.name}</Text> 
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
        
        <Pressable style={styles.buttons} onPress={handleToggleModal}>
          <Text style={styles.buttonText}>Edit Plant</Text>
        </Pressable>
        
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText} onPress={navigateToHistory}>History Logs</Text>
        </Pressable>
        
      </View>
      
      <Modal visible={showModal}  transparent={true} onRequestClose={() => setShowModal(!showModal)}>
        <View style={videoStyle.centeredView}>
          <View style={videoStyle.modalView}>

            <TextInput 
              value={tempName} 
              onChangeText={setTempName}
              style={{borderWidth: 1, padding: 10, width: 200, fontSize: 18}} 
            /> 

            <Pressable style={styles.buttons} onPress={() => handleChangeName(tempName)}>
              <Text style={[styles.buttonText, {color: 'black'}]}>Apply</Text>
            </Pressable> 

          </View>
        </View>
      </Modal>             

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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
})

export default Plant;