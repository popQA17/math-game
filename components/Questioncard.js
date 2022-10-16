import { VStack, Text, Box, HStack, Button, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Tooltip, Spacer, Input, useToast, FormControl, FormHelperText, InputGroup, InputLeftElement, InputRightElement, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
import questions from './questions'
import { useEffect, useRef, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { FaEraser, FaPen, FaRedo, FaTrash, FaUndo, FaUndoAlt } from 'react-icons/fa'
export default function QuestionCard({question}) {
    const [text, setText]= useState("")
    const canvasRef = useRef()
    const [eraserWidth, setEraserWidth] = useState(10)
    const [penWidth, setPenWidth] = useState(4)
    const [eraser, setEraser] = useState(false)
    const [answer, setAnswer] = useState('')
    const toast = useToast()
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
      if (eraser){
        canvasRef.current.eraseMode(true)
      } else {
        canvasRef.current.eraseMode(false)
      }
    }, [eraser])
  return (<>
    <VStack bg={'blackAlpha.800'} backdropFilter={'blur(10px)'}>
    <VStack top={0} zIndex={'5'} bg={'blackAlpha.700'} rounded={'lg'} p={'30px'} h={'100vh'} w={'100vh'}>
      <Text alignItems={'center'} display={'flex'} flexWrap={'wrap'} textAlign={'center'} fontSize={'xl'} w={'full'} dangerouslySetInnerHTML={{__html: text}}></Text>
      <Box rounded={'lg'} position={'relative !important'} border={'none !important'} h={'full'} w={'full'} bg={'gray.900'}>
        <ReactSketchCanvas eraserWidth={eraserWidth} strokeWidth={penWidth} ref={canvasRef} style={{border: 'none'}} strokeColor="#4FD1C5" canvasColor={'#171923'} />
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
            <Input value={answer} onChange={(e)=> setAnswer(e.target.value)} size={'lg'} placeholder="Key in your answer" _hover={{bg: 'gray.800'}} _focus={{bg: 'gray.800'}} bg={'gray.800'} border={'gray.600'} variant={'filled'}/>
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
        <Button size={'lg'} w={'full'} colorScheme={'red'}>Give up</Button>
        <Button  onClick={()=>{
          if (question.correct == answer){
            toast({
              title: 'Yay!',
              description: "Your answer is correct!",
              isClosable: true,
              status: 'success'
            })
          } else {
            toast({
              title: 'Oops..',
              description: "Your answer is incorrect",
              isClosable: true,
              status: 'error'
            })
          }
        }} size={'lg'} w={'full'} colorScheme={'green'}>Submit</Button>
      </HStack>
    </VStack>
    </VStack>
  </>)
}