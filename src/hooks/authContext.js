import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';

export const AuthContext = createContext();

function InitialData() {
  return {
    email: '',
    token: '',
  };
}

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(InitialData);
  const [isLoading, setIsLoading] = useState(true);
  const [loginValidation, setLoginValidation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const signIn = useCallback(({ email, password }) => {
    console.log(email, password);
    if (email === 'teste@teste.com' && password === '123456') {
      setData({ email: email, token: '12345' });
      setLoginValidation(true);
      return;
    } else {
      return console.log('DadosInvalidos');
    }
  }, []);

  const signOut = useCallback(() => {
    setLoginValidation(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ data, isLoading, signIn, loginValidation, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used with an AuthProvider');
  }
  return context;
}
