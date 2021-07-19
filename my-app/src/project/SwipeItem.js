import React, { memo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TinderCard from 'react-tinder-card'

const SwipeItem = memo(({ top, onSwipe }) => { 

    const imgSrc = useSelector(state => state.quiz.imgsrc);
    
    const swipe_div = useRef(null);
    let swipe_status = "ready";
    let target_classname = "";  // 애니메이팅 효과를 주기위한 클래스네임
    let coordinate = {
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0,
    }
    useEffect(() => {

        const reset = () => {
            swipe_status = "ready";
            coordinate = {
                start_x: 0,
                start_y: 0,
                end_x: 0,
                end_y: 0,
            }

            swipe_div.current.className = target_classname;
            swipe_div.current.style.left = 0 + "px";
            swipe_div.current.style.top = 0 + "px";
        }

        const touchStart = (e) => {
            swipe_status = "touchstart";
            target_classname = swipe_div.current.className;     // 이미 갖고있는 스타일컴포넌트 클래스
            coordinate = {
                ...coordinate,
                start_x: e.touches[0].clientX,
                start_y: e.touches[0].clientY,
            };
        };

        const touchEnd = (e) => {
            swipe_status = "touchend";
            coordinate = {
                ...coordinate,
                end_x: e.changedTouches[0].clientX,
                end_y: e.changedTouches[0].clientY,
            };
            let diff_x = coordinate.end_x - coordinate.start_x;
            let direct = "left";

            if(Math.abs(diff_x) > 50){      // 벌어난 거리가 50을 넘을 경우
                swipe_div.current.className = target_classname + "swipe";
            
                if(diff_x > 0){
                    direct="right";
                    swipe_div.current.style.left = diff_x + 150 + "px";     // 4주차 수업 때 다시 봐야하는 부분
                    swipe_div.current.style.opacity = 0;
                } else {
                    direct="left";
                    swipe_div.current.style.left = diff_x - 150 + "px";
                    swipe_div.current.style.opacity = 0;
                }
            
            window.setTimeout(() => {
                reset();
                onSwipe(direct);
            }, 300);
            return;
        }
        reset();
    };

        const touchMove = (e) => {
            e.preventDefault();

            let current_coordinate = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
            swipe_div.current.style.left = current_coordinate.x - coordinate.start_x + "px";
            swipe_div.current.style.top = current_coordinate.y - coordinate.start_y + "px";
        };
        
        const touchCancel = (e) => {     // 중간에 터치를 그만두었을 때
            swipe_status = "cancel";
            reset();
        }

        swipe_div.current.addEventListener("touchstart", touchStart);
        swipe_div.current.addEventListener("touchmove", touchMove);
        swipe_div.current.addEventListener("touchend", touchEnd);
        swipe_div.current.addEventListener("touchcancel", touchCancel);

        return () => {
            if(!swipe_div.current){     // 스와이프 영역이 존재하지 않을 때는 무시한다.
                return;
            }
            swipe_div.current.removeEventListener("touchstart", touchStart);
            swipe_div.current.removeEventListener("touchmove", touchMove);
            swipe_div.current.removeEventListener("touchend", touchEnd);
            swipe_div.current.removeEventListener("touchcancel", touchCancel);

        }
    }, []);
    return (
        <DragItem top={top} ref={swipe_div}>
            <div>
                <img src={imgSrc}/>
            </div>
        </DragItem>
    );
});

SwipeItem.defaultProps = {  // props가 없을 때를 방지하기 위해서 기본적으로 props가 갖는 값을 정할 때 쓰인다.
    onSwipe: () => {},
}
const DragItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: ${props => props.top};
    left: 0;
    width: 100vw;
    height: 100vh;
    &.swipe {
    transition: 300ms;
    }

    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height:150px;
        width:150px;
        border-radius: 500px;
        background-color: #ffd6aa;
    }
    & img {
    max-width: 100px;
}
`;
export default SwipeItem;
