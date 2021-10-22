import BlockId from "../block/BlockId";
import { World } from "./World";


const testMap = (world : World) => {
    let blocks:BlockId[] = [];
    
    const concretes:BlockId[] = [
        BlockId.white_concrete, BlockId.orange_concrete, BlockId.magenta_concrete,
        BlockId.light_blue_concrete, BlockId.yellow_concrete, BlockId.lime_concrete,
        BlockId.pink_concrete, BlockId.gray_concrete, BlockId.light_gray_concrete,
        BlockId.cyan_concrete, BlockId.purple_concrete, BlockId.blue_concrete,
        BlockId.blue_concrete, BlockId.brown_concrete, BlockId.green_concrete,
        BlockId.red_concrete, BlockId.black_concrete
    ]

    blocks = blocks.concat(concretes);
    
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