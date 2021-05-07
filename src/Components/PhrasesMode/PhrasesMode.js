import React from "react";
import Auxiliary from "../HOC/Auxiliary";
import Phrase from "./Phrase";
import "./Phrases.css";

const PhrasesMode =(props)=>{
        const insertedText = (event)=>{
            props.onChageInput(event.target.value);
        }
        let textareaStyle;
        switch(props.lang){
            case "English":
                textareaStyle = "phraseTextarea form-control";
                break;
            case "عربى":
                textareaStyle = "phraseTextarea form-control arabicTyping";
                break;
            default:
                textareaStyle = "phraseTextarea form-control";
                break;
        }
        
        return(
            <Auxiliary>
                { props.lang === "English"
                ?
                <div className="gameContainer">
                    <h2><span role="img" aria-label="emoji">👩‍ </span><span role="img" aria-label="emoji">💻</span>  WordBeater <span role="img" aria-label="emoji">👨‍</span> <span role="img" aria-label="emoji">💻</span></h2>
                    <h5 className="instructionsTitle">Type the following: </h5>
                    <Phrase increaseMistakesCounter={props.increaseMistakesCounter} currentPhrase = {props.currentPhrase} enteredVal= {props.enteredVal}/>
                    <textarea className={textareaStyle} autoFocus onChange={(event)=> insertedText(event)} value={props.enteredVal} placeholder="Start typing..." ></textarea>
                    <div className="dividedRow">
                        <h4>Timer: <span className="digNumber">{props.counter}</span>s</h4>
                        <button onClick={()=>props.ceaseGame()} className="reloadBtn">Back</button>
                    </div>
                </div>
                : props.lang === "عربى"
                ?
                <div className="gameContainer">
                    <h2><span role="img" aria-label="emoji">👩‍</span> <span role="img" aria-label="emoji"> 💻 </span> وردبيتر <span role="img" aria-label="emoji">👨‍</span> <span role="img" aria-label="emoji"> 💻 </span></h2>
                    <h5 className="instructionsTitle">:أكتب التالى </h5>
                    <Phrase increaseMistakesCounter={props.increaseMistakesCounter} currentPhrase = {props.currentPhrase} enteredVal= {props.enteredVal}/>
                    <textarea className={textareaStyle} autoFocus onChange={(event)=> insertedText(event)} value={props.enteredVal} placeholder="...ابدأ الكتابة" ></textarea>
                    <div className="dividedRow">
                        <h4>الوقت: <span className="digNumber">{props.counter}</span> ثانية </h4>
                        <button onClick={()=>props.ceaseGame()} className="reloadBtn">العودة</button>
                    </div>
                </div> : null
                } 
            </Auxiliary>
        )
};

export default PhrasesMode;