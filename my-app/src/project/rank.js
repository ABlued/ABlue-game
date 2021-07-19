import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { resetUserData } from './redux/quiz';
import { firestore } from './firebase';
import Spinner from './Spinner';
import { StarBorder } from "@material-ui/icons";

const Ranking = (props) => {
    const userAllDataDB = firestore.collection("userAllData");
    const userName = useSelector(state => state.quiz.userName)
    const dispatch = useDispatch();
    const [sortedArray, setSortedArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let tempArray = [];
    
    const reset = () => {
        dispatch(resetUserData());
        props.history.push('/');
    }
    useEffect(() => {
        let myRanking = 0;
        userAllDataDB.get().then((docs) => {
            docs.forEach((doc) => {
                if(doc.exists){
                    tempArray = [...tempArray, {...doc.data()}];
                }
            })
        }).then(response => {
            tempArray = tempArray.sort((a, b) => b.userScore - a.userScore);
            setSortedArray(tempArray);
            tempArray.map((v,i) => {
                if(v.userName === userName) myRanking = i;
            })
            setIsLoading(true);
            window.scrollTo({top:50+ (121 * myRanking ), behavior:"smooth"});
        })
    }, [])

    return (
        <Container>
            {
                (!isLoading)? 
                <Spinner text={'랭킹 데이터를 불러오는 중입니다.'}/>
                :
                <>
                    <p style={{float:'inline-start'}}>{sortedArray.length}명의 사람들 중 당신은?</p>
                    {sortedArray.map((v,i) => {
                        if(v.userScore === 100){
                            return (
                            <FirstCard>
                                <StarBorder style={{minWidth: '70px', flexGrow:`0.7`, fontSize: '55px', color:"#db36a4"}}/>
                                {/* <Rank>{i + 1}등</Rank> */}
                                <CardInf>
                                    <h4>{v.userName} : {v.userScore}점</h4>
                                    <h4>{v.userComment}</h4>
                                </CardInf>
                            </FirstCard>
                            )
                        } else{
                            return(
                                <Card>
                                <Rank>{i + 1}등</Rank>
                                <CardInf>
                                    <h4>{v.userName} : {v.userScore}점</h4>
                                    <h4>{v.userComment}</h4>
                                </CardInf>
                            </Card>
                        )
                    }
                    })}
                    <PointButton onClick={reset}>다시하기</PointButton>
                </>
            }
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
    align-items:center;
    border: 2px solid rgba(195, 195, 195, 1);
    margin-top: 20px; 
`;
const FirstCard = styled.div`
    display: flex;
    width:280px;
    align-items:center;
    border: 4px solid rgba(195, 195, 195, 1);
    background: linear-gradient(to right,#9796f0 ,#fbc7d4);
    margin-top: 20px; 
`;
const CardInf = styled.div`
    text-align:left;
    flex-grow: 1;
`;
const Rank = styled.h1`
    min-width: 70px;
    flex-grow:0.7;
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
