import * as THREE from 'three';

export const enum Block { 
    Air,
    Stone
}

const enum Side{
    PX ,
    NX ,
    PY ,
    NY ,
    PZ ,
    NZ
}


const DEFAULT_PATH = "sides/" 
const Blocks : { [key : number] : MeshBlock } = {};
const Sides : { [key: number] : BlockSide[] }  = {};
const SIMPLE_BOX_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.BoxGeometry(1, 1, 1);

class MeshBlock{
    
    sides : BlockSide[];

    constructor(sides : BlockSide[]){
        this.sides = sides;
    }

    public getMesh(x : number, y :number, z :number) : THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>{

        const box = new THREE.Mesh(geometry, [
            this.sides[Side.PX].getSide(),
            this.sides[Side.PX].getSide(),
            this.sides[Side.PX].getSide(),
            this.sides[Side.PX].getSide(),
            this.sides[Side.PX].getSide(),
            this.sides[Side.PX].getSide()
        ]);
        return box;

    }
}

class BlockSide{

    path :string = "";
    texture : THREE.Texture;
    
    constructor(path : string){

        this.path = path;
        const loader = new THREE.TextureLoader()
        this.texture = loader.load(DEFAULT_PATH + path);

    }

    public getSide() : THREE.MeshBasicMaterial{
        return new THREE.MeshBasicMaterial({
            map: this.texture
        });
    }
}



function registersides(id : Block, texture : BlockSide) {
    if(Sides[id]){
        Sides[id].push(texture);
    }else{
        Sides[id] = [];
        registersides(id, texture);
    }
}

function registerBlock(id : Block) {
    Blocks[id] = new MeshBlock(Sides[id]);
}

export function getBlock(block : Block) : THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>{
    return Blocks[block].getMesh(0,0,0);
}

export function registerBlocks() {

    const stone_texture = new BlockSide("stone.png");
    registersides(Block.Stone, stone_texture);
    registersides(Block.Stone, stone_texture);
    registersides(Block.Stone, stone_texture);
    registersides(Block.Stone, stone_texture);
    registersides(Block.Stone, stone_texture);
    registersides(Block.Stone, stone_texture);
    registerBlock(Block.Stone);

}




