import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => ({
  useField() {
    return {
      defaultValue: 'nothing',
      fieldName: 'name',
      error: null,
      registerField: jest.fn(),
    };
  },
}));
describe('Input component', () => {
  it('should be able to render input', () => {
    const { getByPlaceholderText } = render(<Input name="email" placeholder="E-mail" />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should be able to set focus on password input', async () => {
    const { getByPlaceholderText } = render(
      <>
        <Input name="email" placeholder="E-mail" />
        <Input name="password" placeholder="Password" />
      </>,
    );
    getByPlaceholderText('E-mail').focus();
    getByPlaceholderText('Password').focus();

    await waitFor(() => expect(document.activeElement).toBe(getByPlaceholderText('Password')));
  });

  it('should be able to show that the password input is not focused', async () => {
    const { getByPlaceholderText } = render(
      <>
        <Input name="email" placeholder="E-mail" />
        <Input name="password" placeholder="Password" />
      </>,
    );
    getByPlaceholderText('E-mail').focus();

    await waitFor(() => expect(document.activeElement).not.toBe(getByPlaceholderText('Password')));
  });

  it('should be able to show different styling when focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    getByPlaceholderText('E-mail').focus();
    const container = getByTestId('inputContainer');

    expect(container).toHaveStyle('color:#FF9000');
  });

  it('should not show the same style when blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    getByPlaceholderText('E-mail').blur();

    const container = getByTestId('inputContainer');
    expect(container).not.toHaveStyle('color:#FF9000');
  });
});
