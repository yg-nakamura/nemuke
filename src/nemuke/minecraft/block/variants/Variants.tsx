import BlockId, { getBlockNameById } from "../BlockId";
import { BlockModel } from "../block_model/BlockModel";
import { FaceType } from "../block_model/MFace";
import AdjBlocks from "../units/AdjBlocks";
import { Vec3 } from "../units/Vec3";

export type BlockModelProp = {
    model : BlockModel
    y? : number
}

export class Variants{

    private id : BlockId;
    private models  : {[key:string] : BlockModelProp};
    


    constructor(id : BlockId, models : {[key:string] : BlockModelProp} ){
        this.id = id;
        this.models = models;
    }

    public getId() : BlockId{
        return this.id;
    }

    public getFirstModel() : BlockModel{
        return this.models[this.getKeys()[0]].model;
    }


    public getModelByKeys(keys : string[]) : BlockModel{
        let f = false;
        for(let k1 in this.models){
            f = true;
            for(let k2 of keys){
                if(k1.search(k2) < 0) {
                    f = false;
                    break
                }
            }
            if(f){
                return this.models[k1].model;
            }
        }
        return this.getFirstModel();
    }

    public pushGeometries(geometries : THREE.BufferGeometry[],pos : Vec3,data : number, adjBlocks : AdjBlocks,keys : string[]){

        this.getModelByKeys(keys).pushGeometries(geometries,pos,adjBlocks);
    }

    public getKeys() : string[]{
        return Object.keys(this.models);
    }

}