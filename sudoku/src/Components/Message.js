import React from "react";
import NavBar from "./NavBar";

class Message extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                    <NavBar />
                    <h1>
                        This is second page
                    </h1>
            </div>
        )
    }
}

export default Message;