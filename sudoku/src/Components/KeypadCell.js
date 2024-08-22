import React from "react";
import '../Style_Sheets/Cell.css';

class KeypadCell extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(){
        this.props.handleEnterVal(this.props.value);
    }
    render(){
        return(
            <div className="cell" onClick={this.handleChange}>
                    <p className="value">
                        {this.props.value}
                    </p>
            </div>
        )
    }
}

export default KeypadCell;