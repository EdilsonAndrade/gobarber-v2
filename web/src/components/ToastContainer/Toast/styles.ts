import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps{
  type?:'default' | 'warning' | 'error';
}

const types = {
  default:
    css`
    button{
    color:rgba(56, 210, 82, 1);
    }
      background:rgba(221, 239, 224, 1);
      color:rgba(56, 210, 82, 1);
    `,
  warning: css`
   button{
    color:#2e656a;
    }
    background: #e6fffa;
    color:#2e656a;
  `,
  error: css`
   button{
    color:#c53030;
  }
  background: #fddedd;
  color:#c53030;
  `,
};
export const Container = styled(animated.div)<ToastProps>`
  width:360px;
  position:relative;
  display:flex;
  justify-content:space-around;
  padding:10px;
  border-radius:10px;
  box-shadow:1px 6px 8px rgba(0,0,0,1);
  margin:10px 0;
  div{
    flex:1;
    padding:0 20px;
    display:flex;
    flex-direction:column;
  }

  > svg{
    top:0;
    margin:2px 0;
  }
  button{
    background:none;
    border:none;
    height:0;
    color:rgba(56, 210, 82, 1);
  }
  background:rgba(221, 239, 224, 1);
  color:rgba(56, 210, 82, 1);


  ${(props) => types[props.type || 'default']}
`;
