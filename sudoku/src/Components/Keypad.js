import React from "react";
import KeypadCell from "./KeypadCell";

class Keypad extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const numbers = ["1","2","3","4","5","6","7","8","9"];
        // let numberpad = 
        return(
            
                numbers.map((curValue, index)=>{
                    <KeypadCell value = {curValue} key = {(11*10)+index} handleEnterVal = {this.props.handleEnterVal}/>
                })
            
        )
    }
}

export default Keypad;