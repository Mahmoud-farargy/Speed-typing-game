import React,{Component} from "react";
import "./Header.css";
class Header extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <header className="header mb-5"><h2><i
            style={{
                filter: this.props.blink ? `drop-shadow(rgba(255, 255, 255, 1) 0px 0px 15px)` : `drop-shadow(rgba(255, 255, 255, 0) 0px 0px 0px)`
            }}
             className="fab fa-weebly mr-2"></i> WordBeater</h2></header>
        )
    }
}

export default Header;