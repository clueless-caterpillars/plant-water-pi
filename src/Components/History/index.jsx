import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box, Center } from 'native-base';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import styles from "../../styles";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

function HistoryLog({plantName}) {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  })

  if(!fontsLoaded){
    return null;
  }

  return(
    <View style={styles.mainContainer}>
      <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} />
      <LinearGradient 
        colors={['rgba(126, 216, 87, 0.6)', 'rgba(0, 151, 178, 0.6)']}
        style={styles.gradient}
      />

      <View style={{marginTop: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 0}}>
        <Text style={styles.name}>History Logs</Text>
        <Text style={styles.label}>{`${plantName}`}</Text>        
      </View>
      
      <ScrollView style={{ marginTop: 25, marginBottom: 25, width: '100%'}} contentContainerStyle={{justifyContent: 'center',
    alignItems: 'center'}}>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-20</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-21</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-22</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-23</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-24</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-25</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-26</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-27</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-28</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-29</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-30</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>2023-05-31</Text>
        </Pressable>
      </ScrollView>

    </View>
  )

}

export default HistoryLog;