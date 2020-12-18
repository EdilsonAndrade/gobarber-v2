import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

import api from '../services/api';

interface ICredential{
  email:string;
  password:string;
}
interface IUserData{
  id:string;
  name:string;
}
interface IUserCredential{
  token:string;
  user:IUserData;
}
interface AuthContextData{
  user:IUserData;
  signIn(credentials:ICredential):Promise<void>;
  signOut():void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider:React.FC = ({ children }) => {
  const [userData, setUserData] = useState<IUserCredential>(() => {
    const token = localStorage.getItem('@Gobarber_Token');
    const user = localStorage.getItem('@Gobarber_User');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as IUserCredential;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { user, token } = response.data;

    localStorage.setItem('@Gobarber_Token', token);
    localStorage.setItem('@Gobarber_User', JSON.stringify(user));
    setUserData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('Gobarber_Token');
    localStorage.removeItem('Gobarber_User');
  }, []);
  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user: userData.user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function useLogout(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export { AuthProvider, useAuth, useLogout };
