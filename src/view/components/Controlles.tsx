
import styled from 'styled-components';

const Parent = styled.div`
width: 100vw;
height: 100%;
position: fixed;
overflow: hidden;
background-color: black;
`;
const Debug = styled.div`
position: absolute;
top: 16px;
left: 16px;
width: 50%;
height: 60px;
padding: 10px;
border-radius: 10px;
background-color: #ffffff;
opacity: 0.75;
`;
const CanvasElement = styled.canvas`
position: absolute;
top: 50%;
left: 50%;
z-index: -1;
width:  90% !important;
height: 95% !important;
transform: translate(-50%,-50%);
`;
const Controll = styled.div`
position: absolute;
width: 280px;
height: 180px;
bottom: 24px;
right: 24px;
padding: 16px;
background-color: #fff;
`;
const ControllUp = styled.button`
position: absolute;
top: 16px;
left: 50%;
transform: translateX(-50%);
width: 80px;
height: 80px;
border: 2px solid black;
`;
const ControllRight = styled.button`
position: absolute;
top: 106px;
right: 16px;
width: 80px;
height: 80px;
box-sizing:border-box;
border: 2px solid black;
`;
const ControllDown = styled.button`
position: absolute;
top: 106px;
left: 50%;
transform: translateX(-50%);
width: 80px;
height: 80px;
box-sizing:border-box;
border: 2px solid black;
`;
const ControllLeft = styled.button`
position: absolute;
top: 106px;
left: 16px;
width: 80px;
height: 80px;
box-sizing:border-box;
border: 2px solid black;
`;

const UDRLController = (up : any, left : any, down : any, right : any) =>{
    return (
    <Controll>
        <ControllUp onClick={up}>
            👆
        </ControllUp >
        <ControllLeft onClick={left}>
            👈
        </ControllLeft>
        <ControllDown onClick={down}>
            👇
        </ControllDown>
        <ControllRight onClick={right}>
            👉
        </ControllRight>
    </Controll>
    )
}


export  {ControllDown,ControllLeft,ControllRight,ControllUp,Controll,Debug,Parent,CanvasElement,UDRLController}