import React, { useState, useRef } from 'react'
import img from './img.jpg'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { userNamed } from './redux/quiz';

const Start = () => {
    const inputRef = useRef('');
    const [haveName, setHaveName] = useState(false);
    const myName = useSelector(state => state.quiz.myName);
    const userName = useSelector(state => state.quiz.userName)
    const dispatch = useDispatch();
    const span__style = {background:'#FBD786', padding:'10px' ,borderRadius:'25px'}
    const input__style = {background:'rgba(180, 179, 181, 0.169)',
                border:'none', borderRadius:'25px', padding:'20px', width:'350px',
                marginTop:'50px', outline:'none', fontSize:'20px'};
    const button__style = {padding:'10px 30px 10px 30px', border:'none',
                    borderRadius:'30px', marginTop:'50px', background:'#009FFF',
                    color:'white', cursor:'pointer'};

    const onSubmitEvent = (e) => {
        e.preventDefault();
        dispatch(userNamed(inputRef.current.value));
        setHaveName(true);
    }
    return(
        <Container>
            <img src={img}/>
            <h1>나는 <span style={span__style}>{myName}</span>에 대해 얼마나 알고 있을까?</h1>
            {haveName ? 
            <h1>환영합니다 {userName} 님!</h1>
            :
            <form onSubmit={onSubmitEvent} >
                <input ref={inputRef} style={input__style} placeholder='내 이름'/>
            </form>

            }
            <Link to="/quiz">
                <button style={button__style}>시작하기</button>
            </Link>
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
export default Start