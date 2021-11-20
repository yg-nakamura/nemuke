
import * as THREE from 'three';
import Block from '../Block';
import BlockId from '../BlockId';
import { MElement } from './MElement';
import { FaceType } from './MFace';
import BlockModelLoader, { JsonElement, JsonModel } from '../assets/loader/ModelLoader';
import { Vec3 } from '../units/Vec3';

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

    public isFullFace : faceFlag = {
        down : false,
        up : false,
        north : false,
        south : false,
        west : false,
        east : false
    };
    public isCullFace : faceFlag = {
        down : false,
        up : false,
        north : false,
        south : false,
        west : false,
        east : false
    };

    private isGlass = false;

    protected textures : {[key:string] : string} = {};

    constructor() {
        this.elements = [];
    }

    public fromJsonModel(jsonModel : JsonModel) : BlockModel{
        // console.log(jsonModel);
        if(jsonModel.textures){
            for(let texture_key in jsonModel.textures){
                if(this.textures[jsonModel.textures[texture_key]]){
                    this.textures["#" + texture_key] = this.textures[jsonModel.textures[texture_key]];
                }else{
                    this.textures["#" + texture_key] = jsonModel.textures[texture_key].replace('minecraft:','');
                    // if(jsonModel.textures[texture_key].includes('glass')){
                    //     console.log(jsonModel);
                    //     this.isGlass = true;
                    // }
                }
            }
        }
        if(jsonModel.elements){
            for(let jsonElement of jsonModel.elements){
                const from = jsonElement.from;
                const to = jsonElement.to;
                const element = this.createElement({x: from[0], y: from[1] , z: from[2]}, {x: to[0], y: to[1] , z: to[2]});
                for(let face_key in jsonElement.faces){
                    switch(face_key){
                        case "down":
                            if(jsonElement.faces["down"] && this.textures[jsonElement.faces["down"].texture]){
                                element.createFace(FaceType.down,
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["down"].texture],
                                    jsonElement.faces["down"].uv)}
                                    );
                                if(jsonElement.faces["down"].cullface){
                                    this.isCullFace.down = true;
                                }
                            }

                            break;
                        case "up":
                            if(jsonElement.faces["up"] && this.textures[jsonElement.faces["up"].texture]){
                                element.createFace(FaceType.up, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["up"].texture],
                                    jsonElement.faces["up"].uv)}
                                    );
                                if(jsonElement.faces["up"].cullface){
                                    this.isCullFace.up = true;
                                }
                            }

                            break;
                        case "north":
                            if(jsonElement.faces["north"] && this.textures[jsonElement.faces["north"].texture]){
                                element.createFace(FaceType.north, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["north"].texture],
                                    jsonElement.faces["north"].uv)}
                                    );
                                if(jsonElement.faces["north"].cullface){
                                    this.isCullFace.north = true;
                                }
                            }

                            break;
                        case "south":
                            if(jsonElement.faces["south"] && this.textures[jsonElement.faces["south"].texture]){
                                element.createFace(FaceType.south, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["south"].texture],
                                    jsonElement.faces["south"].uv)}
                                    );
                                if(jsonElement.faces["south"].cullface){
                                    this.isCullFace.south = true;
                                } 
                            }

                            break;
                        case "west":
                            if(jsonElement.faces["west"] && this.textures[jsonElement.faces["west"].texture]){
                                element.createFace(FaceType.west, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["west"].texture],
                                    jsonElement.faces["west"].uv)}
                                    );
                                if(jsonElement.faces["west"].cullface){
                                    this.isCullFace.west = true;
                                } 
                            }

                            break;
                        case "east":
                            if(jsonElement.faces["east"] && this.textures[jsonElement.faces["east"].texture]){
                                element.createFace(FaceType.east, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["east"].texture],
                                    jsonElement.faces["east"].uv)}
                                    );
                                if(jsonElement.faces["east"].cullface){
                                    this.isCullFace.east = true;
                                } 
                            }
                            break;
                    }
                }
                this.pushElement(element);
            }
        }
        if(jsonModel.parent){
            if(jsonModel.parent === "block/block"){
                return this;
            }
            return this.fromJsonModel(BlockModelLoader.jsonModels[jsonModel.parent.replace('minecraft:','')]);
        }
        return this;
    }

    public createElement(from: Vec3, to: Vec3): MElement {
        return new MElement(from, to);
    }

    public pushElement(element: MElement) {
        if(!this.isGlass){
            for(let f in element.faces){
                switch(f){
                    case FaceType.down:
                        this.isFullFace.down = element.from.x == 0 && element.from.z == 0 && element.to.x == 16 && element.to.z == 16;
                        break;
                    case FaceType.up:
                        this.isFullFace.up = element.from.x == 0 && element.from.z == 0 && element.to.x == 16 && element.to.z == 16;
                        break;
                    case FaceType.north:
                        this.isFullFace.north = element.from.x == 0 && element.from.y == 0 && element.to.x == 16 && element.to.y == 16;
                        break;
                    case FaceType.south:
                        this.isFullFace.south = element.from.x == 0 && element.from.y == 0 && element.to.x == 16 && element.to.y == 16;
                        break;
                    case FaceType.west:
                        this.isFullFace.west = element.from.z == 0 && element.from.y == 0 && element.to.z == 16 && element.to.y == 16;
                        break;
                    case FaceType.east:
                        this.isFullFace.east = element.from.z == 0 && element.from.y == 0 && element.to.z == 16 && element.to.y == 16;
                        break;
                }
            }
        }

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

    public getUV(path : string) : number[]{
        return Block.getUVMap(path);
    }

    public rotateY() : BlockModel{
        const model = new BlockModel();
        for (let element of this.elements) {
            const from = {x : element.from.z , z : 16 - element.to.x , y : element.from.y};
            const to = {x : element.to.z, z : 16 - element.from.x, y : element.to.y};
            const newelement = model.createElement(from, to);
            if(element.faces[FaceType.east]){
                newelement.createFace(FaceType.north,element.faces[FaceType.east].faceInfo);
            }
            if(element.faces[FaceType.north]){
                newelement.createFace(FaceType.west,element.faces[FaceType.north].faceInfo);
            }
            if(element.faces[FaceType.west]){
                newelement.createFace(FaceType.south,element.faces[FaceType.west].faceInfo);
            }
            if(element.faces[FaceType.south]){
                newelement.createFace(FaceType.east,element.faces[FaceType.south].faceInfo);
            }
            if(element.faces[FaceType.up]){
                newelement.createFace(FaceType.up,element.faces[FaceType.up].faceInfo);
            }
            if(element.faces[FaceType.down]){
                newelement.createFace(FaceType.down,element.faces[FaceType.down].faceInfo);
            }
            model.pushElement(newelement);
        }
        return model;
    }

    public rotateX() : BlockModel{
        const model = new BlockModel();
        for (let element of this.elements) {
            const from = {x : element.from.z , z : 16 - element.to.x , y : element.from.y};
            const to = {x : element.to.z, z : 16 - element.from.x, y : element.to.y};
            const newelement = model.createElement(from, to);
            if(element.faces[FaceType.east]){
                newelement.createFace(FaceType.down,element.faces[FaceType.east].faceInfo);
            }
            if(element.faces[FaceType.north]){
                newelement.createFace(FaceType.north,element.faces[FaceType.north].faceInfo);
            }
            if(element.faces[FaceType.west]){
                newelement.createFace(FaceType.up,element.faces[FaceType.west].faceInfo);
            }
            if(element.faces[FaceType.south]){
                newelement.createFace(FaceType.south,element.faces[FaceType.south].faceInfo);
            }
            if(element.faces[FaceType.up]){
                newelement.createFace(FaceType.east,element.faces[FaceType.up].faceInfo);
            }
            if(element.faces[FaceType.down]){
                newelement.createFace(FaceType.west,element.faces[FaceType.down].faceInfo);
            }
            model.pushElement(newelement);
        }
        return model;
    }


}







