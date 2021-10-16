import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class BlockStone extends BlockModel{
    constructor(){
        super();
        const element = this.createElement({x:0,y:0,z:0},{x:16,y:16,z:16});
        element.createFace(FaceType.down, {uv:[0,1,1,1,0,0,1,0]});
        element.createFace(FaceType.up, {uv:[0,1,1,1,0,0,1,0]});
        element.createFace(FaceType.east, {uv:[0,1,1,1,0,0,1,0]});
        element.createFace(FaceType.north, {uv:[0,1,1,1,0,0,1,0]});
        element.createFace(FaceType.south, {uv:[0,1,1,1,0,0,1,0]});
        element.createFace(FaceType.west, {uv:[0,1,1,1,0,0,1,0]});
        this.pushElement(element);  
    }
}