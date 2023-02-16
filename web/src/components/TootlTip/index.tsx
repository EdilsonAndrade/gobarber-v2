import React from 'react';

import { Container } from './styles';

interface ToolTipProps{
  error: string;
  children?: React.ReactNode
}
const ToolTip: React.FC<ToolTipProps> = ({ error, children }) => (
  <Container>
    {children}
    {error}
  </Container>
);

export default ToolTip;
