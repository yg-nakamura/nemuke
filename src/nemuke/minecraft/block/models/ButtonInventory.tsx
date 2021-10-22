import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class ButtonInventory extends BlockModel{

    constructor(texture : number[]){
        super();
        
        const element = this.createElement({x:5,y:6,z:6},{x:11,y:10,z:10});
        element.createFace(FaceType.down, {uv:texture});
        element.createFace(FaceType.up, {uv:texture});
        element.createFace(FaceType.east, {uv:texture});
        element.createFace(FaceType.north, {uv:texture});
        element.createFace(FaceType.south, {uv:texture});
        element.createFace(FaceType.west, {uv:texture});

        this.pushElement(element);
    }

}