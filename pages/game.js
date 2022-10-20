import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Board from "../components/Board";
import QuestionCard from "../components/Questioncard";
import questions from "../components/questions";
import Wheel from "../components/wheel";

export default function Game({participants, checkExceed}){
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        if (participants.length < 2){
            setLoaded(false)
            router.push('/')
        } else {
            setLoaded(true)
        }
    }, [])
    return(<>
    {loaded && <Board checkExceed={checkExceed} participants={participants}/>}
    </>)
}