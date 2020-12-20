import React, { useEffect } from 'react';
import {
  FiAlertCircle, FiCheck, FiInfo, FiXCircle,
} from 'react-icons/fi';
import { Container } from './styles';
import { IToastMessage, useCloseToast } from '../../../hooks/ToastContext';

interface ToastProps{
  message:IToastMessage;
  style:object;
}

const icons = {
  default: <FiCheck size={24} />,
  error: <FiAlertCircle size={24} />,
  warning: <FiInfo size={24} />,
};
const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { closeMessage } = useCloseToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeMessage(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [closeMessage, message.id]);

  return (
    <Container
      type={message.type}
      style={style}
    >
      {icons[message.type || 'default']}
      <div>
        <strong>{message.title}</strong>
        <small>{message.message}</small>
      </div>
      <button type="button" onClick={() => closeMessage(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
