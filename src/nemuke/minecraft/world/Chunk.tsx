import * as THREE from 'three';
import Block from "../block/Block";
import BlockId from "../block/BlockId";
import * as  BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils"

export class Chunk {

    blockIdMap: BlockId[] = [];
    chunkX: number;
    chunkZ: number;

    constructor(chunkX: number, chunkZ: number) {
        this.chunkX = chunkX;
        this.chunkZ = chunkZ;
    }

    public getBlock(x: number, y: number, z: number): BlockId {
        let px = x & 15;
        let pz = z & 15;
        let py = y;

        let sp = (py << 8) + (px << 4) + pz

        if (this.blockIdMap[sp]) {
            return this.blockIdMap[sp]
        } else {
            return BlockId.air
        }

    }

    public setBlock(x: number, y: number, z: number, id: BlockId) {
        let px = x & 15;
        let pz = z & 15;
        let py = y;

        let sp = (py << 8) + (px << 4) + pz

        if(id != BlockId.air){
            this.blockIdMap[sp] = id;
        }
    }

    public render(scene: THREE.Scene) {
        // ジオメトリーのリスト
        let geometries : THREE.BufferGeometry[] = [];

        for (let y = 0; y < 256; y++) {
            for (let x = 0; x < 16; x++) {
                for (let z = 0; z < 16; z++) {
                    if (this.getBlock(x, y, z)) {
                        let block = Block.getBlockByID(this.getBlock(x, y, z));
                        
                        block.pushGeometries( geometries,
                            { x: this.chunkX * 16 + x, y: y, z: this.chunkZ * 16 + z },
                            {
                                east : x < 15 ? this.getBlock(x+1,y,z) : 0,
                                west : x > 0 ? this.getBlock(x-1,y,z) : 0,
                                up   : y < 255 ? this.getBlock(x,y+1,z) : 0,
                                down : y > 0 ? this.getBlock(x,y-1,z) : 1,
                                south: z < 15 ? this.getBlock(x,y,z+1) : 0,
                                north: z > 0 ? this.getBlock(x,y,z-1) : 0,
                            });
                    }
                }
            }
        }

        const geometry = BufferGeometryUtils.mergeBufferGeometries( geometries );
        geometry.computeBoundingSphere();
        // const texture = new THREE.TextureLoader().load( 'texture/stone.png' );
        // texture.magFilter = THREE.NearestFilter;
        console.log(Block.getTexture());
        const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( 
            { 
                map: Block.getTexture(),
                side: THREE.FrontSide,
                alphaTest: 0.5,
            }));

        scene.add( mesh );

    }

    public generateChunk() {
        for (let y = 0; y < 256; y++) {
            for (let x = 0; x < 16; x++) {
                for (let z = 0; z < 16; z++) {
                    if (y === 3) {
                        this.setBlock(x, y, z, BlockId.grass);
                    }else {
                        this.setBlock(x, y, z, BlockId.air);
                    }
                }
            }
        }
    }
}