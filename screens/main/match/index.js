import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Match from './match';
import Stream from './stream';

const Stack = createNativeStackNavigator();

const MatchStack = ({navigation}) => {
  React.useEffect(() => {}, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Match">
      <Stack.Screen
        name="Match"
        component={Match}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Stream"
        component={Stream}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default MatchStack;
