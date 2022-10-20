import { Box, Button, Heading, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
export default function Instructions(){
    const router = useRouter()
    return(<>
    <VStack justifyContent={'center'} h={'100vh'} spacing={'5px'} w={'full'}>
        <HStack justifyContent={'center'} bg={'gray.900'} h={'full'} w={'full'}>
            <Image w={'300px'} src={'https://cdn2.popplays.tk/files/brave_AXBNOcL8Nj.png'}/>
            <Image w={'300px'} src={'https://cdn2.popplays.tk/files/brave_HSWevBZSs9.png'}/>
        </HStack>
        <VStack py={'10px'} spacing={0} as={motion.div} layoutId={'instructionPane'} justifyContent={'center'} h={'150px'} w={'full'} bg={'gray.700'}>
            <Spacer/>
            <Text fontSize={'lg'}>To open a power card (purple tile), click on it. The result will show on the card (as on the right image).</Text>
            <HStack w={'full'} px={'20px'}>
                <Spacer/>
                <Button onClick={()=> router.push('/instructions/3')} variant={'ghost'}>Back</Button>
                <Button onClick={()=> router.push('/instructions/5')} colorScheme={'blue'}>Next</Button>
            </HStack>
        </VStack>
            
    </VStack>
    </>)
}