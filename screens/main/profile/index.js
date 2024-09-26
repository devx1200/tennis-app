import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profile from './profile';
import Follow from './follow';
import Notifications from './notifications';
import Privacy from './privacy';
import Support from './support';
import Info from './info';

const Stack = createNativeStackNavigator();

const ProfileStack = ({navigation}) => {
  React.useEffect(() => {}, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Profile}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Follow"
        component={Follow}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
