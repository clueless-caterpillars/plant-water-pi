import React from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import styles from "../../styles";

import { useSelector, useDispatch } from "react-redux";
import plantsSlice from "../../redux/plantsSlice";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

function HistoryLog({plantName, navigation}) {

  const plantState = useSelector(state => state.plants);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  })

  if(!fontsLoaded){
    return null;
  }

  const navigateToLog = () => {
    navigation.navigate('Log');
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
        <Text style={styles.label}>{`My Plant`}</Text>        
      </View>
      
      <ScrollView style={{ marginTop: 25, marginBottom: 25, width: '100%'}} contentContainerStyle={{justifyContent: 'center',
    alignItems: 'center'}}>
      {plantState.allPlants.map(plant => {
        let stringDate = new Date(plant.timeStamp).toString().split(' ');
        let date = `${stringDate[0]} ${stringDate[1]} ${stringDate[2]} ${stringDate[3]}`;
        return <Pressable style={styles.buttons} onPress={navigateToLog}>
          <Text style={styles.buttonText}>{date}</Text>
        </Pressable>
      })}
      </ScrollView>

    </View>
  )

}

export default HistoryLog;