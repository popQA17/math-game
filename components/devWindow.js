import { Box, Button, Heading, HStack, IconButton, PinInput, PinInputField, Spacer, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FaExpand, FaExpandAlt, FaExpandArrowsAlt, FaMinus, FaTimes } from "react-icons/fa";
import { Rnd } from "react-rnd";
import { makeid } from "./utils";


export default function DevWindow({setParticipants}){
    const [minimized, setMinimized] = useState(false)
    const [stage, setStage] = useState(0)
    const [visible, setVisible] = useState(false)
    const devPw = '123456'
    const router = useRouter()
    const [pin, setPin] = useState("")
    useHotkeys('ctrl+q, cmd+q', ()=>{
        setVisible(true)
        setMinimized(false)
    })
    return(<>
    { visible && 
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
            <Spacer/>
            <IconButton transform={minimized && 'rotate(270deg)'} onClick={()=> setMinimized(!minimized)} fontSize={'lg'} color={'black'} icon={minimized ? <FaExpandAlt/> : <FaMinus/>} rounded={'full'} variant={'ghost'} size={'sm'}>
            </IconButton>
            <IconButton onClick={()=> setVisible(false)} fontSize={'lg'} color={'black'} icon={<FaTimes/>} rounded={'full'} variant={'ghost'} size={'sm'}>
            </IconButton>
        </HStack>
        { stage == 0 ?
        <VStack h={'full'} justifyContent={'center'}>
            <Heading fontSize={'3xl'}>Authentication</Heading>
            <HStack>
                <PinInput otp onComplete={(e)=> {
                    if (e == devPw){
                        setStage(1)
                    } else {
                        setPin('')
                    }
                }} value={pin} onChange={(e)=> setPin(e)} variant={'filled'} size={'lg'} type='alphanumeric'>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
        </VStack>
        :
        <>
        <Heading mt={'20px'} fontSize={'3xl'}>Shortcuts</Heading>
        <VStack px={'10px'} mt={'10px'}>
            <Button w={'full'} onClick={()=> {
                setParticipants([
                    {
                        name: 'Tim',
                        id: makeid(10),
                        money: 0
                    },
                    {
                        name: 'Jane',
                        id: makeid(10),
                        money: 0
                    },
                    {
                        name: 'Mary',
                        id: makeid(10),
                        money: 0
                    },
                    {
                        name: 'John',
                        id: makeid(10),
                        money: 0
                    }
                ])
                router.push('/game')
            }}>Auto-fill participants</Button>
        </VStack>
        </>
        }
    </Rnd>
    }
    </>)
}