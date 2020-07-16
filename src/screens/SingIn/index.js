import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/authContext';

function initialState() {
  return { user: '', password: '' };
}

export const SingIn = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [values, setValues] = useState(initialState);

  const handleSecureTextEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const handleValidUser = useCallback(
    event => {
      setValues({
        ...values,
        user: event,
      });
    },
    [values],
  );
  const handleValidPassword = useCallback(
    event => {
      setValues({
        ...values,
        password: event,
      });
    },
    [values],
  );

  const handleSignIn = useCallback(async () => {
    await signIn({ email: values.user, password: values.password });
  }, [values]);

  return (
    <ScrollView style={{ backgroundColor: '#666' }}>
      <StatusBar backgroundColor="#666" barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Bem-vindo!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_footer}>E-mail</Text>
          <View style={styles.action}>
            <Feather name="user" size={20} color="#666" />
            <TextInput
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardAppearance="dark"
              placeholder="Insira seu e-mail"
              style={styles.textInput}
              name="user"
              onChangeText={handleValidUser}
            />
          </View>
          <Text style={styles.text_footer}>Senha</Text>
          <View style={styles.action}>
            <Feather name="lock" size={20} color="#666" />
            <TextInput
              secureTextEntry={secureTextEntry}
              keyboardAppearance="dark"
              placeholder="Insira sua senha"
              style={styles.textInput}
              name="password"
              onChangeText={handleValidPassword}
            />
            <TouchableOpacity onPress={handleSecureTextEntry}>
              <Feather
                name={secureTextEntry ? 'eye-off' : 'eye'}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={handleSignIn}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Login</Text>
                <Feather name="log-in" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 16 }}
              onPress={() => navigation.navigate('SignUp')}
            >
              <LinearGradient colors={['#666', '#222']} style={styles.signIn}>
                <Text style={styles.textSign}>Fazer cadastro</Text>
                <Feather name="user-plus" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {},
  header: {
    height: height * 0.3,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    height: height * 0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    paddingVertical: 8,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    padding: 16,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    marginTop: 50,
    width: width * 0.9,
    flex: 1,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  textSign: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 12,
  },
});
