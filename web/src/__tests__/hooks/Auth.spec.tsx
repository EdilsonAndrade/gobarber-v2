import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

describe('Auth hook', () => {
  it('should signin user', async () => {
    const mockAdapter = new MockAdapter(api);
    const responseData = {
      user: {
        name: 'Edilson',
        email: 'edi@gmail.com',

      },
      token: '1234',
    };
    mockAdapter.onPost('sessions').reply(200, responseData);
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(useAuth, {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'edi@gmail.com',
      password: '123456',
    });
    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@Gobarber_Token', responseData.token);
    expect(setItemSpy).toHaveBeenCalledWith('@Gobarber_User', JSON.stringify(responseData.user));
    expect(result.current.user.email).toEqual('edi@gmail.com');
  });

  it('should get the user from storage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@Gobarber_Token': {
          return '12345';
        }
        case '@Gobarber_User': {
          return JSON.stringify({
            name: 'Edilson',
            email: 'edi@gmail.com',
          });
        }
        default: {
          return null;
        }
      }
    });

    const { result } = renderHook(useAuth, {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('edi@gmail.com');
  });

  it('should signout the user', async () => {
    const signout = jest.spyOn(Storage.prototype, 'removeItem');

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@Gobarber_Token': {
          return '12345';
        }
        case '@Gobarber_User': {
          return JSON.stringify({
            name: 'Edilson',
            email: 'edi@gmail.com',
          });
        }
        default: {
          return null;
        }
      }
    });

    const { result } = renderHook(useAuth, {
      wrapper: AuthProvider,
    });
    act(() => {
      result.current.signOut();
    });

    expect(signout).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should throw new error to no wrapp the content', async () => {
    const { result } = renderHook(useAuth);

    act(() => expect(result.current).toEqual({}));
  });
});
