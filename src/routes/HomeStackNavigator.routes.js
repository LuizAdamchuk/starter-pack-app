import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { Home } from '../screens/Home';

const HomeStack = createStackNavigator();

export const HomeStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#666',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeftContainerStyle: {
          padding: 8,
        },
        headerLeft: () => (
          <Feather
            name="menu"
            size={25}
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Inicio',
        }}
      />
    </HomeStack.Navigator>
  );
};
