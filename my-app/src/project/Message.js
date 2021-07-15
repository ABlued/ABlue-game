import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import img from './img.jpg'
import { saveUserData, userCommentd } from './redux/quiz';

const Message = (props) => {

    const textArea = useRef('');
    const dispatch = useDispatch();
    const myName = useSelector(state => state.quiz.myName);
    const userName = useSelector(state => state.quiz.userName)
    const userScore = useSelector(state => state.quiz.userScore)
    const userAllData = useSelector(state => state.quiz.userAllData)
    const onSubmitEvent = (e) => {
        e.preventDefault();
        const comment = textArea.current.value;
        dispatch(userCommentd(comment));
        dispatch(saveUserData(userName, userScore, comment));
        console.log(userName);
        console.log(userScore);
        console.log(comment);
        console.log(userAllData);
        props.history.push('/ranking');
    }

    return (
        <Container>
            <img src={img}></img>
            <form>
                <Text><MyName>{myName}</MyName>에게 남기는 한 마디</Text>
                <Textarea ref={textArea} rows="10" cols="40" placeholder="재완이에게 하고 싶은 말을 남겨주세요."></Textarea>
                <Button onClick={onSubmitEvent}>랭킹보기</Button>
            </form>

        </Container>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    text-align: center;
    `
const MyName = styled.span`
    background-color: #FBD786;
    padding: 5px;
    border-radius: 20px;
    
`;
const Text = styled.h1`
    font-size: 1.5em;
    margin: 20px;
    line-height: 1.4;
    & span {
        background-color: #fef5d4;
        padding: 5px 10px;
        border-radius: 30px;
}`;
const Button = styled.button`
    border: none;
    background: #009FFF;
    color: white;
    padding: 5px 87px 5px 87px;
    border-radius: 30px;
    margin: 30px 0px 5px 0px;
    cursor: pointer;
`;
const Textarea = styled.textarea`
    border: 1px solid rgba(195, 195, 195, 1);
    
`;
export default withRouter(Message)
