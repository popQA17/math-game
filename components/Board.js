import { Box, Grid, Wrap, Avatar, GridItem, Heading, HStack, Text, VStack, Spacer, Image } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isError } from "tls";
import PowerCard from "./PowerCard";
import QuestionCard from "./Questioncard";
import questions from "./questions";
import UserCard from "./UserCard";
import { shuffle } from "./utils";
import Wheel from "./wheel";

export default function Board({participants, checkExceed}){
    const [squestions, setSquestions] =  useState(questions)
    const [qns, setQns] = useState(['e'])
    const [position, setPosition] = useState([])
    const [wheelOpen, setWheelOpen] = useState(false)
    const [ran, setRan] = useState(true)
    const [questionOpen, setQuestionOpen] = useState(false)
    const [question, setQuestion] = useState({})
    const [turn, setTurn] = useState(0)
    const [tiles, setTiles] = useState([])
    const [statusOpen, setStatusOpen] = useState(false)
    const [status, setStatus] = useState('Starting Game...')
    const [powerOpen, setPowerOpen] = useState(false)
    const router = useRouter()
    const colorList = [
      'red',
      'blue',
      'green',
      'yellow'
    ]
    function getPosition(steps){
      if (steps > 16){
        participants[turn].money += 50
        setStatus("Pass GO!")
        return steps - 16
      } else {
        return steps
      }
    }
    function move(index, steps){
      const newpos = getPosition(position[index] + steps)
      position[index] = newpos
      setRan(false)
      setTimeout(()=>{
        setRan(true)
      }, 0)
    }
    useEffect(()=>{      
      setPosition([])
      participants.map((participant, index)=>{
        participant.index = index
        setPosition((old)=> [...old, 1])     
      })
    }, [participants])
    useEffect(()=>{
      setTiles([
        {
          index: 1,
          type: 'start'
        },
        {
          index: 2,
          type: 'question',
          question: squestions[0],
        },
        {
          index: 3,
          type: 'power'
        },
        {
          index: 4,
          type: 'question',
          question: squestions[1],
        },
        {
          index: 5,
          type: 'question',
          question: squestions[2],
        },
        {
          index: 6,
          type: 'question',
          question: squestions[3],
        },
        {
          index: 7,
          type: 'power',
        },
        {
          index: 8,
          type: 'question',
          question: squestions[6]
        },
        {
          index: 9,
          type: 'rest',
        },
        {
          index: 10,
          type: 'question',
          question: squestions[9]
        },
        {
          index: 11,
          type: 'power',
        },
        {
          index: 12,
          type: 'question',
          question: squestions[8]
        },
        {
          index: 13,
          type: 'question',
          question: squestions[7],
        },
        {
          index: 14,
          type: 'question',
          question: squestions[5],
        },
        {
          index: 15,
          type: 'power',
        },
        {
          index: 16,
          type: 'question',
          question: squestions[3]
        },
      ])
    }, [squestions])
    function openTile(index){
      const tile = tiles[index]
      if (tile.type == 'question'){
        setQuestion(tile.question)
        setQuestionOpen(true)
      } else if (tile.type == 'power'){
        setPowerOpen(true)
      } else if (tile.type == 'start'){
        setTimeout(()=>{
          nextTurn()
        }, 2000)
      } else if (tile.type == 'rest'){
        setStatus("Resting..")
        setTimeout(()=>{
          nextTurn()
        }, 2000)
      }
    }
    function nextTurn(){
      if (turn == participants.length - 1){
        setTurn(0)
      } else {
        setTurn((old)=> old + 1)
      }
    }
    useEffect(()=>{
      setStatus(`It's now ${participants[turn].name}'s turn!`)
      setTimeout(()=>{
        setWheelOpen(true)
        setSquestions(() => [...shuffle(questions)])
      }, 1000)
    }, [turn])
    useEffect(()=>{
      setStatusOpen(true)
      setTimeout(()=>{
        setStatusOpen(false)
      }, 3000)
    }, [status])
    function Tile({index, empty, difficulty, type}){
        var x = 0
        return (<>
            <GridItem position={'relative'} as={Wrap} rounded={'lg'} display={'flex'} h='calc((90vh - 25px) /5)' style={{aspectRatio: '1/1'}}  bg={!empty && difficulty == 'easy' ? 'green.200' : difficulty == 'medium' ? 'orange.200' : difficulty == 'difficult' ? 'red.200' : type == "start" ? 'gray.700' : type == 'power' ? 'purple.600' : type == 'rest' && 'yellow.300'}>
              {(participants[0] && Number(position[0]) == index) && 
                  <Avatar color={'white'} mx={'auto'} name={participants[0].name}  bg={colorList[0]+".300"}/>           
              }
              {(participants[1] && Number(position[1]) == index) && 
                  <Avatar color={'white'} mx={'auto'} name={participants[1].name}  bg={colorList[1]+".300"}/>           
              }
              {(participants[2] && Number(position[2]) == index) && 
                  <Avatar color={'white'} mx={'auto'} name={participants[2].name}  bg={colorList[2]+".300"}/>           
              }
              {(participants[3] && Number(position[3]) == index) && 
                  <Avatar color={'white'} mx={'auto'} name={participants[3].name}  bg={colorList[3]+".300"}/>           
              }
            </GridItem>
        </>)
    }
    return(<>
    {participants.map((user, index)=>{
       <UserCard data={user} index={index}/>
    })}
    <VStack p={'10px'} bg={'blackAlpha.500'} rounded={"lg"} position={'fixed'} zIndex={'3'} top={'10px'} left={'10px'} w={'300px'}>
      {participants.map((user, index)=>{
        return (<>
        <HStack w={'full'}>
          <Box h={'25px'} w={'25px'} bg={`${colorList[index]}.300`} rounded={'full'}/>
          <Text color={turn == index && `${colorList[index]}.300`} fontSize={'lg'} fontWeight={'semibold'}>{user.name}</Text>
          <Spacer/>
          <HStack spacing={'5px'} py={'2px'} bg={'blackAlpha.500'} px={'10px'} rounded={"lg"}>
            <Image src={'/MoneySign.png'} w={'50px'}/>
            <Text fontWeight={'semibold'}>{user.money}</Text>
          </HStack>
        </HStack>
        </>)
      })}
    </VStack>
    <AnimatePresence exitBeforeEnter>
      {wheelOpen &&
        <motion.div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5}} key={'openWheel'} initial={{opacity: 0, scale: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0, opacity: 0}}>
          <Wheel completed={(steps)=>{
            setTimeout(()=>{
              move(turn, steps)
              setWheelOpen(false)
              setTimeout(()=>{
                openTile(position[turn] - 1)
              }, 1000)
            }, 2000)
          }}/>
        </motion.div>
      }
      {questionOpen &&
        <motion.div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5}} key={'questionCard'} initial={{opacity: 0, scale: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0, opacity: 0}}>
          <QuestionCard close={()=> {
            setQuestionOpen(false)
            checkExceed()
            nextTurn()
          }} participant={participants[turn]} question={question}/>
        </motion.div>
      }
      {powerOpen && 
        <motion.div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5}} key={'MysteryCard'} initial={{opacity: 0, scale: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0, opacity: 0}}>
          <PowerCard participant={participants[turn]} onClose={()=> {
            setPowerOpen(false)
            checkExceed()
            nextTurn()
          }}/>
        </motion.div>
      }
    </AnimatePresence>
    {/*<HStack spacing={0} position={'fixed'} top={"50%"} transform={'translateY(-50%)'} zIndex={'7'}>
      <HStack spacing={0} _hover={{left: '10px'}} transition={'ease-in-out all 0.3s'} p={'10px'} w={"220px"} rounded={'lg'} left={'-165px'} bg={'blackAlpha.500'} position={'relative'}>
        <VStack alignItems={'flex-start'}>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'green.200'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Easy Question</Text>
          </HStack>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'orange.200'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Medium Question</Text>
          </HStack>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'red.200'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Difficult Question</Text>
          </HStack>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'purple.500'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Power Card</Text>
          </HStack>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'yellow.300'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Rest Zone</Text>
          </HStack>
        </VStack>
        <VStack right={0} position={'absolute'} transform={'rotate(270deg)'}>
          <Heading w={'full'} textAlign={'center'} fontSize={'20px'} fontWeight={'semibold'}>Legend</Heading>
        </VStack>
      </HStack>
    </HStack>
    */}
    <VStack left={'10px'} _hover={{bottom: '-10px'}} pb={'20px'} overflow={'hidden'} transition={'ease-in-out all 0.3s'} w={"220px"} rounded={'lg'} bottom={'-172px'} bg={'blackAlpha.500'} spacing={0} position={'fixed'} zIndex={'7'}>
        
        <HStack bg={'blackAlpha.500'} w={'full'} h={'50px'}>
          <Heading w={'full'} textAlign={'center'} fontSize={'20px'} fontWeight={'semibold'}>Legend</Heading>
        </HStack>
        <VStack px={'10px'} alignItems={'flex-start'}>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'green.200'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Easy Question</Text>
          </HStack>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'orange.200'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Medium Question</Text>
          </HStack>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'red.200'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Difficult Question</Text>
          </HStack>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'purple.500'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Power Card</Text>
          </HStack>
          <HStack>
            <Box h={'15px'} w={'15px'} bg={'yellow.300'} rounded={'full'}/>
            <Text fontSize={'md'} fontWeight={'medium'} color={'whiteAlpha.800'}>Rest Zone</Text>
          </HStack>
        </VStack>
    </VStack>
    <VStack px={'20px'} zIndex={4} rounded={'lg'} justifyContent={'center'} bg={'blackAlpha.500'} h={'calc((((100vh - 25px) / 5) * 3) - 50px)'} w={'calc((((100vh - 25px) / 5) * 3) - 50px)'} position={'fixed'} left={'0'} top={'0'}  transform={'translate(calc(50vw - 50%), calc(50vh - 50%))'}>
        <Heading>SpaceMath</Heading>
        <Text fontSize={'lg'} color={'white'}>Presented by Qi An and Joel Goh</Text>
        <AnimatePresence>
        {statusOpen && <HStack as={motion.div} initial={{opacity:0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} p={'15px'} justifyContent={'center'} px={'20px'} rounded={"full"} bg={'blackAlpha.500'} w={'full'}>
          <Text fontSize={'lg'}>{status}</Text>
        </HStack>}
        </AnimatePresence>
    </VStack>
    <Box filter={'blur(20px)'} position={'fixed'} top={0} left={0} w={'full'} h={'full'} backgroundColor={'black'} backgroundImage={'/welcome.jpg'} backgroundSize={'cover'} backgroundPosition={'top'} backgroundRepeat={'no-repeat'} zIndex={2}>
    </Box>
    <VStack zIndex={3} position={'fixed'} h={'100vh'} w={'full'} justifyContent={'center'}>
        <Grid width={'100vh'} height={'90vh'} overflow={'none'} templateColumns='repeat(5, 1fr)' gap={"0px"}>
            {qns.length > 0 && 
            <>
            <Tile index={1} type="start"/>
            <Tile index={2} difficulty={squestions[0].mode}/>
            <Tile index={3} type='power'/>
            <Tile index={4} difficulty={squestions[1].mode}/>
            <Tile index={5} difficulty={squestions[2].mode}/>
            
            <Tile index={16} difficulty={squestions[3].mode}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile index={6} difficulty={squestions[4].mode}/>

            <Tile index={15} type='power'/>
            <Tile empty={true}/>
            <Tile empty={true}/>            
            <Tile empty={true}/>
            <Tile index={7} type='power'/>

            <Tile index={14} difficulty={squestions[5].mode}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile index={8} difficulty={squestions[6].mode}/>


            <Tile index={13} difficulty={squestions[7].mode}/>
            <Tile index={12} difficulty={squestions[8].mode}/>
            <Tile index={11} type='power'/>
            <Tile index={10} difficulty={squestions[9].mode}/>
            <Tile index={9} type='rest'/>
            </>
            }
        </Grid>
    </VStack>
    </>)
}