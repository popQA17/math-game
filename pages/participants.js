import { Box, Button, FormControl, FormLabel, Heading, HStack, Icon, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { makeid } from "../components/utils";
import { FaChevronLeft, FaChevronRight, FaPen, FaPlus, FaTimes, FaTrash, FaUser } from 'react-icons/fa'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function GameSetup(participants, setParticipants){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState('')
    const router = useRouter()
    function createParticipants(){
        const payload = {
            name: name,
            id: makeid(10),
            money: 0
        }
        participants.setParticipants([... participants.participants, payload])
        onClose()
    }
    return(<>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={'blur(10px)'}/>
        <ModalContent>
          <ModalHeader>Add participant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e)=> setName(e.target.value)} variant={'filled'}></Input>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={()=>{
                createParticipants()
            }} colorScheme={'blue'}>Add</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
    <Box filter={'blur(20px)'} position={'fixed'} top={0} left={0} w={'full'} h={'full'} backgroundColor={'black'} backgroundImage={'/welcome.jpg'} backgroundSize={'cover'} backgroundPosition={'top'} backgroundRepeat={'no-repeat'} zIndex={2}>
    </Box>
    <VStack h={'100vh'} w={'full'} justifyContent={'center'} position={'fixed'} zIndex={'3'}>
        <VStack rounded={'lg'} p={4} bg={'blackAlpha.500'} h={'90vh'} w={'500px'}>
            <Heading>Game Setup</Heading>
            <HStack mt={'20px !important'} w={'full'}>
                <VStack w={'full'}>
                    <Text fontSize={'lg'}>Participants</Text>
                    <Box h={'2px'} w={'full'} bg={'blue.500'}></Box>
                </VStack>
            </HStack>
            <VStack w={'full'} px={'30px'}>
                {participants.participants.map((participant)=>{
                    return(<>
                    <HStack px={4} py={2} w={'full'} rounded={'full'} bg={'blackAlpha.500'}>
                        <Icon as={FaUser}/>
                        <Text>{participant.name}</Text>
                        <Spacer/>
                        <IconButton colorScheme={'blue'} size={'sm'} icon={<FaPen/>}></IconButton>
                        <IconButton colorScheme={'red'} size={'sm'} icon={<FaTrash/>}></IconButton>
                    </HStack>
                    </>)
                })}
                <Button isDisabled={participants.participants.length == 4} onClick={onOpen} w={'full'} colorScheme={'blue'} leftIcon={<FaPlus/>}>Add</Button>
                <Button onClick={()=> router.push('/game')} isDisabled={participants.participants.length < 2} w={'full'} leftIcon={<FaChevronRight/>}>Start Game</Button>
            </VStack>
        </VStack>
    </VStack>
    </>)
}