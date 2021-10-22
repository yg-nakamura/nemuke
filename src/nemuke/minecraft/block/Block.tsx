import * as THREE from 'three';
import BlockId from "./BlockId";
import { BlockModel } from "./BlockModel";
import { BlockAir } from "./blocks/BlockAir";
import { BlockGrass } from './blocks/BlockGrass';
import { BlockStone } from "./blocks/BlockStone";
import { BlockTorch } from './blocks/BlockTorch';
import { MTextureLoader } from "./MTextureLoader";


class BlockClass {

    blocks: { [key: number]: BlockModel } = {};
    texture:THREE.Texture = new THREE.Texture();
    mtexture? : MTextureLoader;


    public getBlockByID(id?: BlockId) {
        if(id){
            return this.blocks[id];
        }
        return this.blocks[BlockId.air];
    }

    private registerBlocks(){
        this.blocks[BlockId.air] = new BlockAir();
        this.blocks[BlockId.stone] = new BlockStone();
        this.blocks[BlockId.grass] = new BlockGrass();
        this.blocks[BlockId.torch] = new BlockTorch();
    }

    public setMTexture(mtexture : MTextureLoader){
        this.mtexture = mtexture;
        this.registerBlocks();
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