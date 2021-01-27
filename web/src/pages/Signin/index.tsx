import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import {
  Container, Content, AnimatedContent, Background,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import handleErrros from '../../utils/handleErrors';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

interface ICredential{
  email:string;
  password:string;
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { showMessage } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(async (data: ICredential) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite e-mail válido'),
        password: Yup.string().min(6, 'Mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      console.log('aqui');
      await signIn({ email: data.email, password: data.password });

      history.push('/dashboard');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(handleErrros(error));
        return;
      }

      showMessage({
        title: 'Ocorreu um erro',
        message: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        type: 'error',
      });
    }
  }, [signIn, showMessage]);

  return (
    <Container>

      <Content>
        <AnimatedContent>
          <img src={logo} alt="logo" />

          <h2>Faça seu Login</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimatedContent>
      </Content>
      <Background />
    </Container>
  );
};

export default Signin;
