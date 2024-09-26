import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Tournaments from './tournaments';
import Match from '../match/match';

const Stack = createNativeStackNavigator();

const TournamentsStack = ({navigation}) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Tournaments}
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

export default TournamentsStack;
