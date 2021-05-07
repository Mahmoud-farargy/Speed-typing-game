import React ,{Component, Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, withRouter, Redirect} from "react-router-dom";


//Import Components
import Aux from "./Components/HOC/Aux";
import Header from './Components/Header/Header';
import WordsMode from "./Components/WordsMode/WordsMode";
import englishWordList from "./englishWordList.json";
import arabicWordList from "./arabicWordList.json";
import englishQuotes from "./englishQuotes.json";
import ArPhrases from "./arabicPhrases.json";
import Instructions from "./Components/Instructions/Instructions";
import Result from "./Components/Result/Result";
import Axios from "axios";
import PhrasesMode from "./Components/PhrasesMode/PhrasesMode";
import Backdrop from "./Components/Header/Backdrop"
// import rootReducer from "";
// const Redux  = require("redux");
// const createStore = Redux.createStore();
// const store  = createStore(rootReducer);
class MainApp extends Component{
    constructor(props){
        super(props);
        this.state={
           timeSpecified:10,
           counter:0,
           mistakesCounter: 0,
           score:0,
           selectedMode: "Phrases",
           selectedLanguage: "English",
           selectedDifficulty: "Easy",
           englishWordJson: englishWordList,
           englishPhrases: englishQuotes,
           arabicWordJson: arabicWordList,
           arabicPhrases: ArPhrases,
           currentWord: "Kind",
           currentPhrase: "",
           enteredValue:"",
           isGameRunning: false,
           timeRanOut: false,
           quoteAuthor: "",
           openSettings: false,
           cancelGame: false
        }
    }
    componentDidUpdate(prevProp, prevState){
        if(prevState.selectedMode !== this.state.selectedMode){
          this.setState({
            selectedMode: this.state.selectedMode === "جمل" ? "Phrases" : this.state.selectedMode === "كلمات" ? "Words" : this.state.selectedMode === "Words" ? "Words" : this.state.selectedMode === "Phrases" ? "Phrases": "Words"
          });  
        }
    }
   insertedText = (event)=>{
        this.setState({
            enteredValue: event.target.value
       });
    }
    changeInputValue (text){
        this.setState({
            enteredValue: text //updates inputValue from the child component
        });
    }
    onModeChange(event){
        this.setState({
            selectedMode: event.target.value,
            isGameRunning: false,
            cancelGame: true,
            currentPhrase: "",
            currentWord: ""
        });
    }
    onLanguageChange(event){
        this.setState({
            selectedLanguage: event.target.value,
            isGameRunning: false,
            cancelGame: true,
            currentPhrase: "",
            currentWord: ""
        }); 
    }
    onDifficultyChange(event){
        this.setState({
            selectedDifficulty: event.target.value,
            isGameRunning: false,
            cancelGame: true,
            currentPhrase: "",
            currentWord: ""
        });
    }
    onSettingsClick(){
        document.body.style.overflowY = "hidden";
        this.setState({
            openSettings: true
        });
    }
    onBackdropClick(){
        document.body.style.overflowY = "auto";
         this.setState({
            openSettings: false
        });
    }
    capitalizeWords = (word)=>{
        let givenWord = word;
        let firstLetter = givenWord.slice(0,1).toUpperCase();
        let theRestOfTheWord  = givenWord.slice(1);
        let capitalizeGivenWord = firstLetter.concat(theRestOfTheWord);
        return capitalizeGivenWord;
    }
    beginGame =()=>{
        // this.props.histroy.push("/words");
        //Words Mode
        if(this.state.selectedMode === "Words"){
            let interval;
            this.setState({
                    isGameRunning: true,
                    cancelGame: false,
                    counter: 10
            });
            // let givenWord = this.state.englishWordJson[Math.floor((Math.random() * this.state.englishWordJson.length))];
            // let firstLetter = givenWord.slice(0,1).toUpperCase();
            // let theRestOfTheWord  = givenWord.slice(1);
            // let capitalizeGivenWord = firstLetter.concat(theRestOfTheWord);
            if(this.state.selectedLanguage ==="English"){ //loads English word json file
                this.setState({
                    currentWord: this.capitalizeWords(this.state.englishWordJson[Math.floor((Math.random() * this.state.englishWordJson.length))])
                });
            }else if(this.state.selectedLanguage ==="عربى"){  //loads Arabic word json file
                 this.setState({
                    currentWord: this.state.arabicWordJson[Math.floor((Math.random() * this.state.arabicWordJson.length))]
                });
            }
           
            interval = setInterval(function(){
                console.log(this.state.isGameRunning);
                if (this.state.enteredValue === this.state.currentWord && this.state.isGameRunning){  //matching words
                    let estimatedPoints;
                    switch(this.state.selectedDifficulty){
                        case "Easy" || "سهل" :
                            estimatedPoints = this.state.counter +=6;
                        break;
                        case "Medium" || "متوسط":
                            estimatedPoints = this.state.counter +=3;
                        break;
                        case "Hard" || "صعب":
                            estimatedPoints = this.state.counter +=2;
                        break;
                        default: 
                            estimatedPoints = 10;
                        break;
                    }
                    this.setState({
                        score: this.state.score+1,
                        counter: estimatedPoints,
                        enteredValue:"",
                    })
                    if(this.state.selectedLanguage ==="English"){ //loads English word json file
                        this.setState({
                        currentWord: this.capitalizeWords(this.state.englishWordJson[Math.floor((Math.random() * this.state.englishWordJson.length))])
                    });
                    }else if(this.state.selectedLanguage ==="عربى"){  //loads Arabic word json file
                        this.setState({
                        currentWord: this.state.arabicWordJson[Math.floor((Math.random() * this.state.arabicWordJson.length))]
                    });
                    }
                } 
                this.setState({
                    counter: this.state.counter-1
                });
                if(this.state.counter <= 0 ){
                    this.setState({
                        isGameRunning: false,
                        timeRanOut: true
                    });
                    clearInterval(interval);
                }
                if(this.state.cancelGame){
                    clearInterval(interval);
                    this.setState({
                        isGameRunning: false
                    })
                }
            }.bind(this),1000);
        }
        //Phrases Mode
        if(this.state.selectedMode === "Phrases"){
            let interval;
            this.setState({
                isGameRunning: true,
                cancelGame: false,
                counter: 0,
                currentPhrase: "Loading..."
            });
            
            Axios.get("http://api.quotable.io/random")
            .then(res => {
                if(this.state.selectedLanguage === "English"){
                    this.setState({
                        currentPhrase: res.data.content,
                        score: this.state.score+1,
                        quoteAuthor: res.data.author
                    });
                }else if(this.state.selectedLanguage ==="عربى"){
                    this.setState({
                        score: this.state.score+1,
                        currentPhrase: this.state.arabicPhrases[Math.floor((Math.random() * this.state.arabicPhrases.length))].content,
                        quoteAuthor: this.state.arabicPhrases[Math.floor((Math.random() * this.state.arabicPhrases.length))].author
                    });
                }
                interval = setInterval(function(){
                    if (this.state.enteredValue === this.state.currentPhrase && this.state.isGameRunning){  //matching phrase
                         clearInterval(interval);
                         this.setState({
                            isGameRunning: false,
                            timeRanOut:true
                        });
                    }
                    if(this.state.counter >=200){
                        clearInterval(interval);
                        this.setState({
                           isGameRunning: false,
                           timeRanOut:true
                       });
                    }
                    if(this.state.cancelGame){
                        clearInterval(interval);
                        this.setState({
                            isGameRunning: false
                        })
                    }
                    this.setState((prevState)=>({counter: prevState.counter+1}));
                }.bind(this),1000);
            }).catch(err =>{ //if there is any server error deal with the rainy day
                // alert(err);
                if(this.state.selectedLanguage === "English"){
                    this.setState({
                        currentPhrase: this.state.englishPhrases[Math.floor((Math.random() * this.state.englishPhrases.length))].content,
                        score: this.state.score+1,
                        quoteAuthor: this.state.englishPhrases[Math.floor((Math.random()* this.state.englishPhrases.length))].author
                    });
                }else if(this.state.selectedLanguage ==="عربى"){
                    this.setState({
                        score: this.state.score+1,
                        currentPhrase: this.state.arabicPhrases[Math.floor((Math.random() * this.state.arabicPhrases.length))].content,
                        quoteAuthor: this.state.arabicPhrases[Math.floor((Math.random() * this.state.arabicPhrases.length))].author
                    });
                }
                interval = setInterval(function(){
                    if (this.state.enteredValue === this.state.currentPhrase && this.state.isGameRunning){  //matching phrase
                         clearInterval(interval);
                         this.setState({
                            isGameRunning: false,
                            timeRanOut:true
                        });
                    }
                    if(this.state.counter >=200){
                        clearInterval(interval);
                        this.setState({
                           isGameRunning: false,
                           timeRanOut:true
                       });
                    }
                    if(this.state.cancelGame){
                        clearInterval(interval);
                        this.setState({
                            isGameRunning: false
                        })
                    }
                    this.setState((prevState)=>({counter: prevState.counter+1}));
                }.bind(this),1000);
            });
           
            
        }
         
    }
    restart =()=>{
        this.beginGame();
        if(this.state.selectedMode === "Words"){
            this.setState({
                    timeRanOut: false,
                    score: 0,
                    mistakesCounter: 0,
                    counter: 11,
                    enteredValue:"",
                    currentPhrase: "",
                    quoteAuthor: "",
                    cancelGame: false,
            });  
            if(this.state.selectedLanguage ==="English"){ //loads English word json file
                this.setState({
                    currentWord: this.capitalizeWords(this.state.englishWordJson[Math.floor((Math.random() * this.state.englishWordJson.length))])
                });
            }else if(this.state.selectedLanguage ==="عربى"){  //loads Arabic word json file
                 this.setState({
                    currentWord: this.state.arabicWordJson[Math.floor((Math.random() * this.state.arabicWordJson.length))]
                });
            }
        }else if(this.state.selectedMode === "Phrases"){
            this.setState({
                    timeRanOut: false,
                    score: 0,
                    mistakesCounter: 0,
                    counter: 0,
                    enteredValue:"",
                    currentPhrase: "",
                    quoteAuthor: "",
            }); 
        }
    }
    onCancelGame=()=>{
        this.setState({
           isGameRunning: false,
           timeSpecified:10,
           counter:0,
           score:0,
           currentWord: "",
           currentPhrase: "",
           enteredValue:"",
           timeRanOut: false,
           quoteAuthor: "",
           cancelGame: true,
           mistakesCounter: 0,
        })
    }
    increaseMistakesCounter = () => {
        this.setState( prevState =>({
                ...this.state,
                mistakesCounter: prevState.mistakesCounter+1
        }));
    }
    render(){
        return(
            <Aux>
                <Header blink={this.state.isGameRunning}></Header>
                {this.state.isGameRunning ?  <Redirect to="/words" /> : <Redirect to="/" />}
                {this.state.cancelGame && !this.state.isGameRunning ? <Redirect to="/" /> : null}
                {this.state.timeRanOut && !this.state.isGameRunning && !this.state.cancelGame ? <Redirect to="/result" />: null}
                {this.state.isGameRunning && this.state.selectedMode === "Phrases" ? <Redirect to ="/phrases" /> : null}
                
                <main className="container">

                        <div>
                                <Switch>
                                    <Suspense>
                                        <Route path="/" exact render={()=>  (<Instructions mode={this.state.selectedMode} lang={this.state.selectedLanguage} difficulty={this.state.selectedDifficulty} startGame={()=>this.beginGame()}/>)}/>
                                        <Route path="/words" exact render={()=>  (<WordsMode lang={this.state.selectedLanguage} increaseMistakesCounter={this.increaseMistakesCounter}  currentWord = {this.state.currentWord} enteredVal={this.state.enteredValue} onChageInput= {(val)=>this.changeInputValue(val)} timeSpecified= {this.state.timeSpecified} counter={this.state.counter} score={this.state.score} ceaseGame={()=>this.onCancelGame()}/>)}/>
                                        <Route path="/phrases" exact render={()=> (<PhrasesMode lang={this.state.selectedLanguage} increaseMistakesCounter={this.increaseMistakesCounter} currentPhrase={this.state.currentPhrase} enteredVal={this.state.enteredValue} onChageInput= {(val)=>this.changeInputValue(val)} counter={this.state.counter} ceaseGame={()=>this.onCancelGame()}/>)}/>
                                        <Route path="/result" exact render={()=>  (<Result restart={()=> this.restart()} typedText={this.state.enteredValue} lang={this.state.selectedLanguage}  score={this.state.score} counter={this.state.counter} mistakesCounter={this.state.mistakesCounter} mode={this.state.selectedMode} author={this.state.quoteAuthor}/>)}/>
                                    </Suspense>
                                </Switch>
                        </div>  
                                {/* Settings */}
                    {this.state.openSettings ?
                    <div>
                        
                        <Backdrop closeBackdrop={()=> this.onBackdropClick()}></Backdrop>
                        <div id="sideDrawer"
                        style={{
                            transform: "translateX(0)" ,
                            opacity: "1",
                            transition: "all 1s ease-in-out"
                        }}
                        className="text-dark">
                        <h4 className="closeSideDrawer text-primary" onClick={()=>this.onBackdropClick()}>&times;</h4>
                        <h3 className="text-primary text-center mt-1"> {this.state.selectedLanguage === "English" ? "Settings" : "الضبط"}</h3>
                            <div >
                                <label htmlFor="Lang" >{this.state.selectedLanguage === "English" ? "Language" : "اللغة"} </label>
                                <select id="Lang" defaultValue={this.state.selectedLanguage} className="form-control d-block" onInput={(event)=> this.onLanguageChange(event)}>
                                    <option>English</option>
                                    <option>عربى</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mode" >{this.state.selectedLanguage === "English" ? "Mode" : "الوضع"}</label>
                                <select id="mode" defaultValue={this.state.selectedMode} onInput={(event)=> this.onModeChange(event)} className="form-control">
                                    <option>{this.state.selectedLanguage === "English" ? "Phrases" : "جمل"}</option>
                                    <option>{this.state.selectedLanguage === "English" ? "Words" : "كلمات"}</option>
                                </select>
                            </div>
                           {this.state.selectedMode === "Words" ?
                           <div className="mb-3">
                                <label htmlFor="difficulty" >{this.state.selectedLanguage === "English" ? "Difficulty" : "الصعوبة"}</label>
                                <select id="difficulty" className="form-control d-block" onInput={(event)=>this.onDifficultyChange(event)}>
                                    <option>{this.state.selectedLanguage === "English" ? "Easy" : "سهل"}</option>
                                    <option>{this.state.selectedLanguage === "English" ? "Medium" : "متوسط"}</option>
                                    <option>{this.state.selectedLanguage === "English" ? "Hard" : "صعب"}</option>
                                </select>   
                            </div> : null}
                            <div className="aboutSection my-3">
                                <h3 className="text-primary text-center"><i className="fas fa-info fa-sm mr-1"></i> {this.state.selectedLanguage === "English" ? "About" : "حول"}</h3>
                                <h4 className="text-center">Hi, I'm Mahmoud!</h4>
                                <p>I am a front end developer specialized in Vue.js, React.js, Javascript and other technologies. You can visit my portfolio to find more cool projects like this one <a target="_blank" rel="noopener noreferrer" className="portfolioLink" href="https://mahmoudportfolio.netlify.app">Portfolio</a> .</p>
                                
                            </div>
                            <p className="text-center text-muted">&copy; 2020 Mahmoud Farargy</p>
                        </div>
                       
                    </div>
                     : null
                     }

                    {!this.state.isGameRunning ?<button  className="settingsBtn" onClick={()=> this.onSettingsClick()}><i className="fas fa-cog"></i></button> :null}
                </main>
            </Aux>
        ) 
    }
    
}
const mainApp=(
    <BrowserRouter>
        <MainApp/>
    </BrowserRouter>
)
export default withRouter(MainApp);
ReactDOM.render(mainApp, document.getElementById("App"));




//Dictionary API
//https://vocabulary.now.sh/words/unrecognizable
//https://vocabulary.now.sh/word/unrecognizable

//Random quotes API
//https://get-me-a-quote.herokuapp.com/

//another one
//http://api.quotable.io/random