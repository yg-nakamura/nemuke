import React, { useState, useEffect, MouseEventHandler } from "react";

import sample00 from './codes/sample/sample00'

export default function Core() {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log('use effect');
        const canvas = canvasRef.current;
        if (!canvas) return;
        sample00(canvas)
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
        </div>

    );

}