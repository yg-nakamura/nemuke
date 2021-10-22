import Block from "../Block";
import BlockId from "../BlockId";
import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class DoorBottom extends BlockModel{

    constructor(bottom : string){
        super();
        
        const element = this.createElement({x:0,y:0,z:0},{x:3,y:16,z:16});
        element.createFace(FaceType.down, {uv:Block.getUVMap(bottom,[13,0,16,16])});
        element.createFace(FaceType.east, {uv:Block.getUVMap(bottom,[3,0,0,16])});
        element.createFace(FaceType.north, {uv:Block.getUVMap(bottom,[0,0,3,16])});
        element.createFace(FaceType.south, {uv:Block.getUVMap(bottom,[0,0,16,16])});
        element.createFace(FaceType.west, {uv:Block.getUVMap(bottom,[16,0,0,16])});

        this.pushElement(element);
    }

}