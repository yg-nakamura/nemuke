
import * as THREE from 'three';
import Block from './Block';
import BlockId from './BlockId';
import { MElement } from './MElement';
import { Vec3 } from './Vec3';

type faceFlag = {
    down : boolean,
    up  : boolean,
    north  : boolean,
    south  : boolean,
    west  : boolean,
    east  : boolean
}


export class BlockModel {

    
    elements: MElement[];
    public isFullFace : faceFlag;

    constructor() {
        this.elements = [];
        this.isFullFace = {
            down : true,
            up : true,
            north : true,
            south : true,
            west : true,
            east : true
        }
    }

    protected createElement(from: Vec3, to: Vec3): MElement {
        return new MElement(from, to);
    }

    protected pushElement(element: MElement) {
        this.elements.push(element);
    }

    // public getMeshes(pos: Vec3, flag : faceFlag): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>[] {
    //     const meshes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>[] = [];
    //     for (let element of this.elements) {
    //         const mesh = element.getMesh(flag);
    //         mesh.position.set(
    //             pos.x + 0.5 + (element.from.x / 16) - (16 - element.to.x + element.from.x) / 32,
    //             pos.y + 0.5 + (element.from.y / 16) - (16 - element.to.y + element.from.y) / 32,
    //             pos.z + 0.5 + (element.from.z / 16) - (16 - element.to.z + element.from.z) / 32
    //         );
    //         meshes.push(mesh);
    //     }
    //     return meshes;
    // }

    // public renderBlock(pos: Vec3, scene: THREE.Scene , adjBlocks : {east? : BlockId, west? : BlockId, up? : BlockId, down? : BlockId, south? : BlockId, north? : BlockId}) {
    //     let flag : faceFlag = {
    //         down : false,
    //         up : false,
    //         north : false,
    //         south : false,
    //         west : false,
    //         east : false
    //     };

    //     if(Block.getBlockByID(adjBlocks.east).isFullFace.west){
    //         // eastは描写しない
    //         flag.east = true;
    //     }
    //     if(Block.getBlockByID(adjBlocks.west).isFullFace.east){
    //         // westは描写しない
    //         flag.west = true;
    //     }
    //     if(Block.getBlockByID(adjBlocks.up).isFullFace.down){
    //         // upは描写しない
    //         flag.up = true;
    //     }
    //     if(Block.getBlockByID(adjBlocks.down).isFullFace.up){
    //         // downは描写しない
    //         flag.down = true;
    //     }
    //     if(Block.getBlockByID(adjBlocks.south).isFullFace.north){
    //         // southは描写しない
    //         flag.south = true;
    //     }
    //     if(Block.getBlockByID(adjBlocks.north).isFullFace.south){
    //         // northは描写しない
    //         flag.north = true;
    //     }

    //     for (let m of this.getMeshes(pos, flag)) {
    //         scene.add(m)
    //     }
    // }

    public pushGeometries(geometries : THREE.BufferGeometry[],pos: Vec3,adjBlocks : {east? : BlockId, west? : BlockId, up? : BlockId, down? : BlockId, south? : BlockId, north? : BlockId}){
        let flag : faceFlag = {
            down : false,
            up : false,
            north : false,
            south : false,
            west : false,
            east : false
        };

        if(
            (this.isFullFace.down && this.isFullFace.up && this.isFullFace.north && 
             this.isFullFace.south && this.isFullFace.west && this.isFullFace.east)
            ){
                if(Block.getBlockByID(adjBlocks.east).isFullFace.west){
                    // eastは描写しない
                    flag.east = true;
                }
                if(Block.getBlockByID(adjBlocks.west).isFullFace.east){
                    // westは描写しない
                    flag.west = true;
                }
                if(Block.getBlockByID(adjBlocks.up).isFullFace.down){
                    // upは描写しない
                    flag.up = true;
                }
                if(Block.getBlockByID(adjBlocks.down).isFullFace.up){
                    // downは描写しない
                    flag.down = true;
                }
                if(Block.getBlockByID(adjBlocks.south).isFullFace.north){
                    // southは描写しない
                    flag.south = true;
                }
                if(Block.getBlockByID(adjBlocks.north).isFullFace.south){
                    // northは描写しない
                    flag.north = true;
                }
        }
        


        // const matrix = new THREE.Matrix4();
     
        for (let element of this.elements) {
            const elementGeometries = element.getGeometries(flag);
            const offsetPos : number[]= [
                pos.x + 0.5 + (element.from.x / 16) - (16 - element.to.x + element.from.x) / 32,
                pos.y + 0.5 + (element.from.y / 16) - (16 - element.to.y + element.from.y) / 32,
                pos.z + 0.5 + (element.from.z / 16) - (16 - element.to.z + element.from.z) / 32
            ];
            for(let g of elementGeometries){
                geometries.push(g.clone().translate(offsetPos[0],offsetPos[1],offsetPos[2]));
            }
        }
    }
}







