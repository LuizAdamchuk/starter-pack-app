import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, View } from 'react-native';

import { useAuth } from '../../hooks/authContext';

import { styles } from './style';
import { api } from '../../services/api';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

export const UserData = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  useFocusEffect(
    useCallback(() => {
      api.get('users/me').then(response => {
        setUserData(response.data);
      });
    }, []),
  );

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const handleUpdateUser = useCallback(() => {
    const parsedData = {
      username: nameInput.length !== 0 ? nameInput : userData.username,
      email: emailInput.length !== 0 ? emailInput : userData.email,
    };
    console.log(`/users/${userData.id}`, { body: parsedData });
    api
      .put(`/users/${userData.id}`, parsedData)
      .then(() => {
        setNameInput('');
        setEmailInput('');
        Alert.alert('Tudo certo', 'Perfil atualizado');
        return navigation.navigate('Home');
      })
      .catch(() => {
        return Alert.alert('Atenção', 'Não foi possível atualizar perfil');
      });
  }, [nameInput, emailInput]);
  return (
    <ScrollView>
      <SafeAreaView />

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              style={styles.input}
              placeholder={userData.username}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={emailInput}
              onChangeText={setEmailInput}
              style={styles.input}
              placeholder={userData.email}
            />
          </View>

          <Button
            variant="primary"
            label="Atualizar"
            onPress={handleUpdateUser}
          />
        </View>
        <Button variant="transparent" label="Sair" onPress={handleSignOut} />
      </View>
    </ScrollView>
  );
};
