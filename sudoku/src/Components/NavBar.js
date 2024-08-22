import React from "react";
import {Link} from "react-router-dom";
import  "../Style_Sheets/NavBar.css";
class NavBar extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark ">
              <div className="collapse navbar-collapse justify-content-between " id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <button><Link to="/board" className="button" >Board</Link></button>
                  <button><Link to="/message" className="button">Message</Link></button>
                </div>
              </div>
            </nav>
        )
    }
}
export default NavBar;