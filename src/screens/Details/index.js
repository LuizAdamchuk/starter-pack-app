import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Details = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text> Details</Text>
      <Button
        title="Go to Details - Push"
        onPress={() => navigation.push('Details')}
      />
      <Button
        title="Go to Home - Navigate"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go to First Screen"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
