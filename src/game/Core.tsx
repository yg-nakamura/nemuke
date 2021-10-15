import React, { useState, useEffect, MouseEventHandler } from "react";
import { MScreen } from "../nemuke/MScreen";

import sample00 from './sample00'

export default function Core() {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const renderInfoRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('use effect');
        const canvas = canvasRef.current;
        const renderInfo = renderInfoRef.current;
        if (!canvas) return;
        if (!renderInfo) return;
        // sample00(canvas)
        new MScreen(canvas,renderInfo);
    }, []);

    return (
        <div style={{ userSelect: 'none' }}>
            <h1>Nemui</h1>
            <div >
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                    }}
                />
            </div>
            <div ref={renderInfoRef}
                style={{
                    position: "fixed",
                    top: 600,
                    left: 0,
                }}
            >

            </div>
        </div>

    );

}