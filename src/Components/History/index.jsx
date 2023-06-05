import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box, Center } from 'native-base';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

function HistoryLog() {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  })

  if(!fontsLoaded){
    return null;
  }

  return(
    <View>

    </View>
  )

}

export default HistoryLog;