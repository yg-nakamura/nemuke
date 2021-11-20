import BlockId, { getBlockNameById } from "../BlockId";
import { BlockModel } from "../block_model/BlockModel";

export type BlockModelProp = {
    model : BlockModel
    y? : number
}

export class Variants{

    id : BlockId;
    models  : {[key:string] : BlockModelProp};

    constructor(id : BlockId, models : {[key:string] : BlockModelProp} ){
        this.id = id;
        this.models = models;
    }

    public getId() : BlockId{
        return this.id;
    }

    public getModel(data : number) : BlockModel{
        // console.log(this.getKeys());
        // console.log(data);
        // console.log(this.getKeys()[data]);
        return this.models[this.getKeys()[data]].model;
        // if(this.models[""]){
        //     return this.models[""].model;
        // }else{
        //     let k = "";
        //     for(k in this.models){
        //         break;
        //     }
        //     return this.models[k].model
        // }
       
    }



    public getKeys() : string[]{
        return Object.keys(this.models);
    }

}