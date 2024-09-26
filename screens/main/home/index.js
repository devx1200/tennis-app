import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './home';
import Notifications from './notifications';
import Match from '../match';

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation}) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Home}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
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

export default HomeStack;
