import styled, { css } from 'styled-components';

interface ContainerProps{
  errorMessage: string | undefined;
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  showToolTip?: boolean;
}
export const Container = styled.div<ContainerProps>`
display:flex;
padding:10px;
justify-content:center;
align-items:center;
width:100%;
margin-top:20px;
width:340px;
height:56px;
border-radius:10px;
border:2px solid #232129;
background: #232129;
color: #666360;

${(props) => props.isErrored
&& css`
border:2px solid #772530;
`}


${(props) => props.isFocused
&& css`
border:2px solid #FF9000;
color: #FF9000;
`}

${(props) => props.isFilled
&& css`
color: #FF9000;
  svg{
    margin:0;
  }
`}

svg{
  margin-right:5px;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px  #232129 inset;
}
input{

  color: #F4EDE8;
  flex:1;
  margin-right:5px;
  border:none;
  background: transparent;
    ::placeholder{
      color:#666360;
      font-size:16px;

      }

    }

    strong{
      color: ${(props) => (props.errorMessage ? '#710' : 'transparent')}
    }

`;

export const Error = styled.div`
  position: relative;
  div{
    opacity:0;
    visibility:hidden;
    background:#c53030;
    color:#fff;
    &::before{
      border-color:#c53030 transparent;
    }
  }

  &:hover div{
    transition: opacity 1s;
    opacity:1;
    visibility:visible;
  }
`;
