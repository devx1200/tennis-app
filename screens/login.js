import * as React from 'react';
import {useState, useEffect} from 'react';
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
import {Button, IconButton, TextInput} from 'react-native-paper';
import {db, auth} from '../util/firebase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const images = {
  logo: require('../assets/res/logo-white.png'),
};

function LoginScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const goBack = async () => {
    navigation.goBack();
  };

  const forgot = async () => {};

  const login = async () => {
    navigation.push('Main');
  };

  const signup = async () => {
    navigation.push('Signup');
  };

  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={'position'}
      keyboardVerticalOffset={-240}>
      <View style={styles.headerContainer}>
        <View style={styles.backContainer}>
          <IconButton
            style={{marginLeft: -20, marginTop: -10}}
            icon={'chevron-left'}
            iconColor={'#FFFFFF'}
            size={50}
            onPress={goBack}
          />
          <Image style={styles.logo} source={images.logo} />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>SIGN IN TO YOUR TENNIS TV ID</Text>
          <Text style={styles.subText}>
            Your tennis TV ID is unique to you as a user and lets you have
            access to all of the games!
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            textColor="#000000"
            contentStyle={{backgroundColor: '#F4F4F4'}}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            textColor="#000000"
            secureTextEntry={true}
            contentStyle={{backgroundColor: '#F4F4F4'}}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={forgot}>
            <Text style={styles.passwordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Button
            style={[styles.button, {marginBottom: 10}]}
            contentStyle={{paddingVertical: 10}}
            mode="contained"
            buttonColor="#150000"
            textColor="#FFFFFF"
            onPress={login}>
            SIGN IN
          </Button>

          <Text style={styles.termsText}>
            Your account is now Tennis TV ID. If you’ve signed into the app
            before, use the same credentials here otherwise
          </Text>

          <Text style={styles.orText}>OR</Text>

          <Button
            style={[styles.button, {marginBottom: 10}]}
            contentStyle={{paddingVertical: 10}}
            mode="contained"
            buttonColor="#D6D5D5"
            textColor="#000000"
            onPress={signup}>
            SIGNUP
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#42AE60',
  },
  backContainer: {
    flexDirection: 'row',
  },
  logo: {},
  headerTextContainer: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentContainer: {
    margin: 20,
  },
  input: {
    marginBottom: 20,
    color: 'black',
  },
  passwordText: {
    textAlign: 'right',
    fontSize: 14,
    color: '#525252',
    textDecorationLine: 'underline',
  },
  footerContainer: {
    alignItems: 'center',
  },
  termsText: {
    marginTop: 14,
    fontSize: 14,
  },
  orText: {
    color: '#5B5757',
    fontSize: 16,
    fontWeight: '900',
  },
  button: {
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  agreeText: {
    color: '#5B5757',
  },
});

export default LoginScreen;
