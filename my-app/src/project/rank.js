import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { resetUserData } from './redux/quiz';

const Ranking = (props) => {
    const userAllData = useSelector(state => state.quiz.userAllData);
    const userName = useSelector(state => state.quiz.userName)
    const dispatch = useDispatch();
    const [sortedUserData, setSortedUserData] = useState([]);
    const reset = () => {
        dispatch(resetUserData());
        props.history.push('/');
    }
    useEffect(() => {
        let myRanking = 0;
        const tempArray = userAllData.sort((a, b) => b.userScore - a.userScore)
        setSortedUserData(tempArray);
        tempArray.map((v,i) => {
            if(v.userName === userName) myRanking = i;
        })
        window.scrollTo({top:50+ (121 * myRanking ), behavior:"smooth"});
    }, [sortedUserData])

    return (
        <Container>
            {console.log(sortedUserData)}
            <p style={{float:'inline-start'}}>{userAllData.length}명의 사람들 중 당신은?</p>

            {sortedUserData.map((v,i) => {
                return(
                    <Card>
                        <Rank>{i + 1}등</Rank>
                        <CardInf>
                            <h4>{v.userName} : {v.userScore}점</h4>
                            <h4>{v.userComment}</h4>
                        </CardInf>
                    </Card>
                )
            })}
            <PointButton onClick={reset}>다시하기</PointButton>
        </Container>
    )
}
const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    text-align: center;
`;

const Card = styled.div`
    display: flex;
    width:280px;
    height:100px;
    border: 1px solid rgba(195, 195, 195, 1);
    margin-top: 20px; 
`;
const CardInf = styled.div`
    text-align:left;
    flex-grow: 1;
`;
const Rank = styled.h1`
    flex-grow:0.5;
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
export default withRouter(Ranking)
