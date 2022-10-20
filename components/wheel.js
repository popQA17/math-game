import { Box, Button, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import 'react-roulette-pro/dist/index.css';


export default function Wheel({completed}){
    const [start, setStart] = useState(false)
    const [done, setDone] = useState(false)
    const [prizeIndex, setPrizeIndex] = useState(1)
    useEffect(()=>{
      setPrizeIndex(Math.ceil(Math.random() * 5))
    }, [])
    useEffect(()=>{
      if (done){
        completed(prizeIndex)
      }
    }, [done])
    useEffect(()=>{
      if (start == true){
        setTimeout(()=>{
          setDone(true)
        }, 4000)
      }
    }, [start])
    return(<>
      <VStack px={'10px'} alignItems={'flex-end'} as={motion.div} spacing={'20px'} py={'20px'} justifyContent={'center'} h={'full'} w={'full'} backdropFilter={'blur(0px)'}>
      <AnimatePresence exitBeforeEnter>
        {!done ? <VStack px={'10px'} rounded={'lg'} key={'wheel'} as={motion.div} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, scale: 0}} bg={'blackAlpha.500'}>
          <Spacer/>
          <VStack justifyContent={'center'} className={`roulette-spin ${start && `spin-${prizeIndex}`}`}>
              <VStack onClick={()=> setStart(true)} cursor={'pointer'} _hover={{bg: 'purple.500'}} rounded={'full'} h={'100px'} w={'100px'} justifyContent={'center'} p={"20px"} bgGradient={'linear(to-r, purple.600, purple.500)'}>
                  <Text fontSize={'2xl'} fontWeight={'semibold'}>Click!</Text>
              </VStack>
          </VStack>
          <Spacer/>
        </VStack>
        :
        <VStack rounded={'lg'} as={motion.div} key={'result'} initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}}>
          <VStack rounded={'full'} justifyContent={'center'} p={'20px'} w={'300px'} h={'300px'} bg={'teal.300'}>
            <VStack rounded={'full'} justifyContent={'center'} p={'40px'} w={'full'} h={'full'} bg={'whiteAlpha.400'}>
              <Heading w={'full'} h={"full"} rounded={'full'} fontSize={'9xl'} display={'flex'} alignItems={'center'} justifyContent={'center'} bg={'whiteAlpha.400'} color={'black'}>{prizeIndex}</Heading>
            </VStack>
          </VStack>
        </VStack>
        }
      </AnimatePresence>
      </VStack>
    </>)
}