import * as THREE from 'three';

export const enum Block {
    Air,
    Stone
}

const enum Side {
    PX,
    NX,
    PY,
    NY,
    PZ,
    NZ
}


const DEFAULT_PATH = "texture/"
const Blocks: { [key: number]: MeshBlock } = {};
const Sides: { [key: number]: { [key: number]: BlockSide } } = {};
const SIMPLE_BOX_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.BoxGeometry(1, 1, 1);

class MeshBlock {

    sides: { [key: number]: BlockSide };

    constructor(sides: { [key: number]: BlockSide }) {
        this.sides = sides;
    }

    public getMesh(x: number, y: number, z: number): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]> {
        console.log(this.sides)
        const box = new THREE.Mesh(geometry, [
            this.sides[Side.PX].getSide(),
            this.sides[Side.NX].getSide(),
            this.sides[Side.PY].getSide(),
            this.sides[Side.NY].getSide(),
            this.sides[Side.PZ].getSide(),
            this.sides[Side.NZ].getSide()
        ]);
        return box;

    }
}

class BlockSide {

    path: string = "";
    texture: THREE.Texture;

    constructor(path: string) {

        this.path = path;
        const loader = new THREE.TextureLoader()
        this.texture = loader.load(DEFAULT_PATH + path);
        this.texture.magFilter = THREE.NearestFilter;

    }

    public getSide(): THREE.MeshBasicMaterial {
        return new THREE.MeshBasicMaterial({
            map: this.texture
        });
    }
}



function registerSide(id: Block, texture: BlockSide, side?: Side) {
    if (side !== undefined) {
        if (Sides[id]) {
            Sides[id][side] = texture;
        } else {
            Sides[id] = {};
            Sides[id][side] = texture;
        }
    } else {
        registerSide(id, texture, Side.PX);
        registerSide(id, texture, Side.NX);
        registerSide(id, texture, Side.PY);
        registerSide(id, texture, Side.NY);
        registerSide(id, texture, Side.PZ);
        registerSide(id, texture, Side.NZ);
    }

}

function registerBlock(id: Block) {
    console.log(Sides)
    Blocks[id] = new MeshBlock(Sides[id]);
}

export function getBlock(block: Block): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]> {
    return Blocks[block].getMesh(0, 0, 0);
}

export function registerBlocks() {

    const stone_texture = new BlockSide("stone.png");
    const grass_texture = new BlockSide("grass_carried.png");
    registerSide(Block.Stone, stone_texture, Side.PX);
    registerSide(Block.Stone, stone_texture, Side.NX);
    registerSide(Block.Stone, stone_texture, Side.PY);
    registerSide(Block.Stone, stone_texture, Side.NY);
    registerSide(Block.Stone, grass_texture, Side.PZ);
    registerSide(Block.Stone, grass_texture, Side.NZ);


    registerBlock(Block.Stone);

}




