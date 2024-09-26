import * as React from 'react';
import {useState, useCallback} from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {Button, Icon, TextInput} from 'react-native-paper';
import {db, auth} from '../../../util/firebase';

import Header from '../../../components/header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const images = {};

function TournamentsScreen({navigation}) {
  const presentNotifications = async () => {
    navigation.push('Notifications');
  };

  const presentTournament = async id => {
    navigation.push('Tournament', {id});
  };

  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header onPress={presentNotifications} />
      <ScrollView
        style={styles.matchesScrollView}
        showsVerticalScrollIndicator={false}></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
});

export default TournamentsScreen;
