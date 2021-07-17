import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';
import Score from './Score'
import Quiz from './Quiz'
import Start from './start'
import img from './img.jpg'
import Ranking from './rank';
import Message from './Message';
import { firestore } from "./firebase";
import { useSelector } from 'react-redux';

const App = () =>{
    const reduxList = useSelector(state => state.quiz.list);
    const reduxScoreMsg = useSelector(state => state.quiz.scoreMsg);
    const reduxUserAllData = useSelector(state => state.quiz.userAllData)
    const reduxMyName = useSelector(state => state.quiz.myName)
    useEffect(() => {
        // const listDB = firestore.collection("list");
        // const scoreMsgDB = firestore.collection("scoreMsg");
        // const userAllDataDB = firestore.collection("userAllData");
        // const myNameDB = firestore.collection("myName");
        // reduxList.map((v,i) => {
        //     listDB.doc("quiz" + (i+1)).set({question: v.question, answer: v.answer});
        // })
        // reduxScoreMsg.map((v,i) => {
        //     scoreMsgDB.doc("msg" + (i+1)).set({msg: v});
        // })
        // reduxUserAllData.map((v,i) => {
        //     userAllDataDB.doc("user" + (i+1)).set({userName : v.userName, userScore: v.userScore, userComment: v.userComment});
        // })
        // myNameDB.doc("myName").set({myName:"나재완"});
    }, [])

    return (
        <>
            <div className="App">
                <Route exact path="/" component={Start}/>
                <Route path="/quiz"   component={Quiz}/>
                <Route path="/score"  component={Score}/>
                <Route path="/ranking"  component={Ranking}/>
                <Route path="/message"  component={Message}/>
            </div>
        </>
    )
}

export default App
