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


    const wools:BlockId[] = [
        BlockId.white_wool, BlockId.orange_wool, BlockId.magenta_wool,
        BlockId.light_blue_wool, BlockId.yellow_wool, BlockId.lime_wool,
        BlockId.pink_wool, BlockId.gray_wool, BlockId.light_gray_wool,
        BlockId.cyan_wool, BlockId.purple_wool, BlockId.blue_wool,
        BlockId.blue_wool, BlockId.brown_wool, BlockId.green_wool,
        BlockId.red_wool, BlockId.black_wool
    ]

    blocks = blocks.concat(concretes,wools);
    
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