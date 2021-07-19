import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { userNamed, loadImage } from './redux/quiz';
import { firestore } from './firebase';

const Start = (props) => {
    const imageDB = firestore.collection("image");
    const inputRef = useRef('');
    const myName = useSelector(state => state.quiz.myName);
    const dispatch = useDispatch();
    const span__style = {background:'#FBD786', padding:'10px' ,borderRadius:'25px'}
    const input__style = {background:'rgba(180, 179, 181, 0.169)',
                border:'none', borderRadius:'25px', padding:'20px', width:'300px',
                marginTop:'50px', outline:'none', fontSize:'20px'};
    const button__style = {padding:'10px 30px 10px 30px', border:'none',
                    borderRadius:'30px', marginTop:'50px', background:'#009FFF',
                    color:'white', cursor:'pointer'};
    const [imgSrc, setImgSrc] = useState('');            
    useEffect(() => {
        imageDB.doc("imagevalue").get().then((doc) => {
            setImgSrc(doc.data().imagesrc);
            dispatch(loadImage(imgSrc));
        });
    }, [imgSrc])

    const onSubmitEvent = () => {
        dispatch(userNamed(inputRef.current.value));
        props.history.push('/quiz');
    }
    return(
        <Container>
            <img src={imgSrc}/>
            <h1>나는 <span style={span__style}>{myName}</span>에 대해 얼마나 알고 있을까?</h1>
            <input ref={inputRef} style={input__style} placeholder='내 이름'/>
            <button onClick={onSubmitEvent} style={button__style}>시작하기</button>
            <H5>모바일 환경에서만 작동됩니다!</H5>
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
const H5 = styled.h5`
    color:red;
`;
export default Start