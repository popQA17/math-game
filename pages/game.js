import Board from "../components/Board";
import Wheel from "../components/wheel";

export default function Game({participants}){
    return(<>
    <Board participants={participants}/>
    </>)
}