import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { IToastMessage } from '../../hooks/ToastContext';
import Toast from './Toast';

interface IToastContainerProps{
  messages:IToastMessage[];
}
const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {
  const messageWithAnimation = useTransition(messages,
    (message) => message.id, {
      from: { right: '-120%', opacity: '0' },
      enter: { right: '0%', opacity: '1' },
      leave: { right: '-120%', opacity: '0' },
    });
  return (
    <Container>
      {messageWithAnimation.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
