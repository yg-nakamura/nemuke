import * as THREE from 'three';
import BlockId from "./BlockId";
import { BlockModel } from "./BlockModel";
import { BlockAir } from "./blocks/BlockAir";
import { BlockGrass } from './blocks/BlockGrass';
import { BlockStone } from "./blocks/BlockStone";
import { BlockTest } from "./blocks/BlockTest";
import { MTextureLoader } from "./MTextureLoader";


class BlockClass {

    blocks: { [key: number]: BlockModel } = {};
    texture:THREE.Texture = new THREE.Texture();
    mtexture? : MTextureLoader;

    constructor() {

    }

    public getBlockByID(id?: BlockId) {
        if(id){
            return this.blocks[id];
        }
        return this.blocks[BlockId.air];
    }

    public setMTexture(mtexture : MTextureLoader){
        this.mtexture = mtexture;
        this.blocks[BlockId.test] = new BlockTest();
        this.blocks[BlockId.air] = new BlockAir();
        this.blocks[BlockId.stone] = new BlockStone();
        this.blocks[BlockId.grass] = new BlockGrass();

        //Create Texture 
        this.texture = new THREE.CanvasTexture(mtexture.getCanvas());
        this.texture.magFilter = THREE.NearestFilter;
    }

    public getUVMap(name : string) : number[]{
        if(this.mtexture){
            return this.mtexture.getUVMap(name);
        }
        return [0,0,0,0,0,0,0,0];
    }

    public getTexture(){
        return this.texture;
    }
}

const Block = new BlockClass();

export default Block;