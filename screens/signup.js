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

function SignupScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const goBack = async () => {
    navigation.goBack();
  };

  const toggleTerms = async () => {
    setTerms(!terms);
  };

  const signup = async () => {
    navigation.push('Main');
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
          <Text style={styles.headerText}>CREATE YOUR TENNIS TV ID</Text>
          <Text style={styles.subText}>
            Watch your favorite tennis matches from across the country live from
            your device
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            textColor="#000000"
            contentStyle={{backgroundColor: '#F4F4F4'}}
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            textColor="#000000"
            contentStyle={{backgroundColor: '#F4F4F4'}}
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
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
            contentStyle={{backgroundColor: '#F4F4F4'}}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Text style={styles.passwordText}>
            Password must be at least 8 character long and include 1 capital
            letter and 1 symbol
          </Text>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.termsContainer}>
            <IconButton
              icon={
                terms ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
              }
              iconColor={'gray'}
              size={20}
              onPress={toggleTerms}
            />
            <Text style={styles.termsText}>
              I agree to the Terms and Privacy Policy
            </Text>
          </View>

          <Button
            style={[styles.button, {marginBottom: 10}]}
            contentStyle={{paddingVertical: 10}}
            mode="contained"
            buttonColor="#150000"
            textColor="#FFFFFF"
            onPress={signup}>
            CREATE ACCOUNT
          </Button>

          <Text style={styles.agreeText}>
            By agreeing to the above terms, you are consenting that your
            personal information will be collected, stored, and processed in the
            United States and the European Union on behalf of Tennis TV LLC
          </Text>
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
  },
  passwordText: {
    fontSize: 14,
    color: '#525252',
  },
  footerContainer: {},
  termsContainer: {
    flexDirection: 'row',
  },
  termsText: {
    marginTop: 14,
    fontSize: 14,
  },
  button: {
    alignSelf: 'center',
    width: '95%',
    marginTop: 20,
  },
  agreeText: {
    color: '#5B5757',
  },
});

export default SignupScreen;
