import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';

import Home from './src/Components/Home';
import Plant from './src/Components/PlantInfo';
import HistoryLog from './src/Components/History';
import Log from './src/Components/Log';

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {/* <Home /> */}
        {/* <Plant /> */}
        {/* <HistoryLog plantName={'My Plant'} /> */}
        <Log plantName={`My Plant`} />
      </View>      
    </NativeBaseProvider>
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
