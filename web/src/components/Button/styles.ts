import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.button`
        width:340px;
        margin-top:24px;
        background:#FF9000;
        padding:16px;
        border-radius:10px;
        font-size:16px;
        font-weight:500;
        transition: background-color 0.2s;
        :hover{
          background: ${shade(0.2,'#FF9000')}
        }
`;

