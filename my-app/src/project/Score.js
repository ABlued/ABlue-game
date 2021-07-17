import React, { useState, useEffect } from 'react'
import img from './img.jpg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userScored } from './redux/quiz';

const Score = () =>{
    const list = useSelector(state => state.quiz.list);
    const userAnswer = useSelector(state => state.quiz.userAnswer);
    const myName = useSelector(state => state.quiz.myName);
    const scoreMsg = useSelector(state => state.quiz.scoreMsg);
    const [myScore, setMyScore] = useState(0);
    const [myMsg, setMyMsg] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        let count = 0;
        for(let i = 0; i < list.length; i++){
            if(list[i].answer === userAnswer[i]) count++;
        }
        setMyScore((count / list.length) * 100);
        dispatch(userScored(myScore));
        if(0 <= myScore && myScore < 34 ){
            setMyMsg(scoreMsg[0]);
        } else if(34 <= myScore && myScore < 67){
            setMyMsg(scoreMsg[1]);
        } else {
            setMyMsg(scoreMsg[2]);
        }
    }, [myScore])
    return (
        <ScoreContainer>
            <Text><MyName>{myName}</MyName> 퀴즈에 <br/> 대한 내 점수는?</Text>
            <MyPoint>
                <span>{myScore}</span>점
                <p>{myMsg}</p>
            </MyPoint>
            
            <Link to = "/message" >
                <PointButton>메세지보내고 랭킹보기</PointButton>
            </Link>
            
        </ScoreContainer>
    )
}

const ScoreContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
`;
const Text = styled.h1`
    font-size: 1.5em;
    margin: 0px;
    line-height: 1.4;
    & span {
        background-color: #fef5d4;
        padding: 5px 10px;
        border-radius: 30px;
}`;
const MyName = styled.span`
    background-color: #FBD786;
    padding: 5px;
    border-radius: 20px;
    `;
    
const MyPoint = styled.div`
    text-align: center;
    & span {
        background-color: #FBD786;
        padding: 5px;
        border-radius: 30px;
        font-size: 50px;
        margin-right: 10px;
        font-weight: bold;
    }
    & h1 {
        display: inline;
    }
    & p {
        font-weight: bold;
    }
`;

const PointButton = styled.button`
    border: none;
    background: #009FFF;
    color: white;
    padding: 5px 87px 5px 87px;
    border-radius: 30px;
    margin: 30px 0px 5px 0px;
    cursor: pointer;
`;
export default Score
