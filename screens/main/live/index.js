import * as React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Live from './live';
import Match from '../match/match';

const Stack = createNativeStackNavigator();

const LiveStack = ({navigation}) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Live}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Match"
        component={Match}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default LiveStack;
