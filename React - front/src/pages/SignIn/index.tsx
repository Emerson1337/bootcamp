import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles'

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form>
        <h1>Faça seu logon</h1>

        <Input icon={FiMail} name="email" placeholder="E-mail" />

        <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
        <Button type="submit">Enviar</Button>
        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="login">
        <FiLogIn />
        Criar Conta
        </a>
    </Content>
    <Background />
  </Container>
)

export default SignIn;