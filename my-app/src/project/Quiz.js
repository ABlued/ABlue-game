import React, { useState, useEffect } from 'react'
import SwipeItem from './SwipeItem'
import styled from 'styled-components'
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { userAnswerd } from './redux/quiz';
import { firestore } from './firebase';
import Spinner from './Spinner';

const Quiz = ({ history }) =>{
    const listDB = firestore.collection("list");
    const dispatch = useDispatch();
    const [num, setNum] = useState(0);
    const [quizData, setQuizData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const onSwipe = (direction) => {
      setNum(num + 1);
      if(direction === "left") {
        dispatch(userAnswerd("O"));
      } else {
        dispatch(userAnswerd("X"));
      }
      if(num + 1 === quizData.length) history.push('/score'); 
    }
    
    useEffect(() => {
      let list_data = [];
      listDB.get().then((docs) => {
        docs.forEach((doc) => {
          if(doc.exists){
            list_data = [...list_data, {...doc.data()}];
          }
        })})
        .then(_ => {
        setQuizData(list_data);
        setIsLoading(true);
      })
      
    }, [])


    const onCardLeftScreen = (myIdentifier) => {
      // console.log(myIdentifier + ' left the screen')
    }


    return (
        <QuizContainer>{
          (!isLoading)? 
            <Spinner text={"문제가 로드되는 중입니다."}/>
          :
          <>
            <ProgressBar>
              <HighLight width={(num/ (quizData.length - 1))*100+"%"}></HighLight>
              <Circle left={(num/ (quizData.length - 1))*100- 5 + "%"}></Circle>
            </ProgressBar>
            <p><span>{num + 1}번문제</span></p>            
            {quizData.map((v,i) => {
                if(num === i){

                    if(v.imgsrc){
                      return (
                        <>
                          <Img src={v.imgsrc}/>
                          <Question key={i}>{v.question}</Question>
                          <ImageAnswerZone>
                            <ImageAnswer>O</ImageAnswer>
                            <ImageAnswer>X</ImageAnswer>
                          </ImageAnswerZone>
                          <SwipeItem top={'150px'}key={i} onSwipe={onSwipe}></SwipeItem>
                        </>
                      )

                    } else {
                      return (
                        <>
                          <Question key={i}>{v.question}</Question>
                          <AnswerZone>
                            <Answer>O</Answer>
                            <Answer>X</Answer>
                          </AnswerZone>
                          <SwipeItem key={i} onSwipe={onSwipe}></SwipeItem>
                        </>
                      )
                    }
                }
            })}
          </>
          }
        </QuizContainer>
    )
}

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > p > span {
    padding: 8px 16px;
    background-color: #fef5d4;
    // border-bottom: 3px solid #ffd6aa;
    border-radius: 30px;
  }
`;
const Img = styled.img`
  max-height:400px;
  max-width:400px;
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
const ImageAnswerZone = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  min-height: 30vh;
`;
const ImageAnswer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: 600;
  color: #dadafc77;
`;
const ProgressBar = styled.div`
    margin-top: 30px;
    background: #eee;
    width: 300px;
    height: 20px;
    position:relative;
    border-radius: 25px;
`;
const HighLight = styled.div`
    background: orange;
    width: ${props=> props.width === "NaN%" ? "0%" : props.width};
    height: 20px;
    transition: width 1s;
    border-radius: 25px;
`;
const Circle = styled.div`
    background: white;
    border: 3px solid orange;
    position: absolute;
    left:${props=> props.left === "NaN%" ? "-5%" : props.left};
    top:-7px;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    transition: left 1s;
`;
export default withRouter(Quiz)
// TinderCard 공식 문서 : https://www.npmjs.com/package/react-tinder-card