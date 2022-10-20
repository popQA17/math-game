import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import DevWindow from '../components/devWindow'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [participants, setParticipants] = useState([])
  const router = useRouter()
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const [run, setRun] = useState(false)
  function updateState(){
    setRun(true)
    setTimeout(()=>{
      setRun(false)
    }, 0)
  }
  useEffect(()=>{
    if (window.localStorage.getItem('chakra-ui-color-mode') == "light"){
      window.localStorage.setItem('chakra-ui-color-mode', 'dark')
      window.location.reload()
    }
    audioRef.current.volume = 0.2
  }, [])
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url != '/game'){
        if (url != '/'){
          if (url != '/result'){
            setPlaying(true)
          }
        }
      } else {
        setPlaying(false)
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  useEffect(()=>{
    if (playing){
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [playing])
  function checkExceed(){
    participants.map((participant)=>{
      if (participant.money >= 1000){
        router.push('/result')
      }
    })
  }
  return <>
  <Head>
    <script src="https://fred-wang.github.io/mathml.css/mspace.js"></script>
    <link rel='stylesheet' href='https://fred-wang.github.io/mathml.css/mathml.css'/>
  </Head>
  <ChakraProvider>
    <audio ref={audioRef} loop={true} src={'/background.mp3'}/>
    <DevWindow updateState={updateState} checkExceed={checkExceed} participants={participants} setParticipants={setParticipants}/>
    <Component updateState={updateState} checkExceed={checkExceed} participants={participants} setParticipants={setParticipants} {...pageProps} />
  </ChakraProvider>
  </>
}

export default MyApp
