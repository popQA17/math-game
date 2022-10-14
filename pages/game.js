import Board from "../components/Board";
import QuestionCard from "../components/Questioncard";
import Wheel from "../components/wheel";

export default function Game({participants}){
    return(<>

    <Board participants={participants}/>
    </>)
}