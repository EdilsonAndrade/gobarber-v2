import React, { useContext, useEffect } from 'react';
import GlobalStyle from './styles/global';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { AuthContext } from './context/AuthContext';

const App: React.FC = () => {
  const { page, signIn } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      signIn();
    }, 5000);
  }, []);
  return (
    <>

      {page}
      <GlobalStyle />
    </>
  );
};

export default App;
