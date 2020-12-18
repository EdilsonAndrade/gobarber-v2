import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/Signin';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => (
  <>

    <Signin />
    <GlobalStyle />
    <ToastContainer />
  </>
);

export default App;
