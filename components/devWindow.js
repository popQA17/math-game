import { Box, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Rnd } from "react-rnd";


export default function DevWindow(){
    const [minimized, setMinimized] = useState(true)
    return(<>
    <Rnd
        bounds={"window"}
        as={Box}
        bg={'blackAlpha.800'}
        enableResizing={!minimized}
        overflow={'hidden'}
        height={minimized && '50px !important'}
        backdropFilter={"blur(10px)"}
        rounded={'lg'}
        style={{
            zIndex: '4'
        }}
        default={{
        x: 0,
        y: 0,
        width: '400px',
        height: '500px'
        }}
        minWidth={'400px'}
        minHeight={minimized ? '50px':  '500px'}
        dragHandleClassName="handle"
        
    >
        <HStack color={'black'} px={'10px'} cursor={"move"} className="handle" h={'50px'} w={'full'} bg={'blue.200'}>
            <Text pl={'10px'} fontWeight={'semibold'} fontSize={'lg'}>Developers</Text>
        </HStack>
    </Rnd>
    </>)
}