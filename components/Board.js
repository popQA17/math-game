import { Box, Grid, Wrap, Avatar, GridItem, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import QuestionCard from "./Questioncard";
import questions from "./questions";
import UserCard from "./UserCard";
import { shuffle } from "./utils";
import Wheel from "./wheel";

export default function Board({participants, money}){
    const squestions = questions
    const [qns, setQns] = useState(['e'])
    const [position, setPosition] = useState([])
    const [wheelOpen, setWheelOpen] = useState(true)
    const [ran, setRan] = useState(true)
    const [questionOpen, setQuestionOpen] = useState(false)
    const [question, setQuestion] = useState({})
    const tiles = [
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
        index: 3,
        type: 'question',
        question: squestions[1],
      },
      {
        index: 4,
        type: 'question',
        question: squestions[2],
      },
      {
        index: 5,
        type: 'question',
        question: squestions[3],
      },
      {
        index: 6,
        type: 'question',
        question: squestions[4],
      },
      {
        index: 7,
        type: 'power',
      },
      {
        index: 8,
        type: 'question',
        question: squestions[6],
      },
      {
        index: 9,
        type: 'rest',
      },
      {
        index: 10,
        type: 'question',
        question: squestions[9],
      },
      {
        index: 11,
        type: 'power',
      },
      {
        index: 12,
        type: 'question',
        question: squestions[8],
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
        question: squestions[3],
      },
    ]
    const colorList = [
      'red',
      'blue',
      'green',
      'yellow'
    ]
    function getPosition(steps){
      if (steps > 16){
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
    function openTile(index){
      const tile = tiles[index]
      console.log(tile)
      if (tile.type == 'question'){
        setQuestion(tile.question)
        setQuestionOpen(true)
      }
    }
    function Tile({index, empty, difficulty, type}){
        var x = 0
        return (<>
            <GridItem position={'relative'} as={Wrap} rounded={'lg'} display={'flex'} h='calc((90vh - 25px) /5)' style={{aspectRatio: '1/1'}}  bg={!empty && difficulty == 'easy' ? 'green.200' : difficulty == 'medium' ? 'orange.200' : difficulty == 'difficult' ? 'red.200' : type == "start" ? 'gray.700' : type == 'power' ? 'purple.600' : type == 'rest' && 'yellow.300'}>
              {type == 'power' ?
                <Text fontSize={'xl'} color={'white'} fontWeight={'semibold'}>Power Card!</Text>
                : type == 'rest' &&
                <Text fontSize={'xl'} color={'black'} fontWeight={'semibold'}>Rest</Text>
              }
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
        return <UserCard data={user} index={index}/>
    })}
    <AnimatePresence exitBeforeEnter>
      {wheelOpen &&
        <motion.div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5}} key={'openWheel'} initial={{opacity: 0, scale: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0, opacity: 0}}>
          <Wheel completed={(steps)=>{
            setTimeout(()=>{
              move(0, steps)
              setWheelOpen(false)
              setTimeout(()=>{
                console.log(position[0])
                openTile(position[0])
              }, 1000)
            }, 2000)
          }}/>
        </motion.div>
      }
      {questionOpen &&
        <motion.div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5}} key={'questionCard'} initial={{opacity: 0, scale: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0, opacity: 0}}>
          <QuestionCard question={question}/>
        </motion.div>
      }
    </AnimatePresence>
    <VStack zIndex={4} rounded={'lg'} justifyContent={'center'} bg={'blackAlpha.500'} h={'calc((((100vh - 25px) / 5) * 3) - 50px)'} w={'calc((((100vh - 25px) / 5) * 3) - 50px)'} position={'fixed'} left={'0'} top={'0'}  transform={'translate(calc(50vw - 50%), calc(50vh - 50%))'}>
        <Heading>SpaceMath</Heading>
        <Text fontSize={'lg'} color={'white'}>Presented by Qi An and Joel Goh</Text>
        <Text fontSize={'3xl'} fontWeight={'bold'}>15 : 00</Text>
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