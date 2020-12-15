import React, { createContext, useState } from 'react';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

interface AuthContextData{
  name:string;
  signIn():void;
  page: React.ReactNode;
  step: 'Login' | 'Forget' | 'Signup';
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider:React.FC = ({ children }) => {
  const [page, setPage] = useState<React.ReactNode>(<Signin />);

  const signIn = () => {
    setPage(<Signup />);
  };

  return (
    <AuthContext.Provider value={{
      name: 'Edilson',
      signIn,
      page,
      step: 'Login',

    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
