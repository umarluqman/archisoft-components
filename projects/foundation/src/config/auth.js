import { useEffect } from 'react';
import Router from 'next/router';
import cookies from 'nookies';
import isServer from 'detect-node';

const logout = (ctx) => {
  if (isServer) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  } else {
    Router.push('/');
  }
};

// eslint-disable-next-line no-unused-vars
export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        Router.push('/');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export const getToken = (ctx) => {
  const tokens = cookies.get(ctx);

  // If there's no token, it means the user is not logged in.
  if (!tokens?.token && !tokens?.refreshToken) {
    return logout(ctx);
  }

  return tokens;
};
