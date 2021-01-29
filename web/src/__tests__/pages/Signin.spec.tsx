import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import React from 'react';
import Signin from '../../pages/Signin';

const mockedHistoryPush = jest.fn();
const mockedSignin = jest.fn();

const mockedShowMesage = jest.fn();
jest.mock('../../hooks/ToastContext', () => ({
  useToast: () => ({
    showMessage: mockedShowMesage,
  }),
}));

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: ({ children } : {children: React.ReactNode}) => children,
}));

jest.mock('../../hooks/AuthContext', () => ({
  useAuth: () => ({
    signIn: mockedSignin,
  }),
}));
describe('Signin Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it('should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const button = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'edilson.a.andrade@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '123445646' } });
    fireEvent.click(button);

    await waitFor(() => {
      (expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard'));
    });
  });

  it('should not be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const button = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'edilson.a.andradeil.com' } });
    fireEvent.change(passwordField, { target: { value: '123445646' } });
    fireEvent.click(button);

    await waitFor(() => {
      (expect(mockedHistoryPush).not.toHaveBeenCalledWith('/dashboard'));
    });
  });

  it('should throw an error message', async () => {
    mockedSignin.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<Signin />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const button = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'edilson.a@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '123445646' } });
    fireEvent.click(button);

    await waitFor(() => {
      (expect(mockedShowMesage).toHaveBeenCalledWith(expect.objectContaining({
        type: 'error',
      })));
    });
  });
});
