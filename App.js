import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Components/Home';
import Plant from './src/Components/PlantInfo';
import HistoryLog from './src/Components/History';
import Log from './src/Components/Log';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
          <Stack.Navigator initialRouteName='Home'>
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
