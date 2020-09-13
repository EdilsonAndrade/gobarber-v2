import React from 'react';
import logo from '../assets/logo.svg';
import {FiUser, FiArrowLeft, FiLock, FiMail} from 'react-icons/fi'
import {Container, Content, Background} from './styles';
import Input from '../components/Input';
import Button from '../components/Button';

const Signup: React.FC = () =>{
  return (
    <Container>
 <Background></Background>
      <Content>
      <img src={logo} alt="logo"/>
      <h2>Faça seu cadastro</h2>
        <form>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button type="submit" >Cadastrar</Button>
       </form>

          <a href="back">
            <FiArrowLeft />
            Voltar</a>

      </Content>

    </Container>
  )
}

export default Signup;
