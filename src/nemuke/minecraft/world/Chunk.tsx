import { Scene } from "three";
import Block from "../block/Block";
import BlockId from "../block/BlockId";

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

        this.blockIdMap[sp] = id;
    }

    public render(scene: Scene) {
        for (let y = 0; y < 256; y++) {
            for (let x = 0; x < 16; x++) {
                for (let z = 0; z < 16; z++) {
                    if (this.getBlock(x, y, z)) {
                        let block = Block.getBlockByID(this.getBlock(x, y, z));
                        block.renderBlock({ x: this.chunkX * 16 + x, y: y, z: this.chunkZ * 16 + z }, scene);
                    }
                }
            }
        }
    }

    public generateChunk() {
        for (let y = 0; y < 256; y++) {
            for (let x = 0; x < 16; x++) {
                for (let z = 0; z < 16; z++) {
                    if (y === 3) {
                        this.setBlock(x, y, z, BlockId.stone);
                    } else {
                        this.setBlock(x, y, z, BlockId.air);
                    }
                }
            }
        }
    }
}