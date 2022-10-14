import { VStack, Text, Box, HStack, Button } from "@chakra-ui/react";
import questions from './questions'
import { useEffect, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function QuestionCard() {
    const [text, setText]= useState("")
    useEffect(()=>{
        var words = questions[0].question.split(' ')
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
  return (<>
    <VStack p={'40px'} bg={'blackAlpha.800'} backdropFilter={'blur(10px)'} h={'100vh'} w={'full'} position={'fixed'} zIndex={'5'}>
    <VStack top={0} zIndex={'5'} bg={'blackAlpha.700'} rounded={'lg'} p={'30px'} h={'100vh'} w={'100vh'}>
      <Text alignItems={'center'} display={'flex'} flexWrap={'wrap'} textAlign={'center'} fontSize={'xl'} w={'full'} dangerouslySetInnerHTML={{__html: text}}></Text>
      <Box border={'none !important'} strokeColor="#4FD1C5" canvasColor={'#171923'} as={ReactSketchCanvas} h={'full'} w={'full'} rounded={'lg'} bg={'gray.900'}>
      
      </Box>
      <HStack w={'full'}>
        <Button size={'lg'} w={'full'} colorScheme={'red'}>Give up</Button>
        <Button size={'lg'} w={'full'} colorScheme={'green'}>Submit</Button>
      </HStack>
    </VStack>
    </VStack>
  </>)
}