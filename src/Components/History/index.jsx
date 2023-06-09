import React from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import styles from "../../styles";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import plantsSlice from "../../redux/plantsSlice";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

function HistoryLog({plantName, navigation}) {

  const plantsState = useSelector(state => state.plants);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  })

  if(!fontsLoaded){
    return null;
  }

  const navigateToLog = (timestamp) => {
    navigation.navigate('Log', {timestamp: timestamp});
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
        <Text style={styles.label}>{plantsState.name}</Text>        
      </View>
      
      <ScrollView style={{ marginTop: 25, marginBottom: 25, width: '100%'}} contentContainerStyle={{justifyContent: 'center',
    alignItems: 'center'}}>
      {plantsState.history.map((timestamp, idx) => 

        <Pressable key={idx} style={styles.buttons} onPress={() => navigateToLog(moment(timestamp).valueOf())}>
          <Text style={styles.buttonText}>{timestamp}</Text>
        </Pressable>
        
      )}
      </ScrollView>

    </View>
  )

}

export default HistoryLog;