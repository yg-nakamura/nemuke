import { Scene } from "three";
import BlockId from "../block/BlockId";

import { Chunk } from "./Chunk";

export class World {

    chunkMap: { [key: number]: { [key: number]: Chunk } } = {};

    constructor() {
        this.generateWorld();
    }

    public getBlock(x: number, y: number, z: number): BlockId {
        let chunkX = x / 16;
        let chunkZ = z / 16;
        return this.getChunk(chunkX, chunkZ).getBlock(x, y, z);
    }

    public getBlockData(x: number, y: number, z: number): number {
        let chunkX = x / 16;
        let chunkZ = z / 16;
        return this.getChunk(chunkX, chunkZ).getBlockData(x, y, z);
    }

    public setBlock(x: number, y: number, z: number, id: BlockId, data : number) {
        let chunkX = x / 16;
        let chunkZ = z / 16;
        this.getChunk(chunkX, chunkZ).setBlock(x, y, z, id , data);
    }

    public getChunk(x: number, z: number): Chunk {
        x = Math.floor(x);
        z = Math.floor(z);

        if (this.chunkMap[x]) {
            if (this.chunkMap[x][z]) {
                return this.chunkMap[x][z];
            } else {
                return this.chunkMap[x][z] = new Chunk(x, z);
            }
        } else {
            this.chunkMap[x] = {};
            return this.chunkMap[x][z] = new Chunk(x, z);
        }
    }

    public renderChunk(scene: Scene, chunkX: number, chunkZ: number) {
        this.getChunk(chunkX, chunkZ).render(scene, this);
    }

    public generateWorld() {
        for (let x = -1; x < 8; x++) {
            for (let z = -1; z < 8; z++) {
                this.getChunk(x, z).generateChunk();
            }
        }
    }
}