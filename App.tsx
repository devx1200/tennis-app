import React from 'react';
import { PaperProvider } from 'react-native-paper';

import { LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboard from './screens/onboard';
import Login from './screens/login';
import Signup from './screens/signup';
import Main from './screens/main';

import appStyles from './util/styles'

const Stack = createNativeStackNavigator();


const App = () => {

  React.useEffect(() => {
    (async() => {
      global.appStyles = appStyles
    })()
  },[]);

  return (
    <PaperProvider>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboard">
          <Stack.Screen name="Onboard" component={Onboard} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


export default App;
