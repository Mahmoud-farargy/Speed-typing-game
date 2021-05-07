import React from "react";
import Auxiliary from "../HOC/Auxiliary";
import Word from "../Word/Word";

const WordMode = (props)=>{
    const insertedText = (event)=>{
        props.onChageInput(event.target.value);
    }
    // const reload = ()=>{
    //    window.location.reload();
    // }
    return(
        <Auxiliary>
        { props.lang === "English" ?
            <div className="gameContainer">
                <h2><span role="img" aria-label="emoji">👩‍</span> <span role="img" aria-label="emoji"> 💻 </span> WordBeater <span role="img" aria-label="emoji">👨‍</span> <span role="img" aria-label="emoji"> 💻 </span></h2>
                <h5 className="instructionsTitle">Type the given word in <span className="seconds-allowed">{props.timeSpecified}</span> seconds: </h5>
                <Word increaseMistakesCounter={props.increaseMistakesCounter} currentWord = {props.currentWord} enteredVal= {props.enteredVal}/>
                <input autoFocus type="text" onChange={(event)=> insertedText(event)} value={props.enteredVal} className="form-control englishTyping"  placeholder="Start typing..." />
                <div className="dividedRow">
                    <h4>Time left: <span className="digNumber">{props.counter}</span>s</h4>
                    <h4>Score: <span className="digNumber">{props.score}</span></h4>
                    <button className="reloadBtn" onClick={()=> props.ceaseGame()}>Back</button>
                </div>
            </div>
            : props.lang === "عربى" ?
            <div className="gameContainer">
                <h2><span role="img" aria-label="emoji">👩‍</span> <span role="img" aria-label="emoji"> 💻 </span> وردبيتر <span role="img" aria-label="emoji">👨‍</span> <span role="img" aria-label="emoji"> 💻 </span></h2>
                <h5 className="instructionsTitle">أكتب الكلمة المعطاه فى <span className="seconds-allowed">{props.timeSpecified}</span> ثوانى </h5>
                <Word increaseMistakesCounter={props.increaseMistakesCounter} currentWord = {props.currentWord} enteredVal= {props.enteredVal}/>
                <input autoFocus type="text" onChange={(event)=> insertedText(event)} value={props.enteredVal} className="form-control arabicTyping" placeholder="...ابدأ الكتابة" />
                <div className="dividedRow">
                    <h4> الوقت المتبقى <span className="digNumber">{props.counter}</span> ثانية </h4>
                    <h4><span className="digNumber">{props.score}</span> :النقاط </h4>
                    <button className="reloadBtn" onClick={()=> props.ceaseGame()}>العودة</button>
                </div>
            </div>
            : null
            }
        </Auxiliary>
    )
}

export default WordMode;