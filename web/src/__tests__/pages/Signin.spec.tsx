import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import React from 'react';
import Signin from '../../pages/Signin';

const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: () => (mockedHistoryPush),
  }),
  Link: ({ children } : {children: React.ReactNode}) => children,
}));

jest.mock('../../hooks/AuthContext', () => ({
  useAuth: () => ({
    signIn: jest.fn(),
  }),
}));
describe('Signin Page', () => {
  it('should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const button = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'edilson.a.andrade@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '1234' } });
    fireEvent.click(button);

    await waitFor(() => { (expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard')); });
  });
});
