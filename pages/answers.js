import { Box, Button, Heading, HStack, IconButton, Image, Input, Spacer, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import questions from "../components/questions"

export default function Answer({participants}){
    const [loaded, setLoaded] = useState(false)
    const router =  useRouter()
    const [question, setQuestion] = useState(0)
    useEffect(()=>{
        if (participants.length < 2){
            router.push('/')
        } else {
            setLoaded(true)
        }
        function onBlur(){
            //router.push('/')
        }
        window.addEventListener("blur", onBlur);
        return () => {
            window.removeEventListener("blur", onBlur);
        };
    }, [])
    const [questionText, setQuestionText] = useState(1)
    useEffect(()=>{
        setQuestionText(question + 1)
    }, [question])
    return(<>
        { loaded && 
            <VStack h={"100vh"}>
                <HStack w={'full'} bg={'gray.700'} h={'70px'} px={'20px'}>
                    <Box h={'25px'} w={'25px'} rounded={'full'} bg={`${questions[question].mode == 'easy' ? 'green' : questions[question].mode == 'medium' ? 'orange' : 'red'}.200`}/>
                    <HStack>
                        <Heading fontSize={'xl'}>Question</Heading> 
                        <Input w={'55px'} variant={'filled'} size={'lg'} type={'number'} value={questionText} onChange={(e)=>{
                            setQuestionText(Number(e.target.value))
                        }} onBlur={(e)=>{
                            if (questionText < 1){
                                setQuestion(0)
                                setQuestionText(1)
                            } else if (questionText> questions.length){
                                setQuestion(questions.length - 1)
                                setQuestionText(questions.length)
                            } else {
                                setQuestion(questionText - 1)
                            }
                        }}></Input> 
                        <Heading fontSize={'xl'}>/</Heading> 
                        <Input w={'55px'} variant={'filled'} size={'lg'} type={'number'} value={questions.length} readOnly={true}></Input> 
                    </HStack>
                    <Spacer/>
                    <Button colorScheme={'teal'}>Play Again</Button>
                </HStack>
                <VStack h={'calc(100vh - 70px)'} w={'full'} p={'20px'}>
                    <HStack w={'full'} h={'full'} backgroundColor={'gray.700'} rounded={'lg'}>
                        <IconButton onClick={()=> setQuestion((old)=> old - 1)} disabled={question == 0} h={'full'} icon={<FaChevronLeft/>}></IconButton>
                        <Spacer/>
                        <Image rounded={'lg'} h={'full'} src={`/MathAnswers/${question + 1}.png`}></Image>
                        <Spacer/>
                        <IconButton onClick={()=> setQuestion((old)=> old + 1)} disabled={question == questions.length - 1} h={'full'} icon={<FaChevronRight/>}></IconButton>
                    </HStack>
                </VStack>
            </VStack>
        }
    </>)
}