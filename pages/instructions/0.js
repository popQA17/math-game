import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
export default function Instructions(){
    const router = useRouter()
    return(<>
    <VStack justifyContent={'center'} h={'100vh'} w={'full'}>
        <VStack as={motion.div} layoutId={'instructionPane'} justifyContent={'center'} h={'300px'} w={'500px'} bg={'gray.700'} rounded={'lg'}>
            <Heading>Game Instructions</Heading>
        </VStack>
        <HStack w={'550px'}>
            <Button w={'full'} onClick={()=> router.push('/game')}>Skip</Button>
            <Button w={'full'} onClick={()=> router.push('/instructions/1')} colorScheme={'blue'}>Start</Button>
        </HStack>
    </VStack>
    </>)
}