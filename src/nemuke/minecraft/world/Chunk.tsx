import * as THREE from 'three';
import Block from "../block/Block";
import BlockId from "../block/BlockId";
import * as  BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils"
import { World } from './World';

export class Chunk {

    blockIdMap: BlockId[] = [];
    blockDataMap: number[] = [];
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

    public getBlockData(x: number, y: number, z: number): number {
        let px = x & 15;
        let pz = z & 15;
        let py = y;

        let sp = (py << 8) + (px << 4) + pz

        if (this.blockDataMap[sp]) {
            return this.blockDataMap[sp]
        } else {
            return 0
        }

    }

    public setBlock(x: number, y: number, z: number, id: BlockId, data: number) {
        let px = x & 15;
        let pz = z & 15;
        let py = y;

        let sp = (py << 8) + (px << 4) + pz

        if(id !== BlockId.air){
            this.blockIdMap[sp] = id;
            this.blockDataMap[sp] = data;
        }
    }

    public render(scene: THREE.Scene, world : World) {

        let geometries : THREE.BufferGeometry[] = [];

        for (let y = 0; y < 256; y++) {
            for (let x = 0; x < 16; x++) {
                for (let z = 0; z < 16; z++) {
                    if (this.getBlock(x, y, z)) {
                        const px = this.chunkX * 16 + x;
                        const pz =  this.chunkZ * 16 + z;
                        Block.getBlockGeometriesByID(this.getBlock(x, y, z), geometries,{ x: px, y: y, z: pz}, this.getBlockData(x,y,z),
                        {
                            east : {id : this.getBlock(px+1,y,pz),damage : this.getBlockData(px+1,y,pz)},
                            west : {id : this.getBlock(px-1,y,pz),damage : this.getBlockData(px-1,y,pz)},
                            up   : {id : this.getBlock(px,y+1,pz),damage : this.getBlockData(px,y+1,pz)},
                            down : {id : this.getBlock(px,y-1,pz),damage : this.getBlockData(px,y-1,pz)},
                            south: {id : this.getBlock(px,y,pz+1),damage : this.getBlockData(px,y,pz+1)},
                            north: {id : this.getBlock(px,y,pz-1),damage : this.getBlockData(px,y,pz-1)},
                        }
                        );
                    }
                }
            }
        }

        if(geometries.length == 0) return;
        
        for(let g of geometries){
            g.computeVertexNormals();
        }

        const geometry = BufferGeometryUtils.mergeBufferGeometries( geometries );
        // geometry.computeBoundingSphere();

        const mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( 
            { 
                map: Block.getTexture(),
                side: THREE.DoubleSide,
                alphaTest: 0.5,
                depthTest : true,                
            }));

        // mesh.castShadow = true;
        // mesh.receiveShadow = true;
        const box = new THREE.BoxHelper( mesh, 0xffff00 );
        scene.add( box );
        scene.add( mesh );

    }

    public generateChunk() {
        for (let y = 0; y < 256; y++) {
            for (let x = 0; x < 16; x++) {
                for (let z = 0; z < 16; z++) {
                    if (y === 3) {
                        this.setBlock(x, y, z, BlockId.stone, 0);
                    }else {
                        this.setBlock(x, y, z, BlockId.air, 0);
                    }
                }
            }
        }
    }
}