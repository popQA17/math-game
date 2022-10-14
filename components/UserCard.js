import { Box, Heading, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";

export default function UserCard({data, index}){
    const colorList = [
        'red',
        'blue',
        'green',
        'yellow'
    ]
    return(<>
    <VStack w={'250px'} right={index > 1 && '10px'} left={index < 2 && '10px'} top={(index == 0 || index == 2) && '10px'} bottom={(index == 1 || index == 3) && '10px'} rounded={'lg'} bg={'blackAlpha.500'} p={4} position={'fixed'} zIndex={3}>
            <HStack w={'full'}>
                <Box rounded={'full'} w={'25px'} h={'25px'} bg={`${colorList[index]}.300`}></Box>
                <Heading fontSize={'xl'} fontWeight={'semibold'}>{data.name}</Heading>
                <Spacer/>
                <HStack rounded={'lg'} bg={'blackAlpha.500'} px={4} py={1}>
                    <Image width={'50px'} height={'auto'} src={"/MoneySign.png"}/>
                    <Text fontWeight={'bold'} fontSize={'xl'}>{data.money}</Text>
                </HStack>
            </HStack>
    </VStack>
    </>)
}