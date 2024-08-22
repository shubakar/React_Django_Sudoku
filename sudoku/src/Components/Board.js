import React from "react";
import '../Style_Sheets/Board.css';
import Row  from "./Row";
import Keypad from "./Keypad"
import { GenerateBoard ,checkSudoku} from "../MiddleWare/GenerateBoard";
import KeypadCell from "./KeypadCell";
import NavBar from "./NavBar";

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board : [["4"]],
            changeValues : [[0]],
            selectedRow : 0,
            selectedColumn : 0
        }
        this.getBoard = this.getBoard.bind(this);
        this.handleCellChange = this.handleCellChange.bind(this);
        this.handleCellSelect = this.handleCellSelect.bind(this);
        this.handleEnterVal = this.handleEnterVal.bind(this);
        this.handleCellErase = this.handleCellErase.bind(this);
        this.handlecheckSudoku = this.handlecheckSudoku.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this);
    }
    componentDidMount(){
        this.getBoard();
    }
    handleNewGame(){
        window.location.reload();
    }
    handlecheckSudoku(){
        let result = checkSudoku(this.state.board);
        if(!result){
            alert("Not a Valid Solution");
        }
        else{
            alert("You did it!!!!");
            window.location.reload();
            
        }
        
    }
    handleEnterVal(value){
        let changeValues = [...this.state.changeValues];
        let row = this.state.selectedRow;
        let column = this.state.selectedColumn;
        if(changeValues[row][column]==0){
            return ;
        }
        else{
            let newBoard = [...this.state.board];
            newBoard[this.state.selectedRow][this.state.selectedColumn] = value;
            this.setState({board : newBoard});
        }
    }
    async getBoard(){
        console.log("IN Home getBoard");
        ///////////////////////////////////////////////////////////

        

        /////////////////////////////////////////////////////
        let boa = [...await GenerateBoard()];
        let changeValues = boa.map((curRow)=>{
            return curRow.map((curVal)=>{
                if(curVal=="0")return 1;
                else return 0;
            })
        })
        let refindeBoard = boa.map((curRow)=>{
            return curRow.map((curVal)=>{
                if(curVal=="0")return " ";
                else return curVal;
            })
        })
        this.setState({board : refindeBoard, changeValues : changeValues});
        return boa;
    }
    handleCellSelect(row, column, value){
        this.setState({
            selectedRow : row,
            selectedColumn : column,
            
        })
    }
    handleCellErase(){
        let changeValues = [...this.state.changeValues];
        let row = this.state.selectedRow;
        let column = this.state.selectedColumn;
        if(changeValues[row][column]===0)return ;
        let board = this.state.board.map((curRow, index)=>{
            if(index===row){
                return curRow.map((curValue, colindex)=>{
                    if(colindex===column)return " ";
                    else return curValue;
                })
            }
            else{
                return curRow;
            }
        });
        console.log("In handle cell erase function");
        this.setState({board: board});
    }
    handleCellChange(value){
        let changeValues = [...this.state.changeValues];
        let row = this.state.selectedRow;
        let column = this.state.selectedColumn;
        if(changeValues[row][column]===0)return ;
        let board = this.state.board.map((curRow, index)=>{
            if(index===row){
                return curRow.map((curValue, colindex)=>{
                    if(colindex===column)return value;
                    else return curValue;
                })
            }
            else{
                return curRow;
            }
        });
        this.setState({board: board});
        
    }
    render(){
        let rows = this.state.board.map((curRow, index)=><tr><Row fixedValuesRow = {this.state.changeValues[index]} values = {curRow} key = {(index+1)*100} row = {index} handleCellSelect = {this.handleCellSelect} selectedRow = {this.state.selectedRow} selectedColumn = {this.state.selectedColumn}/> </tr>);

        return(
            <div>
                <NavBar />
                <table className="table">
                    {rows}
                </table>
                <table className="table">
                <tr>
                <td><KeypadCell value = "1" handleEnterVal = {this.handleEnterVal}/></td>
                <td><KeypadCell value = "2" handleEnterVal = {this.handleEnterVal}/></td>
                <td><KeypadCell value = "3" handleEnterVal = {this.handleEnterVal}/></td>
                <td><KeypadCell value = "4" handleEnterVal = {this.handleEnterVal}/></td>
                <td><KeypadCell value = "5" handleEnterVal = {this.handleEnterVal}/></td>
                <td><KeypadCell value = "6" handleEnterVal = {this.handleEnterVal}/></td>
                <td><KeypadCell value = "7" handleEnterVal = {this.handleEnterVal}/></td>
                <td><KeypadCell value = "8" handleEnterVal = {this.handleEnterVal}/></td>
                <td><KeypadCell value = "9" handleEnterVal = {this.handleEnterVal}/></td>
                </tr>
                </table>
                <button className = "button1" onClick={this.handleCellErase} value={" "}>Erase</button>
                <button className="button1" onClick={this.handlecheckSudoku}>Check</button>
                <div>
                    <button className="button1" onClick={this.handleNewGame}>New Game</button>
                </div>
            </div>
        )
    }
}

export default Board;