import React from 'react'
import styled from 'styled-components';
import { Loop } from "@material-ui/icons";

const Spinner = (props) => {
    return (
        <Outter>
            <Loop style={{fontSize: '150px', color:"#673ab7"}}/> 
            <H3>{props.text}</H3>           
        </Outter>
    )
}

const Outter = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #ede2ff;
`
const H3 = styled.h3`
    color:#673ab7;
`
export default Spinner
