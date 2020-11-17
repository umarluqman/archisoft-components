/* eslint-disable no-param-reassign */
/**
 * Interceptor only works in client
 */

import { publicAPIList } from 'constants/urlList';

import axios from 'axios';
import cookies from 'nookies';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getToken } from 'config/auth';

import { initializeStore } from './store';

const URL = process.env.NEXT_PUBLIC_HOST;
const instance = axios.create({ baseURL: URL });

instance.interceptors.request.use((request) => {
  if (!publicAPIList.includes(request.url)) {
    const { token } = getToken();

    if (token) {
      request.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  return request;
});

const fetchNewToken = async (failedRequest) => {
  try {
    const {
      data: { baseMessage: { jwtToken, refreshToken } = {} } = {},
    } = await axios(`${URL}/usermgtservice/user/refresh`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get({}).refreshToken}`,
      },
    });

    failedRequest.response.config.headers[
      'Authorization'
    ] = `Bearer ${jwtToken}`;

    if (jwtToken && refreshToken) {
      cookies.set({}, 'token', jwtToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'strict',
      });

      cookies.set({}, 'refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'strict',
      });

      return Promise.resolve();
    }
  } catch (error) {
    initializeStore().getActions()?.logout();
  }
};

createAuthRefreshInterceptor(instance, fetchNewToken, {
  skipWhileRefreshing: false, // enable pending API request to continue with new token
});

export default instance;
