import { Box, Button, Heading, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
export default function Instructions(){
    const router = useRouter()
    return(<>
    <VStack justifyContent={'center'} h={'100vh'} spacing={'5px'} w={'full'}>
        <HStack justifyContent={'center'} bg={'gray.900'} h={'full'} w={'full'}>
            <Image w={'500px'} src={'https://cdn2.popplays.tk/files/brave_65XM2HggTM.png'}/>
            <Image src={'https://cdn2.popplays.tk/files/brave_6orSLBIRZb.png'}/>
        </HStack>
        <VStack py={'10px'} spacing={0} as={motion.div} layoutId={'instructionPane'} justifyContent={'center'} h={'150px'} w={'full'} bg={'gray.700'}>
            <Spacer/>
            <Text fontSize={'lg'}>The first player added will start the game. You can see the current player from the player list, or the toast notifications.</Text>
            <HStack w={'full'} px={'20px'}>
                <Spacer/>
                <Button onClick={()=> router.push('/game')} variant={'ghost'}>Skip</Button>
                <Button onClick={()=> router.push('/instructions/2')} colorScheme={'blue'}>Next</Button>
            </HStack>
        </VStack>
            
    </VStack>
    </>)
}