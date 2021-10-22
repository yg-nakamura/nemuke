import Block from "../Block";
import { BlockModel } from "../BlockModel";
import { FaceType } from "../MFace";

export class BlockTorch extends BlockModel{
    constructor(){
        super();
        
        const uvDown = Block.getUVMap("blocks/torch_on", [7 ,13, 9, 15]);
        const uvTop = Block.getUVMap("blocks/torch_on" , [7, 6, 9, 8]);
        const uvSide = Block.getUVMap("blocks/torch_on", [0,0,16,16]);


        const element0 = this.createElement({x:7,y:0,z:7},{x:9,y:10,z:9});
        element0.createFace(FaceType.down, {uv:uvDown});
        element0.createFace(FaceType.up, {uv:uvTop}); 

        const element1 = this.createElement({x:7,y:0,z:0},{x:9,y:16,z:16});
        element1.createFace(FaceType.west, {uv:uvSide});
        element1.createFace(FaceType.east, {uv:uvSide});

        const element2 = this.createElement({x:0,y:0,z:7},{x:16,y:16,z:9});
        element2.createFace(FaceType.north, {uv:uvSide});
        element2.createFace(FaceType.south, {uv:uvSide});

        this.pushElement(element0);
        this.pushElement(element1); 
        this.pushElement(element2); 

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