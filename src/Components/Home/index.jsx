import React, { useState, useRef } from "react";
import { Text, View, Pressable, Animated, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av'
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Damion_400Regular } from "@expo-google-fonts/damion";
import styles from "../../styles";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');
const bgVideo1 = require('../../../assets/video/bgVideo1.mp4')
const bgVideo2 = require('../../../assets/video/bgVideo2.mp4')

const videos = [
  bgVideo1,
  bgVideo2
]

function Home ({navigation}) {

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [videoIdx, setVideoIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [playVideo, setPlayVideo] = useState(true);

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

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Damion_400Regular
  })

  if(!fontsLoaded){
    return null;
  }

  const fadeOutVideo = async (remainingTime) => {
    console.log('fading out!')
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: remainingTime,
      useNativeDriver: true
    }).start();      
  }

  const fadeInVideo = async () => {
    console.log('fading in!')
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();      
}

const fadeVideo = async () => {
  fadeOutVideo();
  setTimeout(fadeInVideo, 1500)
}

  const handleVideoStatus = (videoStatus) => {
    if(videoStatus.didJustFinish){
      // console.log('video finished')
      // setPlayVideo(false);
      fadeVideo();
      if(videoIdx === videos.length - 1){
        setVideoIdx(0);
      } else {
        setVideoIdx(videoIdx + 1);   
      }
      // setPlayVideo(true)
    }
  }

  // const navigateToPlant = () => {
  //   navigation.navigate('Plant');
  // }

  const navigateToAuth = () => {
    navigation.navigate('Auth');
  }

  return (
    <View style={[styles.mainContainer]}>
      {/* <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} /> */}
      <Animated.View style={[videoStyle.bgVideo, {opacity: fadeAnim}]}>
        <Video 
          ref={null}
          style={videoStyle.bgVideo}
          source={videos[videoIdx]}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={playVideo}
          onPlaybackStatusUpdate={handleVideoStatus}
        />           
      </Animated.View>

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
        <Pressable style={styles.login} onPress={navigateToAuth}>
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