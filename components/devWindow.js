import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Heading, HStack, IconButton, PinInput, PinInputField, Select, Spacer, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FaExpand, FaExpandAlt, FaExpandArrowsAlt, FaMinus, FaTimes } from "react-icons/fa";
import { Rnd } from "react-rnd";
import { makeid } from "./utils";


export default function DevWindow({setParticipants, participants, checkExceed, updateState}){
    const [minimized, setMinimized] = useState(false)
    const [stage, setStage] = useState(0)
    const [visible, setVisible] = useState(false)
    const devPw = '123456'
    const router = useRouter()
    const [participant, setParticipant] = useState(null)
    const [pin, setPin] = useState("")
    function getParticipant(id){
        return participants.filter((old) => old.id == id)[0]
    }
    useHotkeys('ctrl+m, cmd+m', ()=>{
        setVisible(true)
        setMinimized(false)
    })
    function checkDisabled(){
        return  participants.length < 2 || participant == "-- NO PARTICIPANT SELECTED --" || participant == null 
    }
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
            zIndex: '6'
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
        <Accordion mt={'20px'} defaultIndex={[0]} allowMultiple>
        <AccordionItem>
        <h2>
            <AccordionButton bg={'whiteAlpha.50'}>
                <Box flex='1' textAlign='left'>
                Participants
                </Box>
                <AccordionIcon />
            </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
            <VStack px={'10px'} mt={'10px'}>
                <Button size={'sm'} w={'full'} onClick={()=> {
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
                <Select value={participant} onChange={(e)=>{
                    setParticipant(e.target.value)
                }} disabled={participants.length < 2} rounded={'lg'} size={'sm'} variant={'filled'}>
                    <option value={null}>-- NO PARTICIPANT SELECTED --</option>
                    {participants.map((participant)=>{
                        return (<>
                        <option value={participant.id}>{participant.name}</option>
                        </>)
                    })}
                </Select>
                <Button onClick={()=>{
                    getParticipant(participant).money += 100
                    checkExceed()
                    setParticipants(participants)
                    updateState()
                }} size={'sm'} w={'full'} isDisabled={checkDisabled()}>Give 100 SpaceBucks</Button>
                <Button onClick={()=>{
                    getParticipant(participant).money -= 100
                    checkExceed()
                    setParticipants(participants)
                    updateState()
                }} size={'sm'} w={'full'} isDisabled={checkDisabled()}>Remove 100 SpaceBucks</Button>
            </VStack>
        </AccordionPanel>
        </AccordionItem>
        </Accordion>
        </>
        }
    </Rnd>
    }
    </>)
}