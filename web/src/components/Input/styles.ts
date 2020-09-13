import styled from 'styled-components';

export const Container = styled.div`
display:flex;
padding:10px;
justify-content:center;
align-items:center;
width:100%;
border:2px solid #232129;
margin-top:20px;
background: #232129;
color: #666360;
width:340px;
height:56px;
border-radius:10px;
svg{
  margin-right:5px;
}
input{
  color: #F4EDE8;
  flex:1;
  border:none;
  background: transparent;
    ::placeholder{
      color:#666360;
      font-size:16px;

      }

    }

`;

