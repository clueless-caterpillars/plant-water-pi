import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Damion_400Regular } from "@expo-google-fonts/damion";
import axios from 'axios';
import Constants from 'expo-constants'
import Home from './src/Components/Home';
import Plant from './src/Components/PlantInfo';
import HistoryLog from './src/Components/History';
import Log from './src/Components/Log';

import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);
import { withAuthenticator } from '@aws-amplify/ui-react-native';

const Stack = createNativeStackNavigator();

const API_URL = Constants.manifest.extra.API_URL

function App() {
  
  const getData = async () => {
    console.log('from the URL', API_URL);
    try {
      const response = await axios.get(API_URL);
      console.log('data from the request', response.data);
    } catch (error) {
      console.error(error);
    }
  };
  getData();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Damion_400Regular
  })

  if (!fontsLoaded) {
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

// export default App;
export default withAuthenticator(App);
