import { StyleSheet } from "react-native";
// import { fadeAnim } from "../Components/Home";

const styles =  StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  componentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
    width: 250,
    height: 50,
    backgroundColor: '#7ed957',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
  cancelLogin: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
  signOut: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    margin: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Montserrat_400Regular',
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular',
  },
  bgImage: {
    flex: 1,
    zIndex: -1,
    position: "absolute",
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    // flex: 1,
    fontSize: 72,
    textAlign: 'center',
    color: 'white',
  },
  subtitle: {
    // flex: 1,
    fontSize: 36,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    color: 'white',
  }, 
  gradient: {
    flex: 1,
    zIndex: 0,
    position: "absolute",
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 48,
    fontFamily: 'Montserrat_400Regular',
    justifyContent: 'center',
    color: 'white',
  },
  label: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 24,
    color: 'white'
  },
  progress: {
    marginBottom: 50
  },
  buttons: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#c1ff72',
    justifyContent: 'center',
    margin: 5
  },
  smButtons: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#c1ff72',
    justifyContent: 'center',
    margin: 5
  },
  waterNow: {
    width: 250,
    height: 50,
    backgroundColor: '#7ed957',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#c1ff72',
    justifyContent: 'center',
    margin: 5
  }
})

export default styles