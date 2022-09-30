import '../styles/globals.css'
import Navbar from '@/components/navbar/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from '@/theme/theme'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
