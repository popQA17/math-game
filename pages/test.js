import { Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react"

export default function Test(){
    const ref = useRef()
    return(<>
        <VStack justifyContent={'center'} ref={ref} className="roulette-spin">
            <VStack onClick={()=> ref.current.classList.add("spin")} cursor={'pointer'} _hover={{bg: 'teal.100'}} color={'black'} rounded={'full'} h={'100px'} w={'100px'} justifyContent={'center'} p={"20px"} bg={'teal.200'}>
                <Text fontSize={'2xl'} fontWeight={'semibold'}>Click!</Text>
            </VStack>
        </VStack>
    </>)
}