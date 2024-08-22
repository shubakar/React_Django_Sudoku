import React from "react";
import '../Style_Sheets/Cell.css';

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(){
        this.props.handleCellSelect(this.props.row, this.props.column, this.props.value);
    }
    render(){
        return(
            <div className={"cell " + (this.props.selected?"selected ":"not_selected ")+(this.props.fixed_value==1?"fixed":"not_fixed")}  onClick={this.handleChange}>
                    <p className="value">
                        {this.props.value}
                    </p>
            </div>
        )
    }
}

export default Cell;