import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class BlockTest extends BlockModel {
    constructor() {
        super();
        const element = this.createElement({ x: 2, y: 2, z: 2 }, { x: 14, y: 14, z: 14 });
        element.createFace(FaceType.down, { folder: "texture/", texture: "stone.png" });
        element.createFace(FaceType.up, { folder: "texture/", texture: "stone.png" });
        element.createFace(FaceType.east, { folder: "texture/", texture: "grass_carried.png" });
        element.createFace(FaceType.north, { folder: "texture/", texture: "grass_carried.png" });
        element.createFace(FaceType.south, { folder: "texture/", texture: "grass_carried.png" });
        element.createFace(FaceType.west, { folder: "texture/", texture: "grass_carried.png" });
        this.pushElement(element)
    }
}