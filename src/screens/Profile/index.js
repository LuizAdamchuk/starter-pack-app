import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
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
