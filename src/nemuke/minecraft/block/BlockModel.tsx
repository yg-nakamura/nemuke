
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

    
    private elements: MElement[];
    public isFullFace : faceFlag;

    constructor() {
        this.elements = [];
        this.isFullFace = {
            down : false,
            up : false,
            north : false,
            south : false,
            west : false,
            east : false
        }
    }

    protected createElement(from: Vec3, to: Vec3): MElement {
        return new MElement(from, to);
    }

    protected pushElement(element: MElement) {
        this.elements.push(element);
    }



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
                if(Block.getBlockModelByID(adjBlocks.east).isFullFace.west){
                    flag.east = true;
                }
                if(Block.getBlockModelByID(adjBlocks.west).isFullFace.east){
                    flag.west = true;
                }
                if(Block.getBlockModelByID(adjBlocks.up).isFullFace.down){
                    flag.up = true;
                }
                if(Block.getBlockModelByID(adjBlocks.down).isFullFace.up){
                    flag.down = true;
                }
                if(Block.getBlockModelByID(adjBlocks.south).isFullFace.north){
                    flag.south = true;
                }
                if(Block.getBlockModelByID(adjBlocks.north).isFullFace.south){
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

    protected getUV(path : string) : number[]{
        return Block.getUVMap(path);
    }
}







