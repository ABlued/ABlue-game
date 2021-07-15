import React from 'react'
import { Route } from 'react-router-dom';
import Score from './Score'
import Quiz from './Quiz'
import Start from './start'
import img from './img.jpg'
import Ranking from './rank';
import Message from './Message';


const App = () =>{
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
