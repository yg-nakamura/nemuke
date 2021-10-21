import Block from "../Block";
import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class BlockGrass extends BlockModel{
    constructor(){
        super();
        
        const uvtop = Block.getUVMap("grass_carried");
        const uvside = Block.getUVMap("grass_side_carried");
        const uvdown = Block.getUVMap("dirt");

        const element = this.createElement({x:0,y:0,z:0},{x:16,y:16,z:16});
        element.createFace(FaceType.down, {uv:uvdown});
        element.createFace(FaceType.up, {uv:uvtop});
        element.createFace(FaceType.east, {uv:uvside});
        element.createFace(FaceType.north, {uv:uvside});
        element.createFace(FaceType.south, {uv:uvside});
        element.createFace(FaceType.west, {uv:uvside});
        this.pushElement(element);  
    }
}