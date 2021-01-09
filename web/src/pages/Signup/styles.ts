import styled from 'styled-components';
import { shade } from 'polished';
import signupBrackgroud from '../../assets/sign-up-background.png';

export const Container = styled.div`

width:100%;
display:flex;
align-items:stretch;
justify-content:center;
height:100vh;
`;

export const Content = styled.div`
  flex-direction:column;
  align-items:center;
  justify-content:center;
  display:flex;

  h2{
    margin-top:100px;
    text-align: center;
  }
  form{
    margin-top:10px;
    display:flex;
    flex-direction:column;
    align-items:center;




      a{
    color:#F4EDE8;
    margin-top:24px;
    transition: color 0.2s;
    display:block;
    :hover{
      color: ${shade(0.2, '#F4EDE8')}
    }
  }



  }
  >a{
    color: #FF9000;
    margin-top:80px;
    transition: color 0.2s;
    display:block;
    :hover{
      color: ${shade(0.2, '#FF9000')}
    }

    svg{
      margin-right:18.5px;
      font-size:16px;
      color: #FF9000;
    }
  }

  width:100%;
  max-width:700px;

`;
export const Background = styled.div`
flex:1;
background: url(${signupBrackgroud}) no-repeat center;
background-size: cover;
`;
