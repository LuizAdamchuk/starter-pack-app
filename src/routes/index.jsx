import React from 'react';

import { View, ActivityIndicator } from 'react-native';

import { RootStackScreen } from './RootScreen.routes';
import { DrawerNavigator } from './DrawerNavigator.routes';
import { useAuth } from '../hooks/authContext';

export const Routes = () => {
  const { data, isLoading, loginValidation } = useAuth();
  console.log(loginValidation);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  return loginValidation ? <DrawerNavigator /> : <RootStackScreen />;
};
