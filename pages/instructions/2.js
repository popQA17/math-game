import { Box, Button, Heading, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
export default function Instructions(){
    const router = useRouter()
    return(<>
    <HStack justifyContent={'center'} h={'100vh'} spacing={'5px'} w={'full'}>
        <HStack justifyContent={'center'} bg={'gray.900'} h={'full'} w={'full'}>
            <Image w={'500px'} src={'https://cdn2.popplays.tk/files/brave_Su9YBExYVG.png'}/>
        </HStack>
        <VStack px={'10px'} py={'10px'} spacing={0} as={motion.div} layoutId={'instructionPane'} justifyContent={'center'} h={'100vh'} w={'500px'} bg={'gray.700'}>
            <Spacer/>
            <Text textAlign={'center'} fontSize={'lg'}>When it&apos;s your turn, click the middle of the wheel to spin it. The number chosen will then be the number of tiles you will move.</Text>
            <Spacer/>
            <HStack w={'full'} px={'20px'}>
                <Spacer/>
                <Button onClick={()=> router.push('/instructions/1')} variant={'ghost'}>Back</Button>
                <Button onClick={()=> router.push('/instructions/3')} colorScheme={'blue'}>Next</Button>
            </HStack>
        </VStack>    
    </HStack>
    </>)
}