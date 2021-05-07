import React,{useRef, useEffect} from "react";
import "./Phrases.css";

const Phrases =(props)=>{
    let  phrase = props.currentPhrase;
    var displayPhrase = useRef(null); 
    useEffect(()=>{
            var char = phrase.split("");
            displayPhrase.current.innerHTML = "";
            char.forEach(element => {
                var characterSpan = document.createElement("span");
                characterSpan.innerText = element;
                displayPhrase.current.appendChild(characterSpan);
            })    
    },[phrase]); //Only refreshes when a change occur to "word"

    useEffect(()=>{
        let arrayELements = displayPhrase.current.querySelectorAll("span");
        var splittedEnteredVal = props.enteredVal.split("");
        arrayELements.forEach((charSpan, index)=>{
            let character = splittedEnteredVal[index];
            if(character == null){
                charSpan.classList.remove("correct");
                charSpan.classList.remove("incorrect");  
            }else if(character === charSpan.innerHTML){
                charSpan.classList.add("correct");
                charSpan.classList.remove("incorrect");
            }else{
                props.increaseMistakesCounter();
                charSpan.classList.remove("correct");
                charSpan.classList.add("incorrect");
            }
        });
    },[props.enteredVal]);

    return(
        <h4 className="phraseStyle" ref={displayPhrase}></h4>
    )
}

export default Phrases;