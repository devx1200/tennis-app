import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Matches from './matches';
import Match from '../match/match';

const Stack = createNativeStackNavigator();

const MatchesStack = ({navigation}) => {
  React.useEffect(() => {}, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Matches}
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

export default MatchesStack;
