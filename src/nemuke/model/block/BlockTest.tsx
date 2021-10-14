import { BlockModel, FaceType } from "../BlockModel";

export class BlockTest extends BlockModel {
    constructor() {
        super();
        const element = this.createElement({ x: 7, y: 0, z: 7 }, { x: 9, y: 10, z: 9 });
        element.createFace(FaceType.down, { folder: "texture/", texture: "grass_carried.png" });
        element.createFace(FaceType.up, { folder: "texture/", texture: "grass_carried.png" });
        element.createFace(FaceType.east, { folder: "texture/", texture: "grass_carried.png" });
        element.createFace(FaceType.north, { folder: "texture/", texture: "grass_carried.png" });
        element.createFace(FaceType.south, { folder: "texture/", texture: "stone.png" });
        element.createFace(FaceType.west, { folder: "texture/", texture: "stone.png" });
        this.pushElement(element)
        const element2 = this.createElement({ x: 0, y: 2, z: 2 }, { x: 1, y: 16, z: 16 });
        element2.createFace(FaceType.down, { folder: "texture/", texture: "grass_carried.png" });
        element2.createFace(FaceType.up, { folder: "texture/", texture: "grass_carried.png" });
        element2.createFace(FaceType.east, { folder: "texture/", texture: "grass_carried.png" });
        element2.createFace(FaceType.north, { folder: "texture/", texture: "grass_carried.png" });
        element2.createFace(FaceType.south, { folder: "texture/", texture: "stone.png" });
        element2.createFace(FaceType.west, { folder: "texture/", texture: "stone.png" });
        this.pushElement(element2)
    }
}