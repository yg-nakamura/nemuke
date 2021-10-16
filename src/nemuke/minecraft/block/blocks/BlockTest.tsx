import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class BlockTest extends BlockModel {
    constructor() {
        super();
        const element = this.createElement({ x: 1, y: 1, z: 1  }, { x: 12, y: 12, z: 12 });
        element.createFace(FaceType.down, {uv:[0,0.5,0.5,0.5,0,0,0.5,0]});
        element.createFace(FaceType.up, {uv:[0,0.5,0.5,0.5,0,0,0.5,0]});
        element.createFace(FaceType.east, {uv:[0,0.5,0.5,0.5,0,0,0.5,0]});
        element.createFace(FaceType.north, {uv:[0,0.5,0.5,0.5,0,0,0.5,0]});
        element.createFace(FaceType.south, {uv:[0,0.5,0.5,0.5,0,0,0.5,0]});
        element.createFace(FaceType.west, {uv:[0,0.5,0.5,0.5,0,0,0.5,0]});
        this.pushElement(element)

        this.isFullFace = {
            down : false,
            up : false,
            north : false,
            south : false,
            west : false,
            east : false
        }
    }
}