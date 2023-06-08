import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { Damion_400Regular } from "@expo-google-fonts/damion";

import Home from './src/Components/Home';
import Signup from './src/Components/Signup';
import Plant from './src/Components/PlantInfo';
import HistoryLog from './src/Components/History';
import Log from './src/Components/Log';

import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

// generate Amplify settings object for Cognito user pool 
Amplify.configure({
  Auth: {
    identityPoolId: 'us-west-2:5ae0523b-26ad-4ee1-b08a-2de7bd2cd97b',
    region: 'us-west-2',
    userPoolId: 'us-west-2_iexBVW8r0',
    userPoolWebClientId: '4r8dtn8t1irf8b4i5gnf64pt8c',
    mandatorySignIn: false,
    signUpVerificationMethod: 'code',
    oauth: {
      domain: 'https://plant-pal.auth.us-west-2.amazoncognito.com',
      scope: [
        'email',
        'openid',
        'phone',
      ],
      redirectSignIn: 'exp://localhost:19000/--/',
      responseType: 'code',
    },
  },
});

const currentConfig = Auth.configure();


const Stack = createNativeStackNavigator();

function App({ signOut, user }) {

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
          <Stack.Screen name='Signup' component={Signup} />
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

export default withAuthenticator(App);