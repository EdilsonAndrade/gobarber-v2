import React from 'react';
import logo from '../assets/logo.svg';
import {FiLogIn, FiLock, FiMail} from 'react-icons/fi'
import {Container, Content, Background} from './styles';
import Input from '../components/Input';
import Button from '../components/Button';

const Signin: React.FC = () =>{
  return (
    <Container>

      <Content>
      <img src={logo} alt="logo"/>
      <h2>Faça seu Login</h2>
        <form>

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button type="submit" >Entrar</Button>
          <a href="forgot" >Esqueci minha senha</a>
       </form>

          <a href="create">
            <FiLogIn />
            Criar conta</a>

      </Content>
      <Background></Background>
    </Container>
  )
}

export default Signin;
