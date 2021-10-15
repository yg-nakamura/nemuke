import BlockId from "./BlockId";
import { BlockModel } from "./BlockModel";
import { BlockStone } from "./blocks/BlockStone";
import { BlockTest } from "./blocks/BlockTest";


class BlockClass {

    blocks: { [key: number]: BlockModel } = {};

    constructor() {
        this.blocks[BlockId.test] = new BlockTest();
        this.blocks[BlockId.stone] = new BlockStone();
    }

    public getBlockByID(id: BlockId) {
        return this.blocks[id];
    }
}

const Block = new BlockClass();

export default Block;