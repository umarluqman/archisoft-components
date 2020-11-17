import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { StoreProvider } from 'easy-peasy';
import { useStore } from 'config/store';
import theme from 'config/theme';

function MyApp({ Component, pageProps }) {
  console.log('pageProps', pageProps);
  const store = useStore(pageProps.initialReduxState);
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <CSSReset />

        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default MyApp;
