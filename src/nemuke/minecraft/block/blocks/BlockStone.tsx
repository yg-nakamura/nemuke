import Block from "../Block";
import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class BlockStone extends BlockModel{
    constructor(){
        super();
        
        const uv = Block.getUVMap("blocks/stone");

        const element = this.createElement({x:0,y:0,z:0},{x:16,y:16,z:16});
        element.createFace(FaceType.down, {uv:uv});
        element.createFace(FaceType.up, {uv:uv});
        element.createFace(FaceType.east, {uv:uv});
        element.createFace(FaceType.north, {uv:uv});
        element.createFace(FaceType.south, {uv:uv});
        element.createFace(FaceType.west, {uv:uv});
        this.pushElement(element);  
    }
}