import React, { useState, useEffect, useRef } from "react";
import { Text, View, Pressable, Animated, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av'

// biometrics dependencies
import * as LocalAuthentication from 'expo-local-authentication';

// // signout button dependencies
// import { useAuthenticator } from '@aws-amplify/ui-react-native';

// // retrieves only the current value of 'user' from 'useAuthenticator'
// const userSelector = (context) => [context.user]

// // signout button logic
// const SignOutButton = () => {
//   const { user, signOut } = useAuthenticator(userSelector);
//   // console.log(user);
//   return (
//     <Pressable onPress={signOut} style={styles.signOut}>
//       <Text style={styles.buttonText}>Sign Out</Text>
//     </Pressable>
//   )
// };

import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Damion_400Regular } from "@expo-google-fonts/damion";
import styles from "../../styles";
import axios from "axios";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');
const bgVideo = require('../../../assets/video/bgvideo.mp4')


const videos = [
  bgVideo
]

function Home ({navigation}) {

    // state variables for local authentication
    const [isBiometricsSupported, setIsBioMetricsSupported] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // check if device hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBioMetricsSupported(compatible);
        })();
    });

    // actual authentication function here
    function onAuthenticate() {
        const auth = LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate',
            fallbackLabel: 'Enter Passcode',
        });
        auth.then(result => {
            if(!result.success) {
              console.log('NOT AUTHORIZED');
              setIsAuthenticated(false);
              return;
            }
            else {
              setIsAuthenticated(result.success);
              navigateToPlant();
            }
            console.log(result);
        }
        );
    }

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

  const handleVideoStatus = (videoStatus) => {
    if(videoStatus.didJustFinish){
      // console.log('video finished')
      // setPlayVideo(false);
      // fadeVideo();
      if(videoIdx === videos.length - 1){
        setVideoIdx(0);
      } else {
        setVideoIdx(videoIdx + 1);   
      }
      // setPlayVideo(true)
    }
  }

  const navigateToPlant = () => {
    navigation.navigate('Plant');
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
        <Pressable style={styles.login} onPress={navigateToPlant}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        {/* <SignOutButton /> */}
      </View>
    </View>
  )
}

export default Home;