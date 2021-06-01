import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {

  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório!'),
        email: Yup.string().required('Email obrigatório!').email('Email inválido'),
        password: Yup.string().min(6, 'Senha curta demais. Mínimo de seis dígitos!')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      //validar um objeto inteiro
    } catch (err) {
      console.log({ err });
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form initialData={{ name: 'Emerson' }} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="login">
          <FiArrowLeft />
          Voltar para logon
          </a>
      </Content>
    </Container>
  )
}

export default SignIn;