import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function PowerCard({participant, participants, onClose}){
    const [reveal, setReveal] = useState(false)
    const [number, setNumber] = useState(Math.floor(Math.random() * 101))
    const [add, setAdd] = useState((Math.floor(Math.random() * 3)) == 1 ? true : false)
    useEffect(()=>{
        if (reveal){
            if (add){
                participant.money += number
            } else {
                participant.money -= number
            }
            setTimeout(()=>{
                onClose()
            }, 3000)
        }
    }, [reveal])
    return(<>
    <VStack justifyContent={'center'} zIndex={6} bg={'blackAlpha.800'} backdropFilter={'blur(10px)'} position={'fixed'} w={'full'} h={'full'}>
    {reveal &&       <ReactPlayer playing={true} volume={0.2} playsinline={true} style={{display: 'none'}} url={`${add ? 'up' : 'down'}.mp3`}></ReactPlayer>}
    <VStack onClick={()=> setReveal(true)} className={`card ${reveal && 'card-active'} middle`}>
        <VStack rounded={'xl'} backgroundColor={'gray.700'} backgroundImage={'url(/PowerCard.png)'} backgroundPosition={'center'} backgroundSize={'cover'} className="front">
        </VStack>
        <VStack p={'20px'} rounded={'xl'} bg={'gray.800'} justifyContent={'center'} className="back">
            <VStack rounded={'xl'} justifyContent={'center'} h={'full'} w={'full'} bg={'gray.700'} px={'20px'} className="back-content">
                <Image src="/MoneySign.png" w={'200px'} transform={'rotate(-15deg)'}/>
                <Heading mt={'40px !important'} fontSize={'2xl'}>{add ? "Hooray!" : "Oh No!"}</Heading>
                <Text fontSize={'lg'} textAlign={'center'}>{number} SpaceBucks has been {add ? 'added' :  "deducted"} from your balance!</Text>
            </VStack>
        </VStack>
        </VStack>
    </VStack>
    </>)
}