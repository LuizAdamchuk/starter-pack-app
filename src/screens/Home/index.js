import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';

export const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text> Home</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};
