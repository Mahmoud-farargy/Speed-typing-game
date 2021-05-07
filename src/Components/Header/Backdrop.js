import React from "react";

const Backdrop = (props)=>{
    return(
        <div id="backdrop" onClick={()=> props.closeBackdrop()}></div>
    )
}

export default Backdrop;