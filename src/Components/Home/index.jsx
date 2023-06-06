import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av'
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Damion_400Regular } from "@expo-google-fonts/damion";
import styles from "../../styles";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');
const bgVideo2 = require('../../../assets/video/bgVideo2.mp4')
const bgVideo1 = require('../../../assets/video/bgVideo1.mp4')

const videos = [
  bgVideo1,
  bgVideo2
]

function Home ({navigation}) {

  // const [playingVideo, setPlayingVideo] = useState(videos[videoIdx]);
  const [videoIdx, setVideoIdx] = useState(0);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Damion_400Regular
  })

  if(!fontsLoaded){
    return null;
  }

  const handleNextVideo = (videoStatus) => {
    if(videoStatus.didJustFinish){
      if(videoIdx === videos.length){
        setVideoIdx(0)
      } else {
        setVideoIdx(videoIdx + 1)        
      }
    }
  }

  const navigateToPlant = () => {
    navigation.navigate('Plant');
  }

  return (
    <View style={styles.mainContainer}>
      {/* <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} /> */}
      <Video 
        ref={null}
        style={styles.bgImage}
        source={videos[videoIdx]}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={true}
        onPlaybackStatusUpdate={handleNextVideo}
      />

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
        <Pressable style={styles.login} onPress={navigateToPlant}>
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