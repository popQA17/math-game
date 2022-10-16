import Board from "../components/Board";
import QuestionCard from "../components/Questioncard";
import questions from "../components/questions";
import Wheel from "../components/wheel";

export default function Game({participants}){
    return(<>
    <Board participants={participants}/>
    </>)
}