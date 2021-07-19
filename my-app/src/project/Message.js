import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import { saveUserData, userCommentd, loadImage } from './redux/quiz';
import { firestore } from './firebase';

const Message = (props) => {
    const imageDB = firestore.collection("image");

    const textArea = useRef('');
    const dispatch = useDispatch();
    const myName = useSelector(state => state.quiz.myName);
    const userName = useSelector(state => state.quiz.userName)
    const userScore = useSelector(state => state.quiz.userScore)
    const userAllData = useSelector(state => state.quiz.userAllData)
    const [imgSrc, setImgSrc] = useState('');            

    const onSubmitEvent = (e) => {
        e.preventDefault();
        const comment = textArea.current.value;
        dispatch(userCommentd(comment));
        dispatch(saveUserData(userName, userScore, comment));
        
        props.history.push('/ranking');
    }
    useEffect(() => {
        imageDB.doc("imagevalue").get().then((doc) => {
            setImgSrc(doc.data().imagesrc);
            dispatch(loadImage(imgSrc));
        });        
    }, [userAllData])
    return (
        <Container>
            <img src={imgSrc}></img>
            <form>
                <Text><MyName>{myName}</MyName>에게 남기는 한 마디</Text>
                <Textarea ref={textArea} rows="5" cols="30" placeholder="ABlue에게 하고 싶은 말을 남겨주세요."></Textarea>
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
