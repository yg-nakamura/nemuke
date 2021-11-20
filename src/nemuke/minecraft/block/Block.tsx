import * as THREE from 'three';
import BlockId, { getBlockIdByName } from "./BlockId";
import { BlockModel } from "./block_model/BlockModel";
import { MTextureLoader } from "./trrein_texture/TrreinTextureLoader";
import BlockModelLoader from './assets/loader/ModelLoader';
import {BlockStateLoader , JsonVariant} from './assets/loader/StateLoader';
import {  getVariantsInstance } from './variants/BlockVariants';
import { BlockModelProp, Variants } from './variants/Variants';



class BlockClass {

    models: { [key: string] : BlockModel} = {};
    texture:THREE.Texture = new THREE.Texture();
    mtexture? : MTextureLoader;
    variantsMap : { [key: number] : Variants} = {};

    public getVariantsMap() : { [key: number] : Variants}{
        return this.variantsMap;
    }
    public getBlockModelByID(id?: BlockId, data? : number) : BlockModel{
        if(id && this.variantsMap[id]){
            return this.variantsMap[id].getModel(data ? data : 0);
        }
        return this.models["block/air"];
    }

    public getBlockModelNum(id?: BlockId) : number{
        if(id && this.variantsMap[id]){
            return this.variantsMap[id].getKeys().length;
        }
        return 1;
    }


    private getBlockModel(name : string, rotate : {y : number | undefined, x : number | undefined}) : BlockModel{
        let m = this.models[name];
        if(rotate.y){
            for(let i = 0; i < (rotate.y/90); i++){
                m = m.rotateY();
            }
        }
        if(rotate.x){
            for(let i = 0; i < (rotate.x/90); i++){
                m = m.rotateX();
            }
        }
        return m;
    }

    private registerBlockModel(){

        for(let modelKey in BlockModelLoader.jsonModels){
            this.models[modelKey] = new BlockModel().fromJsonModel(BlockModelLoader.jsonModels[modelKey]);
        }
        
        for(let stateKey in BlockStateLoader.jsonStates){
            const state = BlockStateLoader.jsonStates[stateKey];
            const blockId = getBlockIdByName(stateKey);
            if(state.variants){
                const models : {[key:string] : BlockModelProp} = {};

                for(let variantKey in state.variants){
                        const variant = state.variants[variantKey];
                        if(Array.isArray(variant)){
                            for(let m of variant){
                                models[variantKey] = {
                                        model : this.getBlockModel(m.model.replace('minecraft:','') , {y : m.y , x : m.x})
                                    }
　　                         }                        
                        }else{
                            const model = variant.model;
                            
                            models[variantKey] = {model : this.getBlockModel(model.replace('minecraft:',''), {y : variant.y, x : variant.x})}
                        }
                }
                this.variantsMap[blockId] = getVariantsInstance(blockId, models);
            }
            
        }
        console.log("Block models is loaded");
    }


    public setMTexture(mtexture : MTextureLoader){
        this.mtexture = mtexture;
        this.registerBlockModel();
        this.texture = new THREE.CanvasTexture(mtexture.getCanvas());
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.NearestFilter;

    }
    public getTexture(){
        return this.texture;
    }
    
    public getUVMap(name : string, uv? : number[]) : number[]{
        if(this.mtexture){
            if(uv){
                return this.mtexture.getUVMap(name,uv);
            }else{
                return this.mtexture.getUVMap(name,[
                    0, 0,
                    16, 16
                ]);
            }
        }
        return [0,0,0,0,0,0,0,0];
    }


}

const Block = new BlockClass();

export default Block;


