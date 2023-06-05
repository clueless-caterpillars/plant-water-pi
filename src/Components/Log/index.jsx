import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Progress, Box, Center } from 'native-base';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { Table, Row, Rows } from "react-native-table-component";
import styles from "../../styles";

const bgImage = require('../../../assets/homebg.jpg');
const logo = require('../../../assets/PlantPalLogo.png');

const tableHeaders = [
  'Time',
  'Soil',
  'Temp',
  'Water'
]

const fakeData = [
  ['0100', 50, 70, null],
  ['0200', 48, 71, null],
  ['0300', 47, 72, null],
  ['0400', 65, 73, 1],
  ['0500', 68, 74, null],
  ['0600', 50, 70, null],
  ['0700', 48, 71, null],
  ['0800', 47, 72, null],
  ['0900', 65, 73, 1],
  ['1000', 68, 74, null],
  ['1100', 50, 70, null],
  ['1200', 48, 71, null],
  ['1300', 47, 72, null],
  ['1400', 65, 73, 1],
  ['1500', 68, 74, null],
  ['1600', 50, 70, null],
  ['1700', 48, 71, null],
  ['1800', 47, 72, null],
  ['1900', 65, 73, 1],
  ['2000', 68, 74, null],
  ['2100', 50, 70, null],
  ['2200', 48, 71, null],
  ['2300', 47, 72, null],
  ['2400', 65, 73, 1],
]

function Log({plantName}){

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold
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
        <Text style={styles.name}>2023-05-01</Text>
        <Text style={styles.label}>{`${plantName}`}</Text>        
      </View>
      
      <ScrollView>
        <Table borderStyle={{
          borderColor: 'white',
          borderWidth: 1,
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }} style={{margin: 25,}}>
          <Row data={tableHeaders} textStyle={{color: 'white', textAlign: 'center', padding: 5, fontFamily:  'Montserrat_600SemiBold', fontSize: 20}} style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}} />
          {
            fakeData.map((data, idx) => (
              <Row 
                key={idx}
                data={data}
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
  }
})

export default Log;