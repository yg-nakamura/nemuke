import Block from "../Block";
import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";


export class Cube extends BlockModel{

    constructor(down:number[], up:number[], north:number[], south:number[], west:number[], east:number[]){
        super();

        const element = this.createElement({x:0,y:0,z:0},{x:16,y:16,z:16});
        element.createFace(FaceType.down, {uv:down});
        element.createFace(FaceType.up, {uv:up});
        element.createFace(FaceType.east, {uv:north});
        element.createFace(FaceType.north, {uv:south});
        element.createFace(FaceType.south, {uv:west});
        element.createFace(FaceType.west, {uv:east});

        this.pushElement(element);

        this.isFullFace = {
            down : true,
            up : true,
            north : true,
            south : true,
            west : true,
            east : true
        }
    }
}