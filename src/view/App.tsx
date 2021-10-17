import React, { useState, useEffect, MouseEventHandler } from "react";
import { MScreen } from "../nemuke/MScreen";

import styled from 'styled-components';

export default function App() {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const renderInfoRef = React.useRef<HTMLDivElement>(null);

    const [mscreen, setMScreen] = useState<MScreen>();

    const Parent = styled.div`
        width: 100vw;
        height: 100%;
        position: fixed;
        overflow: hidden;
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
        top: 0;
        left: 0;
        z-index: -1;
        width: 100% !important;
        height: 100% !important;
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

    useEffect(() => {
        console.log('use effect');
        const canvas = canvasRef.current;
        const renderInfo = renderInfoRef.current;
        if (!canvas) return;
        if (!renderInfo) return;
        // sample00(canvas)
        const m = new MScreen(canvas, renderInfo)
        // setMScreen(mm => m);
    }, []);

    return (
        <Parent style={{ userSelect: 'none' }}>
            <Debug>
                <div ref={renderInfoRef}
                >
                </div>
            </Debug>
            <div >
                <CanvasElement
                    ref={canvasRef}
                />
            </div>
            <Controll>
                <ControllUp>
                    👆
                </ControllUp>
                <ControllLeft>
                    👈
                </ControllLeft>
                <ControllDown>
                    👇
                </ControllDown>
                <ControllRight onClick={() => {
                    if (mscreen) {
                        mscreen.translateCameraXZ(0, 0.1);
                    }
                }}>
                    👉
                </ControllRight>
            </Controll>
        </Parent>
    );
}

