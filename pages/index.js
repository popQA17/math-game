import { Box, Button, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Homepage(){
  const router = useRouter()
  return(<>
    <Box filter={'blur(20px)'} position={'fixed'} top={0} left={0} w={'full'} h={'full'} backgroundColor={'black'} backgroundImage={'/welcome.jpg'} backgroundSize={'cover'} backgroundPosition={'top'} backgroundRepeat={'no-repeat'} zIndex={2}>
    </Box>
    <VStack position={'fixed'} top={0} w={'full'} zIndex={3} h={'full'}>
      <Spacer/>
      <Heading fontSize={'6xl'}>SpaceMath</Heading>
      <Text fontSize={'xl'}>Primary 5 / 6 Math Game </Text>
      <Button onClick={()=> router.push('/participants')} _hover={{transform: 'scale(1.2)'}} px={'50px'} mt={'20px !important'} className={'movingGradient'} bgGradient={'linear(to-r, blue.300, pink.400)'} colorScheme={'blue'} color={'white'} size={'lg'} transition={'ease-in-out all 0.3s'} >Start</Button>
      <Spacer/>
      <Text mb={'20px !important'} fontWeight={'semibold'}>Presented by Qi An and Joel Goh</Text>
    </VStack>
  </>)
}