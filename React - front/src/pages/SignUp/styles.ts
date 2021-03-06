import styled from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImage from '../../assets/1587470786293-attachment.png';

export const Container = styled.div`
  height: 100vh; //forçando que o container tenha toda a ocupação da view height
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center; //justify e align juntos

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  }
  h1 {
    margin-bottom: 24px;
  }

  a {
    color: #f4ede8;
    display:block;
    margin-top: 24px;
    text-decoration: none;

    &:hover {
      color: ${shade(0.2, '#f4ede8')}
    }
  }

  > a { //apenas dentro do content >
    color: #f4ede8;
    display:block;
    margin-top: 24px;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')}
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImage}) no-repeat center; 
  background-size: cover;
`;
