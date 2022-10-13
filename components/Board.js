import { Box, Grid, GridItem, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import questions from "./questions";
import UserCard from "./UserCard";
import { shuffle } from "./utils";

export default function Board({participants, money}){
    const squestions = shuffle(questions)
    const [qns, setQns] = useState(['e'])
    function Tile({empty, difficulty, type}){
        return (<>
            <GridItem rounded={'lg'} display={'flex'} alignItems={'center'} justifyContent={'center'} h='calc((90vh - 25px) /5)' style={{aspectRatio: '1/1'}}  bg={!empty && difficulty == 'easy' ? 'green.200' : difficulty == 'medium' ? 'orange.200' : difficulty == 'difficult' ? 'red.200' : type == "start" ? 'gray.700' : type == 'power' ? 'purple.600' : type == 'rest' && 'yellow.300'}>
                {type == 'start' ? 
                <Text fontSize={'2xl'} fontWeight={'semibold'}>GO!</Text>
                : type == 'power' ?
                <Text fontSize={'xl'} color={'white'} fontWeight={'semibold'}>Power Card!</Text>
                : type == 'rest' &&
                <Text fontSize={'xl'} color={'black'} fontWeight={'semibold'}>Rest</Text>
                }
            </GridItem>
        </>)
    }
    return(<>
    {participants.map((user, index)=>{
        return <UserCard data={user} index={index}/>
    })}
    
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
            <Tile type="start"/>
            <Tile difficulty={squestions[0].mode}/>
            <Tile type='power'/>
            <Tile difficulty={squestions[1].mode}/>
            <Tile difficulty={squestions[2].mode}/>
            
            <Tile difficulty={squestions[3].mode}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile difficulty={squestions[4].mode}/>

            <Tile type='power'/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile type='power'/>

            <Tile difficulty={squestions[5].mode}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile empty={true}/>
            <Tile difficulty={squestions[6].mode}/>


            <Tile difficulty={squestions[7].mode}/>
            <Tile difficulty={squestions[8].mode}/>
            <Tile type='power'/>
            <Tile difficulty={squestions[9].mode}/>
            <Tile type='rest'/>
            </>
            }
        </Grid>
    </VStack>
    </>)
}