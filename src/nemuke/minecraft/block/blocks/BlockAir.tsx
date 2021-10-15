import { BlockModel } from "../BlockModel";

export class BlockAir extends BlockModel{
    constructor(){
        super();
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