import React, {useEffect, useRef} from "react";
import "./Word.css";
const Word = (props) =>{
    
    let  word = props.currentWord;
    var displayWord = useRef(null); 
    useEffect(()=>{
            var char = word.split("");
            displayWord.current.innerHTML = "";
            char.forEach(element => {
                var characterSpan = document.createElement("span");
                characterSpan.innerText = element;
                displayWord.current.appendChild(characterSpan);
            })    
    },[word]); //Only refreshes when a change occur to "word"

    useEffect(()=>{
        let arrayELements = displayWord.current.querySelectorAll("span");
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
        <h4 className="wordStyle" ref={displayWord}></h4>
    )
}

export default Word;