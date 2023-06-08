import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Table, Row} from "react-native-table-component";
import styles from "../../styles";
import axios from "axios";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import plantsSlice from "../../redux/plantsSlice";
import Constants  from "expo-constants";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

const tableHeaders = [
  'Time',
  'Soil',
  'Temp',
  'Humid'
]

const API_URL = Constants.manifest.extra.API_URL

function Log({route, navigation}){

  const {timestamp} = route.params;
  const plantsState = useSelector(state => state.plants);
  const dispatch = useDispatch();
  const {updateLogTableData} = plantsSlice.actions;

  

  const fetchLogData = () => async() => {
    let logData = axios
      .get(`${API_URL}/status/day?date=${timestamp}`)
      .then(response => response.data);

    return logData;
  }

  useEffect(() => {
    dispatch(fetchLogData())
    .then(logData => {
      dispatch(updateLogTableData(logData))
    })
  }, [])
  

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold
  })

  if(!fontsLoaded){
    return null;
  }

  let formattedDay = new Date(timestamp).toDateString();

  return(
    <View style={styles.mainContainer}>
      <Image source={bgImage} contentPosition={{right: 0}} style={styles.bgImage} />
      <LinearGradient 
        colors={['rgba(126, 216, 87, 0.6)', 'rgba(0, 151, 178, 0.6)']}
        style={styles.gradient}
      />

      <View style={{marginTop: 100, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[styles.name, {textAlign: 'center', fontSize: 36}]}>{formattedDay}</Text>
        <Text style={styles.label}>{`My Plant`}</Text>        
      </View>
      
      <View style={{height: '62%', margin: 25}}>
        <Table borderStyle={tableStyle.borders}>
          <Row data={tableHeaders} textStyle={tableStyle.headers} style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} />
          <ScrollView>
            {
              plantsState.logTableData.map((data, idx) => (
                <Row 
                  key={idx}
                  data={[
                    moment(data.timeStamp).format('h:mm A'), 
                    `${(100 - data.soilMoisture).toFixed(0)} %`, 
                    `${data.temperature?.toFixed(0)}° C`, 
                    `${data.humidity?.toFixed(0)} %`
                  ]}
                  style={idx%2 ? tableStyle.oddRow : tableStyle.evenRow}
                  borderStyle={tableStyle.borders}
                  textStyle={tableStyle.text}
                />
              ))
            }            
          </ScrollView>

        </Table>        
      </View>
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
  },
  borders: {
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Log;