import { VStack, Text, Box, HStack, Button, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip, Spacer, Input, useToast, FormControl, FormHelperText, InputGroup, InputLeftElement, InputRightElement, InputLeftAddon, InputRightAddon, Heading, Image, Icon } from "@chakra-ui/react";
import questions from './questions'
import { useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { FaCheckCircle, FaClock, FaEraser, FaFrown, FaPen, FaRedo, FaTimesCircle, FaTrash, FaUndo, FaUndoAlt } from 'react-icons/fa'
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
export default function QuestionCard({question, participant, close}) {
    const [text, setText]= useState("")
    const canvasRef = useRef()
    const [eraserWidth, setEraserWidth] = useState(10)
    const [penWidth, setPenWidth] = useState(4)
    const [eraser, setEraser] = useState(false)
    const [time, setTime] = useState(60)
    const [answer, setAnswer] = useState('')
    const [playing, setPlaying] = useState(true)
    const toast = useToast()
    const [intervalTime, setIntervalTime] = useState(null)
    useEffect(()=>{
        var words = question.question.split(' ')
        const x = setInterval(()=>{
            if (words.includes('mfrac')){
                const nd = words[words.indexOf('mfrac') + 1].split('/')
                var nde = `<math><mfrac><mn>${nd[0]}</mn><md>${nd[1]}</md></mfrac></math></math>`
                words[words.indexOf('mfrac') + 1] = nde
                words.splice(words.indexOf('mfrac'), 1)
            } else {
                const ftext = ""
                words.map((word)=>{
                    ftext += `<p style="margin: 0 2px;">${word}</p>`
                })
                setText(ftext)
                clearInterval(x)
            }
        }, 0)
    }, [])
    useEffect(()=>{
      setIntervalTime(setInterval(()=>{
        setTime((old)=> old - 1)
      }, 1000))
      return ()=> clearInterval(intervalTime)
    }, [])
    useEffect(()=>{
      if (time < 1){
        giveUp()
        /*setPlaying(false)
        setStage(4)
        const x = setTimeout(()=>{
          clearInterval(intervalTime)
          clearTimeout(x)
          close()
        }, 3000)*/
      }
      
    }, [time])
    useEffect(()=>{
      if (canvasRef.current){
        if (eraser){
          canvasRef.current.eraseMode(true)
        } else {
          canvasRef.current.eraseMode(false)
        }
      }
    }, [eraser])
    function correct(){
      clearInterval(intervalTime)
      participant.money = participant.money + question.money
      setStage(1)
      setPlaying(false)
      setTimeout(()=>{
        close()
      }, 3000)
    }
    function wrong(){
      clearInterval(intervalTime)
      setStage(2)
      setPlaying(false)
      setTimeout(()=>{
        close()
      }, 3000)
    }
    function giveUp(){
      clearInterval(intervalTime)
      setStage(3)
      setPlaying(false)
      setTimeout(()=>{
        close()
      }, 3000)
    }
    const [stage, setStage] = useState(0)
  return (<>
    <ReactPlayer playing={playing} loop={true} volume={1} playsinline={true} style={{display: 'none'}} url={'/clock.mp3'}></ReactPlayer>
    <VStack h={'100vh'} justifyContent={'center'} bg={'blackAlpha.800'} backdropFilter={'blur(10px)'} position={'relative'}>
      <VStack w={'250px'} left={'10px'} top={'10px'} rounded={'lg'} bg={'blackAlpha.500'} p={4} position={'absolute'} zIndex={3}>
              <HStack w={'full'}>
                  <Heading fontSize={'xl'} fontWeight={'semibold'}>Countdown</Heading>
                  <Spacer/>
                  <HStack rounded={'lg'} bg={'blackAlpha.500'} px={4} py={1}>
                      <Text fontWeight={'bold'} fontSize={'xl'}>{Math.floor(time / 60)}:{("0" + (time - Math.floor(time / 60) * 60)).slice(-2)}</Text>
                  </HStack>
              </HStack>
      </VStack>
    <AnimatePresence exitBeforeEnter>
    {stage == 0 ? 
    <VStack key={'questionCard'} as={motion.div} initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} top={0} zIndex={'5'} bg={'blackAlpha.700'} rounded={'lg'} p={'30px'} h={'100vh'} w={'100vh'}>
      <Text alignItems={'center'} display={'flex'} flexWrap={'wrap'} textAlign={'center'} fontSize={'xl'} w={'full'} dangerouslySetInnerHTML={{__html: text}}></Text>
      <Box rounded={'lg'} position={'relative !important'} border={'none !important'} h={'full'} w={'full'} bg={'gray.900'}>
        <ReactSketchCanvas eraserWidth={eraserWidth} strokeWidth={penWidth} ref={canvasRef} style={{border: 'none', position: 'absolute', top: 0, left: 0}} strokeColor="#4FD1C5" canvasColor={'rgba(255, 255, 255, 0)'} />
        <VStack w={'full'}><Text color={'whiteAlpha.700'}>You may use the space provided to write your workings</Text></VStack>
        <VStack zIndex={6} position={'absolute'} bottom={'10px'} w={'full'} h={'50px'}>
          <HStack spacing={'0'} px={'20px'} shadow={'lg'} rounded={'full'} bg={'gray.700'} h={'full'} w={'90%'}>
            <IconButton onClick={()=> setEraser(false)} colorScheme={eraser == false && 'blue'} variant={'ghost'} rounded={'full'} icon={<FaPen/>}></IconButton>
            <IconButton onClick={()=> setEraser(true)} colorScheme={eraser == true && 'blue'} variant={'ghost'} rounded={'full'} icon={<FaEraser/>}></IconButton>
            <Slider aria-label='slider-ex-1' onChange={(e)=>{
              if (eraser){
                setEraserWidth(e /2)
              } else {
                setPenWidth(e / 2)
              }
            }} value={eraser ? eraserWidth * 2 : penWidth * 2}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip label={eraser ? eraserWidth * 2 : penWidth * 2}>
                <SliderThumb />
              </Tooltip>
            </Slider>   
            <IconButton ml={'10px !important'} onClick={()=> canvasRef.current.undo()} variant={'ghost'} rounded={'full'} icon={<FaUndo/>}></IconButton>
            <IconButton onClick={()=> canvasRef.current.redo()} variant={'ghost'} rounded={'full'} icon={<FaRedo/>}></IconButton>
            <IconButton onClick={()=> canvasRef.current.clearCanvas()} variant={'ghost'} rounded={'full'} icon={<FaTrash/>}></IconButton>
          </HStack>
        </VStack>
      </Box>
      <HStack w={'full'}>
        <FormControl>
          <InputGroup rounded={"lg"} variant={'filled'} size={'lg'}_hover={{bg: 'gray.800'}} _focus={{bg: 'gray.800'}} bg={'gray.800'} border={'gray.600'}>
            {question.left && <InputLeftAddon>
              {question.left}
            </InputLeftAddon>}
            <Input autoComplete="off" value={answer} onChange={(e)=> {
              setAnswer(e.target.value.replace(/ /g, ""))
            }} size={'lg'} placeholder="Key in your answer" _hover={{bg: 'gray.800'}} _focus={{bg: 'gray.800'}} bg={'gray.800'} border={'gray.600'} variant={'filled'}/>
            {question.right && 
            <InputRightAddon>
              {question.right}
            </InputRightAddon>
          }
          </InputGroup>  
          <FormHelperText>Have a fraction? Type it as in this example: 2/3. (no spacing)</FormHelperText>
        </FormControl>
      </HStack>
      <HStack w={'full'}>
        <Button onClick={()=> giveUp()} size={'lg'} w={'full'} colorScheme={'red'}>Give up</Button>
        <Button  onClick={()=>{
          if (answer == ""){
            giveUp()
          } else if (question.correct == answer){
            correct()
          } else {
            wrong()
          }
        }} size={'lg'} w={'full'} colorScheme={'green'}>Submit</Button>
      </HStack>
    </VStack>
    : stage == 1 ?
    <VStack key={'correctStage'} as={motion.div} initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} justifyContent={'center'} top={0} zIndex={'5'} bg={'blackAlpha.700'} rounded={'lg'} p={'30px'}  w={'auto'}>
      <ReactPlayer playing={true} volume={0.2} playsinline={true} style={{display: 'none'}} url={'/up.mp3'}></ReactPlayer>
      <Icon as={FaCheckCircle} fontSize={'9xl'} color={'green.500'}/>
      <Heading mt={'20px !important'}>Correct!</Heading>
      <Text color={'whiteAlpha.700'} alignItems={'center'} fontSize={'xl'}>{question.money} SpaceBucks has been added to your balance!</Text>
    </VStack>
    : stage == 2 ?
    <VStack key={'wrongStage'} as={motion.div} initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} justifyContent={'center'} top={0} zIndex={'5'} bg={'blackAlpha.700'} rounded={'lg'} p={'30px'}  w={'auto'}>
      <ReactPlayer playing={true} volume={0.2} playsinline={true} style={{display: 'none'}} url={'/wrong.mp3'}></ReactPlayer>
      <Icon as={FaTimesCircle} fontSize={'9xl'} color={'red.500'}/>
      <Heading mt={'20px !important'}>Oops!</Heading>
      <Text color={'whiteAlpha.700'} alignItems={'center'} fontSize={'xl'}>You got the question wrong. No SpaceBucks were deducted.</Text>
    </VStack>
    : stage == 3 ?
    <VStack key={'giveUpStage'} as={motion.div} initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} justifyContent={'center'} top={0} zIndex={'5'} bg={'blackAlpha.700'} rounded={'lg'} p={'30px'}  w={'auto'}>
      <ReactPlayer playing={true} volume={0.2} playsinline={true} style={{display: 'none'}} url={'https://www.youtube.com/watch?v=graKroRK8Hg'}></ReactPlayer>
      <Icon as={FaFrown} fontSize={'9xl'} color={'yellow.500'}/>
      <Heading mt={'20px !important'}>Oof!</Heading>
      <Text color={'whiteAlpha.700'} textAlign={'center'} w={'100vh'} fontSize={'xl'}>Try again next time.</Text>
    </VStack>
    : stage == 4 &&
    <VStack key={'timeUpStage'} as={motion.div} initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} justifyContent={'center'} top={0} zIndex={'5'} bg={'blackAlpha.700'} rounded={'lg'} p={'30px'}  w={'auto'}>
      <ReactPlayer playing={true} volume={0.2} playsinline={true} style={{display: 'none'}} url={'https://www.youtube.com/watch?v=77S70NhRoBc'}></ReactPlayer>
      <Icon as={FaClock} fontSize={'9xl'} color={'yellow.500'}/>
      <Heading mt={'20px !important'}>Time&apos;s up!</Heading>
      <Text color={'whiteAlpha.700'} textAlign={'center'} w={'100vh'} fontSize={'xl'}>Good effort. Try again next time.</Text>
    </VStack>
    }
    </AnimatePresence>
    </VStack>
  </>)
}