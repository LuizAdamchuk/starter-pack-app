import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { mask as masker, unMask } from 'remask';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik';

import logo from '../../assets/logo.png';
import Colors from '../../constants/Colors';
import { useAuth } from '../../hooks/authContext';
import { validateEmail } from '../../utils/Validation';

const { height, width } = Dimensions.get('window');

export const SignUp = () => {
  const { signUp } = useAuth();
  const navigation = useNavigation();

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [nameValidation, setNameValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);

  const [passwordEquals, setPasswordEquals] = useState(true);
  const [
    secureTextEntryConfirmation,
    setSecureTextEntryConfirmation,
  ] = useState(true);

  const [loading, setLoading] = useState(true);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [selectedState, setSelectedState] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [maskCpfValue, setMaskCpfValue] = useState('');
  const formik = useFormik({
    initialValues: {
      user: {
        name: '',
        email: '',
        cpf: '',
        birthday: '',
        phone: '',
        address: '',
        password: '',
        state: 0,
        city: 0,
      },

      passwordConfirmation: '',
      states: '',
      cities: '',
      terms: false,
    },
  });

  const placeholderState = {
    label: 'Estado',
    value: null,
  };
  const placeholderCities = {
    label: 'Cidades',
    value: null,
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const handleMaskCpfValue = useCallback(ev => {
    const originalValue = unMask(ev.nativeEvent.text);
    const maskedValue = masker(originalValue, ['999.999.999-99']);
    setMaskCpfValue(maskedValue);
  }, []);

  const handleSecureTextEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const handleSecureTextEntryConfirmation = useCallback(() => {
    setSecureTextEntryConfirmation(!secureTextEntryConfirmation);
  }, [secureTextEntryConfirmation]);

  const handleSubmit = useCallback(async () => {
    setNameValidation(true);
    setEmailValidation(true);

    if (
      formik.values.name === undefined ||
      formik.values.password === undefined ||
      formik.values.email === undefined
    ) {
      return Alert.alert('Preencha todos os campos!');
    }

    const userData = {
      username: formik.values.name.trim(),
      email: formik.values.email.trim(),
      password: formik.values.password.trim(),
    };

    if (userData.password.length >= 6) {
      if (userData.password === formik.values.passwordConfirmation) {
        setPasswordEquals(true);
      } else {
        setPasswordEquals(false);

        return Alert.alert('Por favor, confira a senha.');
      }
    } else {
      setPasswordEquals(false);
      return Alert.alert('A senha deve ter mais de 6 dígitos. ');
    }

    if (userData.username.length <= 12) {
      setNameValidation(false);
      return Alert.alert('Insira seu nome completo');
    }
    if (validateEmail(userData.email) === false) {
      setEmailValidation(false);
      return Alert.alert('E-mail inválido.');
    }

    const res = await signUp(userData);

    if (res.status === 200) {
      return navigation.navigate('SignIn');
    } else {
      return Alert.alert(
        'Algo deu errado',
        'Confira os valores e tente novamente',
      );
    }
  }, [formik]);

  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={32} color={Colors.black} />
            <Text style={styles.textHeader}>Voltar</Text>
          </TouchableOpacity>

          <View style={{ alignSelf: 'center', paddingVertical: 24 }}>
            <Image
              style={styles.headerImg}
              resizeMode="contain"
              source={logo}
            />
            <Text style={styles.textTitleHeader}>Cadastrar</Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? -(height * 0.15) : -height
          }
        >
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <View style={styles.containerSeparatorStyle}>
              <View style={styles.separatorStyle} />
            </View>

            <View
              style={
                nameValidation
                  ? styles.inputContainer
                  : styles.inputContainerWrong
              }
            >
              <Feather
                name="user"
                size={20}
                color={nameValidation ? '#666' : '#F85568'}
              />
              <TextInput
                name="name"
                autoCapitalize="words"
                keyboardAppearance="dark"
                textContentType="name"
                keyboardType="default"
                placeholder="Nome Completo"
                style={styles.textInput}
                onChangeText={formik.handleChange('name')}
                value={formik.values.name}
              />
            </View>

            <View
              style={
                emailValidation
                  ? styles.inputContainer
                  : styles.inputContainerWrong
              }
            >
              <Feather
                name="mail"
                size={20}
                color={emailValidation ? '#666' : '#F85568'}
              />
              <TextInput
                name="email"
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                keyboardAppearance="dark"
                placeholder="E-mail"
                style={styles.textInput}
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
              />
            </View>

            <View
              style={
                passwordEquals
                  ? styles.inputContainer
                  : styles.inputContainerWrong
              }
            >
              <Feather
                name="lock"
                size={20}
                color={passwordEquals ? '#666' : '#F85568'}
              />
              <TextInput
                name="password"
                secureTextEntry={secureTextEntry}
                keyboardAppearance="dark"
                textContentType="password"
                keyboardType="default"
                placeholder="Insira sua senha"
                style={styles.textInput}
                onChangeText={formik.handleChange('password')}
                value={formik.values.password}
              />
              <TouchableOpacity onPress={handleSecureTextEntry}>
                <Feather
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <View
              style={
                passwordEquals
                  ? styles.inputContainer
                  : styles.inputContainerWrong
              }
            >
              <Feather
                name="lock"
                size={20}
                color={passwordEquals ? '#666' : '#F85568'}
              />
              <TextInput
                name="passwordConfirmation"
                secureTextEntry={secureTextEntryConfirmation}
                keyboardAppearance="dark"
                textContentType="password"
                keyboardType="default"
                placeholder="Confirme a senha"
                style={styles.textInput}
                onChangeText={formik.handleChange('passwordConfirmation')}
                value={formik.values.passwordConfirmation}
              />
              <TouchableOpacity onPress={handleSecureTextEntryConfirmation}>
                <Feather
                  name={secureTextEntryConfirmation ? 'eye-off' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonSignUp}
                onPress={handleSubmit}
              >
                <Text style={styles.textButtonSignUp}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};
const pickerStyleIOS = {
  inputIOS: {
    fontSize: 18,
    flexDirection: 'row',
    marginTop: 8,
    padding: 8,
    alignItems: 'center',
  },
  placeholder: {
    fontWeight: '400',
  },
  iconContainer: {
    right: 15,
    top: Platform.OS == 'ios' && 18,
  },
};
const pickerStyleAndroid = {
  inputAndroid: {
    fontSize: 18,
    flexDirection: 'row',
    marginTop: 8,
    padding: 8,
    alignItems: 'center',
  },
  inputIOS: {
    color: '#666',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    fontWeight: '400',
  },
  iconContainer: {
    right: 15,
    top: Platform.OS == 'android' && 26,
  },
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  header: {
    height: height * 0.22,
    justifyContent: 'flex-start',
  },
  headerImg: {
    alignSelf: 'center',
    width: 200,
    height: 80,
  },
  headerContent: {},
  textTitleHeader: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 32,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  textHeader: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
  },
  containerSeparatorStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    marginTop: 40,
  },

  separatorStyle: {
    backgroundColor: Colors.primary,
    height: 8,
    width: 8,
    alignSelf: 'center',
    transform: [{ rotate: '45deg' }],
    marginBottom: -4,
  },
  footer: {
    flex: 1,
    marginTop: 24,
    marginBottom: 16,
  },
  selectors: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  selectorsWrong: {
    borderBottomColor: '#F85568',
    borderBottomWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    padding: 8,
    alignItems: 'center',
  },
  inputContainerWrong: {
    flexDirection: 'row',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F85568',
    padding: 8,
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 48,
    width: 288,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonSignUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  textButtonSignUp: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: 75,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
