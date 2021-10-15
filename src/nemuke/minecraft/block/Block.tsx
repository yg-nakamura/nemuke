import BlockId from "./BlockId";
import { BlockModel } from "./BlockModel";
import { BlockAir } from "./blocks/BlockAir";
import { BlockStone } from "./blocks/BlockStone";
import { BlockTest } from "./blocks/BlockTest";


class BlockClass {

    blocks: { [key: number]: BlockModel } = {};

    constructor() {
        this.blocks[BlockId.test] = new BlockTest();
        this.blocks[BlockId.air] = new BlockAir();
        this.blocks[BlockId.stone] = new BlockStone();
        
    }

    public getBlockByID(id?: BlockId) {
        if(id){
            return this.blocks[id];
        }
        return this.blocks[BlockId.air];
    }
}

const Block = new BlockClass();

export default Block;