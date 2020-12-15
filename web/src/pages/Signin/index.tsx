import React from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Signin: React.FC = () => (
  <Container>

    <Content>
      <img src={logo} alt="logo" />
      <h2>Faça seu Login</h2>
      <Form>
        <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
        <Button type="submit">Entrar</Button>
        <a href="forgot">Esqueci minha senha</a>
      </Form>

      <a href="create">
        <FiLogIn />
        Criar conta
      </a>

    </Content>
    <Background />
  </Container>
);

export default Signin;
