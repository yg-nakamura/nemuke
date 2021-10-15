import generate from "@babel/generator";
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
        let chunkZ = x / 16;
        return this.chunkMap[chunkX][chunkZ].getBlock(chunkX, y, chunkZ);
    }

    public setBlock(x: number, y: number, z: number, id: BlockId) {
        let chunkX = x / 16;
        let chunkZ = x / 16;
        this.chunkMap[chunkX][chunkZ].setBlock(chunkX, y, chunkZ, id);
    }

    public getChunk(x: number, z: number): Chunk {
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
        this.getChunk(chunkX, chunkZ).render(scene);
    }

    public generateWorld() {
        for (let x = 0; x < 2; x++) {
            for (let z = 0; z < 2; z++) {
                this.getChunk(x, z).generateChunk();
            }
        }
    }
}