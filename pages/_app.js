import '../styles/globals.css'
import Navbar from '@/components/navbar/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from '@/theme/theme'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { HelmetProvider } from 'react-helmet-async'
function MyApp({ Component, pageProps }) {
  const helmetContext = {}
  return (
    <>
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Component {...pageProps} />
          </ThemeProvider>
        </HelmetProvider>
      </Provider>
    </>
  )
}

export default MyApp
