import Block from "../block/Block";
import BlockId, { getBlockIdByName } from "../block/BlockId";
import { World } from "./World";



const testMap = (world : World) => {
    let blocks:{id : BlockId, data : number}[] = [];
    
    const map = Block.getVariantsMap();
    for(let t in map){
        for(let j = 0; j < Block.getBlockModelNum(map[t].getId()); j++){
            blocks.push({id : map[t].getId(), data: j});
        }
        
    }

    const s = Math.ceil(Math.sqrt(blocks.length) * 2);

    let i = 0;
    for(let x = 0; x < s; x++){
        for(let z = 0; z < s; z++){
            if(x % 2 == 0 && z % 2 == 0 && i < blocks.length){
                const iddata = blocks[i++];
                world.setBlock(x, 5, z,iddata.id , iddata.data);
                
            }
        }
    }
   

}

export default testMap;