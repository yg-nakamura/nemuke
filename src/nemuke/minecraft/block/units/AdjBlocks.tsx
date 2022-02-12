import BlockId from "../BlockId";

type AdjBlocks = {
    east : {id : BlockId, damage : number},
    west : {id : BlockId, damage : number},
    up : {id : BlockId, damage : number},
    down : {id : BlockId, damage : number},
    south : {id : BlockId, damage : number},
    north : {id : BlockId, damage : number},
}

export default AdjBlocks;