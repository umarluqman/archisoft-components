import React from 'react';
import { Button } from '@chakra-ui/core';
import { useStoreActions, useStoreState, useStoreRehydrated } from 'easy-peasy';
import { withAuthSync, getToken } from 'config/auth';
import { initializeStore } from 'config/store';
import { useProfileImage } from 'modules/MyAccount/hooks';
import Router from 'next/router';
import cookies from 'nookies';

const Dashboard = () => {
  const rehydrated = useStoreRehydrated();
  const { resetStore } = useStoreActions((actions) => actions);

  const logout = () => {
    resetStore();
    window.localStorage.setItem('logout', Date.now());
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
  };

  const { status, data, error, isFetching } = useProfileImage();

  console.log({ status, data, error, isFetching });

  // console.log('token', token);

  return rehydrated ? (
    <>
      <div>This is dashboard</div>
      <Button onClick={logout}>Log out</Button>
    </>
  ) : (
    'Loading'
  );
};

export async function getServerSideProps(context) {
  const { token } = getToken(context);

  console.log('tokens.token in gSSP', token);

  return {
    props: {
      token,
    }, // will be passed to the page component as props
  };
}

export default withAuthSync(Dashboard);
