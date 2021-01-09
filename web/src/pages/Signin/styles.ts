import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signinBackgroundimg from '../../assets/sign-in-background.png';

export const Container = styled.div`

width:100%;
display:flex;
align-items:stretch;
justify-content:center;
height:100vh;
`;

export const Content = styled.div`
  margin-top:90px;

  width:100%;
  max-width:700px;

`;
const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity:1;
    transform: translateX(0);
  }
`;
export const AnimatedContent = styled.div`


  flex-direction:column;
  align-items:center;
  display:flex;
  animation: ${appearFromLeft} 1s;
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
`;

export const Background = styled.div`
flex:1;
background: url(${signinBackgroundimg}) no-repeat center;
background-size: cover;
`;
