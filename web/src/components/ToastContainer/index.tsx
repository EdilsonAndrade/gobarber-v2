import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => (
  <Container>
    <Toast type="default">
      <FiAlertCircle size={18} />
      <div>
        <strong>Aconteceu um erro</strong>
        <small>Não foi possivel efetuar login</small>
      </div>
      <button type="button">
        <FiXCircle size={18} />
      </button>

    </Toast>
    <Toast type="error">
      <FiAlertCircle size={18} />
      <div>
        <strong>Aconteceu um erro</strong>
      </div>
      <button type="button">
        <FiXCircle size={18} />
      </button>

    </Toast>
    <Toast type="warning">
      <FiAlertCircle size={18} />
      <div>
        <strong>Aconteceu um erro</strong>
        <small>Não foi possivel efetuar login</small>
      </div>
      <button type="button">
        <FiXCircle size={18} />
      </button>

    </Toast>
  </Container>
);

export default ToastContainer;
