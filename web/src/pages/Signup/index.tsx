import React, { useCallback, useRef, useContext } from 'react';
import {
  FiUser, FiArrowLeft, FiLock, FiMail,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import handleErrros from '../../utils/handleErrors';
import { AuthContext } from '../../context/AuthContext';

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useContext(AuthContext);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite e-mail válido'),
        password: Yup.string().min(6, 'Mínimo 6 caracteres'),
      });
      signIn();
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      formRef.current?.setErrors(handleErrros(error));
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="logo" />
        <h2>Faça seu cadastro</h2>
        <Form ref={formRef} onSubmit={handleSubmit}>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="back">
          <FiArrowLeft />
          Voltar

        </a>

      </Content>

    </Container>
  );
};

export default Signup;
