import * as React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import {db, auth} from '../util/firebase';

const windowWidth = Dimensions.get('window').width;

const images = {
  logo: require('../assets/res/logo.png'),
  player: require('../assets/home-player.png'),
  vector: require('../assets/home-vector.png'),
};

function StartScreen({navigation}) {
  const login = async () => {
    navigation.push('Login');
  };

  const signup = async () => {
    navigation.push('Signup');
  };

  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Image style={styles.logo} source={images.logo} />
          <Image style={styles.vector} source={images.vector} />
          <Image style={styles.player} source={images.player} />
        </View>
      </View>

      <View>
        <View style={styles.textContainer}>
          <Text style={styles.introText}>KEEP AN EYE ON THE STADIUM</Text>
          <Text style={styles.subText}>
            Watch your favorite tennis matches from across the country live from
            your device
          </Text>
        </View>

        <Button
          style={[styles.button, {marginBottom: 10}]}
          contentStyle={{paddingVertical: 10}}
          mode="contained"
          buttonColor="#42AE60"
          textColor="#FFFFFF"
          onPress={login}>
          LOGIN
        </Button>

        <Button
          style={styles.button}
          mode="contained"
          contentStyle={{paddingVertical: 10}}
          buttonColor="rgba(0, 0, 0, 0.05)"
          textColor="#150000"
          onPress={signup}>
          CREATE ACCOUNT
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    width: 200,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  vector: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    resizeMode: 'contain',
  },
  player: {
    position: 'absolute',
    resizeMode: 'contain',
    width: windowWidth,
  },
  textContainer: {
    margin: 20,
  },
  introText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#150000',
  },
  subText: {
    fontSize: 16,
  },
  button: {
    alignSelf: 'center',
    width: '90%',
    //height: 48,
    //borderRadius: 10
  },
});

export default StartScreen;
