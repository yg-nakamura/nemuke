import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class BlockStone extends BlockModel{
    constructor(){
        super();
        const element = this.createElement({x:0,y:0,z:0},{x:16,y:16,z:16});
        element.createFace(FaceType.down, {folder : "texture/" , texture: "stone.png"});
        element.createFace(FaceType.up, {folder : "texture/" , texture: "stone.png"});
        element.createFace(FaceType.east, {folder : "texture/" , texture: "stone.png"});
        element.createFace(FaceType.north, {folder : "texture/" , texture: "stone.png"});
        element.createFace(FaceType.south, {folder : "texture/" , texture: "stone.png"});
        element.createFace(FaceType.west, {folder : "texture/" , texture: "stone.png"});
        this.pushElement(element);  
    }
}