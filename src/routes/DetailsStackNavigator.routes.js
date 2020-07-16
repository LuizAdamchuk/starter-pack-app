import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Details } from '../screens/Details';

const DetailsStack = createStackNavigator();

export const DetailsStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <DetailsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
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
      <DetailsStack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Detalhes',
          headerStyle: {
            backgroundColor: '#666',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </DetailsStack.Navigator>
  );
};
