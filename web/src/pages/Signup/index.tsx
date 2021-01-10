import React, { useCallback, useRef } from 'react';
import {
  FiUser, FiArrowLeft, FiLock, FiMail,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import {
  Container, Content, AnimatedContent, Background,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import handleErrros from '../../utils/handleErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';

interface ICredential{
  name:string;
  email:string;
  password:string;
}
const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { showMessage } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: ICredential) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite e-mail válido'),
        password: Yup.string().min(6, 'Mínimo 6 caracteres'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('/users', data);

      showMessage({
        title: 'Cadastro com sucesso',
        message: 'Você conseguiu se cadastrar, agora pode realizar o logon',
        type: 'default',
      });
      history.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(handleErrros(error));
        return;
      }

      showMessage({
        title: 'Ocorreu um erro',
        message: 'Ocorreu um erro ao fazer cadastro, tente novamente!',
        type: 'error',
      });
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContent>
          <img src={logo} alt="logo" />
          <h2>Faça seu cadastro</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar

          </Link>
        </AnimatedContent>
      </Content>

    </Container>
  );
};

export default Signup;
