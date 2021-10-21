import React, {  useEffect } from "react";
import { MTextureLoader } from "../nemuke/minecraft/block/MTextureLoader";
import { MScreen } from "../nemuke/MScreen";
import {CanvasElement, Controll, ControllDown, ControllLeft, ControllRight, ControllUp, Debug, Parent, UDRLController} from "./components/Controlles"

export default function App() {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const imgCanvasRef = React.useRef<HTMLCanvasElement>(null);
    const renderInfoRef = React.useRef<HTMLDivElement>(null);



    
    const init = (mtexture : MTextureLoader) => {
        const canvas = canvasRef.current;
        const renderInfo = renderInfoRef.current;
        if (canvas) {
            new MScreen(canvas, renderInfo, mtexture)
        }
    }

    useEffect(() => {
        console.log('use effect');

        if(imgCanvasRef.current){
            const mtexture = new MTextureLoader(imgCanvasRef.current);
            mtexture.loadImageFile(init);
        }

    }, []);

    return (

        <Parent style={{ userSelect: 'none' }}>
            {/* <Debug>
                <div ref={renderInfoRef}
                >
                </div>
            </Debug> */}
            <div >
                <canvas ref={imgCanvasRef} />
                <CanvasElement
                    ref={canvasRef}
                />
            </div>
            {/* {UDRLController(
                ()=>{}, //up
                ()=>{}, //left
                ()=>{}, //down
                ()=>{}  //right
            )} */}
        </Parent>
    );
}

