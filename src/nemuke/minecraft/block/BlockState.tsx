import BlockId from "./BlockId";
import ModelId from "./ModelId";

type BlockModelProp = {
    model : string
    y? : number
}

export type BlockState = {
    id : BlockId
    models : BlockModelProp[]
}
const blockstate : {[key:number]: BlockState} = {};





// blockstate[BlockId.stone] = {
//     models : [
//         {model : ModelId.stone}
//     ]
// }

export default blockstate;