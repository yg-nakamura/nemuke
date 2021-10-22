import * as THREE from 'three';
import BlockId from "./BlockId";
import { BlockModel } from "./BlockModel";
import blockstate from './BlockState';
import { Air } from './models/Air';
import ModelId from './ModelId';
import Stone from './models/Stone';
import { MTextureLoader } from "./MTextureLoader";
import { registerCubeAllBlocks } from './models/register/Registers';


class BlockClass {

    models: { [key: number] : BlockModel} = {};
    blocks: { [key: number]: BlockModel } = {};
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
        this.models[ModelId.stone] = new Stone();
        registerCubeAllBlocks(this.models);
    }


    public setMTexture(mtexture : MTextureLoader){
        this.mtexture = mtexture;
        this.registerBlockModel();
        //Create Texture 
        this.texture = new THREE.CanvasTexture(mtexture.getCanvas());
        this.texture.magFilter = THREE.NearestFilter;
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


