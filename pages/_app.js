import '../styles/globals.css'
import Navbar from '../src/components/navbar/Navbar'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
