import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './home';
import TournamentsStack from './tournaments';
import LiveStack from './live';
import MatchesStack from './matches';
import ProfileStack from './profile';

const images = {
  home: require('../../assets/menu-home.png'),
  matches: require('../../assets/menu-matches.png'),
  live: require('../../assets/menu-live.png'),
  tournaments: require('../../assets/menu-tournaments.png'),
  profile: require('../../assets/menu-profile.png'),
};

const Tab = createBottomTabNavigator();

export default () => {
  React.useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#42AE60',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          position: 'absolute',
          alignSelf: 'center',
          borderRadius: 10,
          width: '90%',
          marginHorizontal: '5%',
          bottom: 40,
          height: 50,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              style={[styles.icon, {tintColor: color}]}
              source={images.home}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              style={[styles.icon, {tintColor: color}]}
              source={images.matches}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={LiveStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              style={[styles.icon, {tintColor: color}]}
              source={images.live}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Tournament"
        component={TournamentsStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              style={[styles.icon, {tintColor: color}]}
              source={images.tournaments}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <Image
              style={[styles.icon, {tintColor: color}]}
              source={images.profile}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginTop: 40,
  },
});
