import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import DevWindow from '../components/devWindow'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [participants, setParticipants] = useState([])
  useEffect(()=>{
    if (window.localStorage.getItem('chakra-ui-color-mode') == "light"){
      window.localStorage.setItem('chakra-ui-color-mode', 'dark')
      window.location.reload()
    }
  }, [])
  return <>
  <Head>
    <script src="https://fred-wang.github.io/mathml.css/mspace.js"></script>
    <link rel='stylesheet' href='https://fred-wang.github.io/mathml.css/mathml.css'/>
  </Head>
  <ChakraProvider>
    <Component participants={participants} setParticipants={setParticipants} {...pageProps} />
  </ChakraProvider>
  </>
}

export default MyApp
