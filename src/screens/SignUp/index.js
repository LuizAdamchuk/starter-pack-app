import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export const SignUp = () => {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [
    secureTextEntryConfirmation,
    setSecureTextEntryConfirmation,
  ] = useState(true);

  const handleSecureTextEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);
  const handleSecureTextEntryConfirmation = useCallback(() => {
    setSecureTextEntryConfirmation(!secureTextEntryConfirmation);
  }, [secureTextEntryConfirmation]);

  return (
    <ScrollView style={{ backgroundColor: '#666' }}>
      <StatusBar backgroundColor="#666" barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Cadastre agora</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_footer}>E-mail</Text>
          <View style={styles.action}>
            <Feather name="mail" size={20} color="#666" />
            <TextInput
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardAppearance="dark"
              placeholder="Insira seu e-mail"
              style={styles.textInput}
            />
          </View>
          <Text style={styles.text_footer}>Nome</Text>
          <View style={styles.action}>
            <Feather name="user" size={20} color="#666" />
            <TextInput
              autoCapitalize="words"
              keyboardAppearance="dark"
              placeholder="Insira seu e-mail"
              style={styles.textInput}
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
            />
            <TouchableOpacity onPress={handleSecureTextEntry}>
              <Feather
                name={secureTextEntry ? 'eye-off' : 'eye'}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.text_footer}>Confirma a senha</Text>
          <View style={styles.action}>
            <Feather name="lock" size={20} color="#666" />
            <TextInput
              secureTextEntry={secureTextEntryConfirmation}
              keyboardAppearance="dark"
              placeholder="Confirme a senha"
              style={styles.textInput}
            />
            <TouchableOpacity onPress={handleSecureTextEntryConfirmation}>
              <Feather
                name={secureTextEntryConfirmation ? 'eye-off' : 'eye'}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Cadastrar</Text>
                <Feather name="check-circle" color="#fff" size={20} />
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
    height: height * 0.2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 1,
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
