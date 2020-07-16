import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SingIn } from '../screens/SingIn';
import { SignUp } from '../screens/SignUp';
import { Splash } from '../screens/Splash';

const RootStack = createStackNavigator();

export const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Splash" component={Splash} />
    <RootStack.Screen name="SignIn" component={SingIn} />
    <RootStack.Screen name="SignUp" component={SignUp} />
  </RootStack.Navigator>
);
