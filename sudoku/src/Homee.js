import React ,{Component} from "react";
import "./Home.css";
import Board from './Components/Board';
import { GenerateBoard } from "./MiddleWare/GenerateBoard";

class Home extends Component{

    render(){
        return(
            <div>
                <Board />
            </div>
        )
    }
}

export default Home;