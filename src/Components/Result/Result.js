import React from "react";

const Result = (props)=>{
  let netWPM;
  if(props.typedText !== ""){
     netWPM = Math.floor(props.typedText.length /5 / (props.counter /60));
  }
    return(
        <div>
          {         //Bring Word Mode result
            props.mode ==="Words" && props.lang === "English" ? //Words - Enlgish
            <div className="gameContainer">
                <h1 className="timeRanOut">Time ran out</h1>
                <h5 className="instructionsTitle">Your final score is <span className="digNumber">{props.score}</span> points</h5>
                
                <button onClick={()=> props.restart()} className="tryAgainBtn btn btn-light">Try again</button>
            </div>//Bring Phrase Mode result
            : props.mode ==="Phrases" && props.lang === "English" ? //Phrases - English
            <div className="gameContainer">
                <h3>Result</h3>
                <h5 className="instructionsTitle">Your time was <span
                style={{ //dynamic styles
                    color: props.counter <= 25 ? "rgb(71, 218, 71)" : props.counter > 25 && props.counter <= 40 ? "rgb(218, 191, 71)"  : props.counter >40 ? "rgb(218, 71, 71)"  : "#fff" 
                 }}
                 className="digNumber">{props.counter}</span> seconds</h5>
                <h5 className="instructionsTitle">
                <span 
                 style={{
                   fontFamily: 'Digital',
                    color: netWPM < 25 ? "rgb(218, 71, 71)" : netWPM >= 25 && netWPM < 40 ? "rgb(218, 191, 71)"  : netWPM >=40 ? "rgb(71, 218, 71)"  : "#fff" 
                 }}
                 className="WPMStyle">{netWPM}</span> WPM</h5>
               {
                 props.mistakesCounter > 0 ?
                  <h6>You made {props.mistakesCounter} mistakes while typing.</h6>
                  :
                  <h6>Congrats! you did't make any mistakes.</h6>
               }  
                <h5 className="instructionsTitle">The quote you wrote was one of {props.author} quotes</h5>
                <button onClick={()=> props.restart()} className="tryAgainBtn btn btn-light">Try again</button>
            </div>
            : props.mode ==="Words" && props.lang === "????????" ? //Words - Araric
            <div className="gameContainer">
                <h1 className="timeRanOut">?????? ?????? ??????????</h1>
                <h5 className="instructionsTitle"> ?????????? ???????????? ???? <span className="digNumber">{props.score}</span> ???????? </h5>
                
                <button onClick={()=> props.restart()} className="tryAgainBtn btn btn-light">???????? ??????????</button>
            </div>
            : (props.mode ==="Phrases" ||  props.mode ==="??????")  && props.lang === "????????" ? //Phrases - Arabic
            <div className="gameContainer">
                <h3>??????????????</h3>
                <h5 className="instructionsTitle"> ?????? ?????????????? <span 
                style={{
                  color: props.counter <= 25 ? "rgb(71, 218, 71)" : props.counter > 25 && props.counter <= 40 ? "rgb(218, 191, 71)"  : props.counter >40 ? "rgb(218, 71, 71)"  : "#fff" 
                }}
                className="digNumber">{props.counter}</span> ?????????? </h5>
                <h5 className="instructionsTitle"><span
                  style={{
                    fontFamily: 'Digital',
                    color: netWPM < 25 ? "rgb(218, 71, 71)" : netWPM >= 25 && netWPM < 40 ? "rgb(218, 191, 71)"  : netWPM >=40 ? "rgb(71, 218, 71)"  : "#fff" 
                  }}
                 className="WPMStyle">{netWPM} </span> ???????? ???? ??????????????</h5>
                <h5 className="instructionsTitle"> ???????????????? ???????? ?????????? ?????? ???? ?????????? {props.author}</h5>
                <button onClick={()=> props.restart()} className="tryAgainBtn btn btn-light">???????? ??????????</button>
            </div>
            : null
          }  
           
        </div>
    )
}

export default Result;