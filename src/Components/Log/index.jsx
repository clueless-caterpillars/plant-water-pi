import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Table, Row} from "react-native-table-component";
import styles from "../../styles";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import plantsSlice from "../../redux/plantsSlice";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

const tableHeaders = [
  'Time',
  'Soil',
  'Temp',
  'Humid'
]

function Log({route, navigation}){

  const {timestamp} = route.params;
  const plantsState = useSelector(state => state.plants);
  const dispatch = useDispatch();
  const {updateLogTableData} = plantsSlice.actions;
  

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold
  })

  if(!fontsLoaded){
    return null;
  }

  const fetchLogData = () => async() => {
    let logData = axios
      .get(`http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/status/day?date=${timestamp}`)
      .then(response => response.data);

    return logData;
  }

  dispatch(fetchLogData())
  .then(logData => {
    dispatch(updateLogTableData(logData))
  })

  let formattedDay = new Date(timestamp).toDateString();

  return(
    <View style={styles.mainContainer}>
      <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} />
      <LinearGradient 
        colors={['rgba(126, 216, 87, 0.6)', 'rgba(0, 151, 178, 0.6)']}
        style={styles.gradient}
      />

      <View style={{marginTop: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 0}}>
        <Text style={[styles.name, {textAlign: 'center', fontSize: 36}]}>{formattedDay}</Text>
        <Text style={styles.label}>{`My Plant`}</Text>        
      </View>
      
      <ScrollView>
        <Table borderStyle={{
          borderColor: 'white',
          borderWidth: 1,
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }} style={{margin: 25,}}>
          <Row data={tableHeaders} textStyle={tableStyle.headers} style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} />
          {
            plantsState.logTableData.map((data, idx) => (
              <Row 
                key={idx}
                data={[
                  new Date(data.timeStamp).toString().split(' ')[4], 
                  data.soilMoisture.toFixed(2), 
                  data.temperature.toFixed(2), 
                  data.humidity.toFixed(2)
                ]}
                style={idx%2 ? tableStyle.oddRow : tableStyle.evenRow}
                textStyle={tableStyle.text}
              />
            ))
          }
        </Table>        
      </ScrollView>
    </View>
  )
}

const tableStyle = StyleSheet.create({
  oddRow: {
    backgroundColor: 'rgba(0, 151, 178, 0.4)',
  },
  evenRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  text: {
    color: 'white',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    textAlign: 'center',
    padding: 5
  },
  headers: {
    color: 'white', 
    fontFamily: 'Montserrat_600SemiBold', 
    fontSize: 20,
    textAlign: 'center', 
    padding: 5, 
  }
})

export default Log;