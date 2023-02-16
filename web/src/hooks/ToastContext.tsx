import React, {
  createContext, useContext, useState, useCallback,
} from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

export interface IToastMessage{
  id: string;
  title:string;
  message:string;
  type: 'default' | 'error' | 'warning';
}
interface ToastData{
  showMessage(messages:Omit<IToastMessage, 'id'>):void;
  closeMessage(id:string):void;
}
const ToastContext = createContext<ToastData>({} as ToastData);

const ToastProvider:React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const showMessage = useCallback(({ title, message, type }:Omit<IToastMessage, 'id'>) => {
    const newMessage = {
      id: uuid(),
      title,
      message,
      type,
    };
    setMessages((oldMessages) => [...oldMessages, newMessage]);
  }, []);

  const closeMessage = useCallback((id: string) => {
    setMessages((oldMessages) => oldMessages.filter((x) => x.id !== id));
  }, []);
  return (
    <ToastContext.Provider value={{
      showMessage,
      closeMessage,
    }}
    >
      {children}
      <ToastContainer messages={messages} />
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
