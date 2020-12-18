import React, { createContext, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastData{
  showMessage():void;
  closeMessage():void;
}
const ToastContext = createContext<ToastData>({} as ToastData);

const ToastProvider:React.FC = ({ children }) => {
  const showMessage = () => {
    console.log('show message');
  };

  const closeMessage = () => {
    console.log('close message');
  };
  return (
    <ToastContext.Provider value={{
      showMessage,
      closeMessage,
    }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

function useToast() : ToastData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast, must be in inside ToastContext');
  }

  return context;
}

function useCloseToast() : ToastData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useCloseToast, must be in inside ToastContext');
  }

  return context;
}

export { ToastProvider, useToast, useCloseToast };
