import { createStore, action, persist } from 'easy-peasy';
import Auth from 'modules/Auth/AuthModel';
import { useMemo } from 'react';

const model = {
  ...Auth,
};

function initStore(preloadedState = {}) {
  return createStore(
    persist(
      {
        ...model,
        resetStore: action(() => ({
          ...preloadedState,
        })),
      },
      {
        whitelist: ['user'],
      }
    ),
    {
      preloadedState,
      name: 'Foundation',
    }
  );
}

/**
 * For server or client
 */

let store;
export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export default model;

/**
 * For client
 */
export const useStore = (initialState) => {
  const clientStore = useMemo(() => initializeStore(initialState), [
    initialState,
  ]);

  return clientStore;
};
