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
import {Button} from 'react-native-paper';
import {db, auth} from '../util/firebase';

const windowWidth = Dimensions.get('window').width;

const images = {
  logo: require('../../../assets/res/logo.png'),
  bell: require('../../../assets/home-bell.png'),
};

function NotificationsScreen({navigation}) {
  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  bell: {},
});

export default NotificationsScreen;
