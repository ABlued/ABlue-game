import React, { useState } from 'react'
import img from './img.jpg'
import SwipeItem from './SwipeItem'
import styled from 'styled-components'
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userAnswerd } from './redux/quiz';


const Quiz = ({ history }) =>{
    const list = useSelector(state => state.quiz.list);
    const dispatch = useDispatch();
    const [num, setNum] = useState(0);

    const onSwipe = (direction) => {
      setNum(num + 1);
      if(direction === "left") {
        dispatch(userAnswerd("O"));
      } else {
        dispatch(userAnswerd("X"));
      }
      if(num + 1 === list.length) history.push('/score'); 
      }
      
      const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }
      
    return (
        <QuizContainer>
            <p><span>{num + 1}번문제</span></p>            
            <h1>문제입니다!</h1>
            {list.map((v,i) => {
                if(num === i){
                    return (<Question key={i}>{v.question}</Question>)
                }
            })}
            <AnswerZone>
                <Answer>O</Answer>
                <Answer>X</Answer>
            </AnswerZone>
            {list.map((v,i) => {
                if(i === num){
                    return(
                        <SwipeItem key={i} onSwipe={onSwipe}></SwipeItem>
                    )
                }
            })}
            </QuizContainer>
    )
}

const QuizContainer = styled.div`
  text-align: center;
  & > p > span {
    padding: 8px 16px;
    background-color: #fef5d4;
    // border-bottom: 3px solid #ffd6aa;
    border-radius: 30px;
  }
`;

const Question = styled.h1`
  font-size: 1.5em;
`;

const AnswerZone = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  min-height: 70vh;
`;

const Answer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: 600;
  color: #dadafc77;
`;

const DragItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  & > div {
    border-radius: 500px;
    background-color: #ffd6aa;
  }
  & img {
    max-width: 150px;
  }
`;

export default withRouter(Quiz)
// TinderCard 공식 문서 : https://www.npmjs.com/package/react-tinder-card