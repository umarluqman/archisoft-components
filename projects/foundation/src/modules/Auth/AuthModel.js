import { action, thunk } from 'easy-peasy';
import x from 'config/interceptor';
import cookies from 'nookies';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';

const Auth = {
  loginError: '',
  setLoginError: action((state, payload) => {
    state.loginError = payload;
  }),

  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),

  accessLeve: {},
  setAccessLevel: action((state, payload) => {
    state.accessLevel = payload;
  }),

  token: '',
  refreshToken: '',
  setAuthToken: action((state, payload) => {
    console.log('payload', payload);
    state.token = payload.token;
    state.refreshToken = payload.refreshToken;
  }),

  login: thunk(async (actions, { userId, password }) => {
    try {
      //first authentication
      const { data } = await x.post('/usermgtservice/user/authenticate', {
        userName: userId,
        password,
      });

      if (data.statusCode === '999') {
        throw actions.setError(data.errorDescription);
      }

      //second authentication
      const response = await x.post(
        '/usermgtservice/user/profauth',
        {
          companyId: data.baseMessage.companyId,
          userName: data.baseMessage.userName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.baseMessage.jwtToken}`,
          },
        }
      );

      const {
        data: { statusCode = '', errorDescription = '' },
      } = response;

      if (statusCode === '999') {
        throw actions.setError(errorDescription);
      }

      const {
        data: {
          baseMessage: { jwtToken: token, refreshToken, ...others },
        },
      } = response;

      console.log('others', others);

      actions.setUser(others);

      actions.setAuthToken({
        token,
        refreshToken,
      });

      const { type } = jwtDecode(token);

      if (type !== '0') {
        return actions.setError(
          'You have entered an invalid User ID or Password'
        );
      }

      cookies.set({}, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'strict',
      });
      cookies.set({}, 'refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'strict',
      });
      Router.replace('/dashboard');
    } catch (error) {
      console.log('error', error);
      actions.setLoginError(error);
    }
  }),

  logout: thunk((_, __, { getStoreActions }) => {
    window.localStorage.setItem('logout', Date.now());
    getStoreActions().resetStore();
    cookies.destroy({}, 'token', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'strict',
    });
    cookies.destroy({}, 'refreshToken', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'strict',
    });
  }),
};

export default Auth;
