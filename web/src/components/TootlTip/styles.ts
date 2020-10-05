import styled, { css } from 'styled-components';

export const Container = styled.div`
position: absolute;
display: flex;
padding: 10px;
color: #fff;
font-size: 12px;
font-weight: bold;
background:#ffc700;
border-radius:6px;
bottom:calc(100% + 12px);
left:50%;
transform: translateX(-50%);
justify-content:center;
width:160px;

&::before{
  content:'';
  border-style:solid;
  border-color: #ffc700 transparent;
  border-width: 6px 6px 0 6px;
  position:absolute;
  top:100%;
  left:50%;
  transform: translateX(-50%);

}
`;
