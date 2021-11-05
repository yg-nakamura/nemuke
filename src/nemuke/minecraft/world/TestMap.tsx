import BlockId, { getBlockIdByName } from "../block/BlockId";
import blockstate from "../block/BlockState";
import { World } from "./World";


const testMap = (world : World) => {
    let blocks:BlockId[] = [];
    
    for(let t in blockstate){
        blocks.push(blockstate[t].id);
    }

    const s = Math.ceil(Math.sqrt(blocks.length) * 2);

    let i = 0;
    for(let x = 0; x < s; x++){
        for(let z = 0; z < s; z++){
            if(x % 2 == 0 && z % 2 == 0 && i < blocks.length){
                world.setBlock(x, 4, z, blocks[i++]);
            }
        }
    }
   

}

export default testMap;