import * as THREE from 'three';
import BlockId, { getBlockIdByName } from "./BlockId";
import { BlockModel } from "./BlockModel";
import blockstate, { BlockState } from './BlockState';
import { Air } from './models/Air';
import ModelId from './ModelId';
import { MTextureLoader } from "./MTextureLoader";
import BlockModelLoader from './ModelLoader';
import {BlockStateLoader , JsonVariant} from './StateLoader';



class BlockClass {

    models: { [key: string] : BlockModel} = {};
    texture:THREE.Texture = new THREE.Texture();
    mtexture? : MTextureLoader;


    public getBlockModelByID(id?: BlockId) {
        if(id && blockstate[id]){
            return this.getBlockModelByIdAndData(id,0);
        }
        return this.models[ModelId.air];
    }

    public getBlockModelByIdAndData(id: BlockId, data: number) {
        return this.models[blockstate[id].models[data].model];
    }

    private registerBlockModel(){
        this.models[ModelId.air] = new Air();
        
        for(let modelKey in BlockModelLoader.jsonModels){
            this.models[modelKey] = new BlockModel().fromJsonModel(BlockModelLoader.jsonModels[modelKey]);
        }

        for(let modelKey in BlockModelLoader.jsonModels){
            this.models[modelKey] = new BlockModel().fromJsonModel(BlockModelLoader.jsonModels[modelKey]);
        }
        
        for(let stateKey in BlockStateLoader.jsonStates){
            const state = BlockStateLoader.jsonStates[stateKey];
            const blockId = getBlockIdByName(stateKey);
            if(state.variants){
                for(let variantKey in state.variants){
                    if(variantKey == ""){
                        const variant = state.variants[variantKey];
                        if(Array.isArray(variant)){
                            const state  : BlockState = {
                                id : blockId,
                                models : []
                            };

                            for(let m of variant){
                                state.models.push(
                                    {
                                        model : m.model.replace('minecraft:','')
                                    }
                                );
                            }
                            blockstate[blockId] = state;
                        }else{
                            const model = variant.model;
                            blockstate[blockId] = {
                                id : blockId,
                                models : [
                                    {model : model.replace('minecraft:','')}
                                ]
                            }
                        }
                    }
                }
            }
            
        }

        // this.models[ModelId.stone] = new BlockModel().fromJsonModel(BlockModelLoader.jsonModels["block/stone"]);
        // blockstate[BlockId.stone] = {
        //     models : [
        //         {model : "block/stone"}
        //     ]
        // }
    }


    public setMTexture(mtexture : MTextureLoader){
        this.mtexture = mtexture;
        this.registerBlockModel();
        //Create Texture 
        this.texture = new THREE.CanvasTexture(mtexture.getCanvas());
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.NearestFilter;

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

    public getTexture(){
        return this.texture;
    }
}

const Block = new BlockClass();

export default Block;


