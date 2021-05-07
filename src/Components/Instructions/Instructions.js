import React from "react";

const Instructions =(props)=>{
    return(
        <div>
            {props.lang === "English" ? <h5 className="mode">Mode: {props.mode} </h5> : props.lang === "عربى" && props.mode ==="Words" ? <h5 className="mode"> وضع: كلمات</h5> : props.lang === "عربى" && props.mode ==="Phrases" ? <h5 className="mode"> وضع: جمل</h5> :null}
            <h5 className="mode">{props.lang === "English" ? "Language: English" : "اللغة : العربية"}</h5>
            {props.mode === "Words" ? <h5 className="mode">{props.lang === "English" ? "Difficulty" : "الصعوبة"} : {props.difficulty} </h5>:null}

            { props.lang ==="English" && props.mode ==="Words" ? //English-words
            <div>
                <div className="instructions-box">
                    <h5 >Instructions</h5>
                    <p>Type each word in the given amount of seconds to score. to
                    play again after ending game, press "Try again". Your score will reset
                        </p>
                    <p>Make sure to switch to the English language before starting.</p>
                </div>
                <button onClick={()=>props.startGame()} className="startBtn btn btn-warning px-4 my-3">Start</button>
            </div>
            : props.lang === "عربى" && props.mode === "Words" ? //Arabic-words
            <div>
                <div className="instructions-box">
                        <h5 >التعليمات</h5>
                        <p>أكتب كل كلمة فى اطار الوقت المحدد لتزيد نقاطك. للعب مرة أخرى بعد انهاء اللعب اضغط على زر "حاول مجددا". نقاطك سوف تستجد</p>
                        <p>احرص على التحويل للغة العربية قبل البدأ</p>
                </div>
                <button onClick={()=>props.startGame()} className="startBtn btn btn-warning px-4 my-3">ابدأ</button>
            </div>
            : props.lang === "English" && props.mode ==="Phrases" ? //English-phrases
            <div>
                <div className="instructions-box">
                    <h5 >Instructions</h5>
                    <p>Type the given phrase as fast as possible. As you type, your timer will start counting up and when your inserted text matches the given phrase, a result will be shown.</p>
                    <p>Make sure to switch to the English language before starting.</p>
                </div>
                <button onClick={()=>props.startGame()} className="startBtn btn btn-warning px-4 my-3">Start</button>
            </div>
            : props.lang === "عربى" && props.mode ==="Phrases" ? //Arabic-phrases
            <div>
                <div className="instructions-box">
                        <h5 >التعليمات</h5>
                        <p>قم بكتابة الجملة المعطاة فى اسرع وقت ممكن. عند الكتابة العداد سوف يعد تصاعديا و عندما يتطابق النص الذى تدخله مع الجملة المعطاه النتائج سوف تظهر</p>
                        <p>احرص على التحويل للغة العربية قبل البدأ</p>
                </div>
                <button onClick={()=>props.startGame()} className="startBtn btn btn-warning px-4 my-3">ابدأ</button>
            </div>
            : null
            }
        </div>
    )
}

export default Instructions;
