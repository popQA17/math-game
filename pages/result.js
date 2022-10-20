import { Avatar, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useReward } from "react-rewards";
import { motion } from "framer-motion";

export default function Result({participants}){
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)
    const { reward, isAnimating } = useReward('firstConfetti', 'confetti');
    const [money, setMoney] = useState(participants)

    useEffect(()=>{
        if (participants.length < 2){
            setLoaded(false)
            router.push('/')
        } else {
            money.sort((a,b)=> (a.money < b.money ? 1 : -1))
            setLoaded(true)
        }
    }, [])
    const [stage, setStage] = useState(0)
    useEffect(()=>{
        setTimeout(()=>{
            setStage(1)
            setTimeout(()=>{
                setStage(2)
                setTimeout(()=>{
                    setStage(3)
                    setTimeout(()=>{
                        setStage(4)
                        reward()
                    }, 2000)
                }, 2000)
            }, 1000)
        }, 500)
    }, [])
    return(<>
    {loaded && <>
    <Box filter={'blur(20px)'} position={'fixed'} top={0} left={0} w={'full'} h={'full'} backgroundColor={'black'} backgroundImage={'/welcome.jpg'} backgroundSize={'cover'} backgroundPosition={'top'} backgroundRepeat={'no-repeat'} zIndex={2}>
    </Box>
    <ReactPlayer playing={true} volume={0.2} playsinline={true} style={{display: 'none'}} url={'/results.mp3'}></ReactPlayer>
    <HStack position={'fixed'} w={'full'} zIndex={3} justifyContent={'center'} h={'100vh'} alignItems={'flex-end'}>
        <VStack>
            { stage > 1 && 
            <motion.div initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1.5}}>
                <Text fontWeight={'semibold'} fontSize={'2xl'}>{money[1].name}</Text>
            </motion.div>}
            <Box w={'200px'} bg={stage > 1 && stage != 3 ? 'green.500' : 'blackAlpha.300'} h={'46vh'} transition={'ease-out all 0.3s;'}>
                {stage > 1 &&
                    <motion.div initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1.5}}>
                        <Text w={'full'} textAlign={'center'} fontSize={'lg'} mt={'20px'} fontWeight={'semibold'}>{money[1].money} SpaceBucks</Text>
                    </motion.div>
                }            
            </Box>
        </VStack>
        <VStack>  
            <span id="firstConfetti" />  
            { stage > 3 && 
            <motion.div initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 0}}>
                <Text fontWeight={'semibold'} fontSize={'4xl'}>{money[0].name}</Text>
            </motion.div>}
            <Box w={'200px'} bg={stage == 3 ? 'blackAlpha.500' : stage > 3 ? 'yellow.400' : 'blackAlpha.300'} h={'60vh'} transition={'ease-out all 0.3s;'}>
                {stage > 3 &&
                <motion.div initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 0}}>
                    <Text w={'full'} textAlign={'center'} fontSize={'lg'} mt={'20px'} fontWeight={'semibold'}>{money[0].money} SpaceBucks</Text>
                </motion.div>
                }
            </Box>
        </VStack>
        <VStack>
            { stage > 0 && 
            <motion.div initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1.5}}>
                <Text fontWeight={'semibold'} fontSize={'2xl'}>{money[2] ? money[2].name : "Nobody"}</Text>
            </motion.div>}
            <Box w={'200px'} bg={stage > 0 && stage != 3 ? 'blue.500' : 'blackAlpha.300'} h={'40vh'} transition={'ease-out all 0.3s;'}>
                {stage > 0 &&
                <motion.div initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{delay: 1.5}}>
                    <Text w={'full'} textAlign={'center'} fontSize={'lg'} mt={'20px'} fontWeight={'semibold'}>{money[2] ? money[2].money : '0'} SpaceBucks</Text>
                </motion.div>
                }
            </Box>
        </VStack>
        <HStack px={'20px'} bg={'blackAlpha.500'} backdropFilter={'blur(10px)'} rounded={"full"} h={'70px'} w={'50vw'} position={'fixed'} bottom={'10px'}>
            <Button w={'full'} onClick={()=> router.push('/')}>Play Again</Button>
            <Button w={'full'} onClick={()=> router.push('/answers')} colorScheme={'blue'}>Answers</Button>
        </HStack>
    </HStack></>}
    </>)
}