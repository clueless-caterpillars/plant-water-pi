import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Damion_400Regular } from "@expo-google-fonts/damion";

import Home from './src/Components/Home';
import Plant from './src/Components/PlantInfo';
import HistoryLog from './src/Components/History';
import Log from './src/Components/Log';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Damion_400Regular
  })

  if(!fontsLoaded){
    return null;
  }

  const navigatorStyleOptions = {
    headerStyle: {
      backgroundColor: 'rgba(0, 151, 178, 1)',
    },
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerTitleStyle: {
      fontFamily: 'Montserrat_400Regular'
    },
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider>
          <Stack.Navigator 
            initialRouteName='Home'
            screenOptions={navigatorStyleOptions}
          >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Plant' component={Plant} />
            <Stack.Screen name='History' component={HistoryLog} />
            <Stack.Screen name='Log' component={Log} />
            {/* <Plant /> */}
            {/* <HistoryLog plantName={'My Plant'} /> */}
            {/* <Log plantName={`My Plant`} /> */}            
          </Stack.Navigator>
      </NativeBaseProvider>      
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
