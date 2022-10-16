import { Box, Button, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import 'react-roulette-pro/dist/index.css';

const prizes = [
    {
      image: 'https://i.ibb.co/6Z6Xm9d/good-e.png',
      number: 1,
    },
    {
      image: 'https://i.ibb.co/T1M05LR/good-e.png',
      number: 2,
    },
    {
      image: 'https://i.ibb.co/Qbm8cNL/good-e.png',
      number: 3,
    },
    {
      image: 'https://i.ibb.co/5Tpfs6W/good-e.png',
      number: 4,
    },
    {
      image: 'https://i.ibb.co/64k8D1c/good-e.png',
      number: 5,
    },
    {
        image: 'https://i.ibb.co/64k8D1c/good-e.png',
        number: 4,
      },
      {
        image: 'i.ibb.co/64k8D1c/good-e.png',
        number: 2,
      },
      {
        image: 'https://i.ibb.co/64k8D1c/good-e.png',
        number: 1,
      },
      {
        image: 'https://i.ibb.co/64k8D1c/good-e.png',
        number: 3,
      },

  ];

export default function Wheel({completed}){
    const [start, setStart] = useState(false)
    const [done, setDone] = useState(false)
    const [prizeIndex, setPrizeIndex] = useState(1)
    useEffect(()=>{
     setPrizeIndex(Math.ceil(Math.random() * (5 - 1 + 1)))
    }, [])
    useEffect(()=>{
      if (done){
        completed(prizeIndex)
      }
    }, [done])
    useEffect(()=>{
      if (start == true){
        console.log(prizeIndex)
        setTimeout(()=>{
          setDone(true)
        }, 7000)
      }
    }, [start])
    return(<>
      <VStack as={motion.div} spacing={'20px'} py={'20px'} justifyContent={'center'} h={'full'} w={'full'} bg={'blackAlpha.800'} backdropFilter={'blur(10px)'}>
      <AnimatePresence exitBeforeEnter>
        {!done ? <VStack key={'wheel'} as={motion.div} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, scale: 0}} w={'full'} h={'full'}>
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
          <VStack rounded={'full'} justifyContent={'center'} p={'20px'} w={'350px'} h={'350px'} bg={'teal.300'}>
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