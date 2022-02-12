
import * as THREE from 'three';
import Block from '../Block';
import BlockId from '../BlockId';
import { MElement } from './MElement';
import { FaceType } from './MFace';
import BlockModelLoader, { JsonElement, JsonModel, JsonRotation } from '../assets/loader/ModelLoader';
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
                const rotation = jsonElement.rotation;
                const element = this.createElement({x: from[0], y: from[1] , z: from[2]}, {x: to[0], y: to[1] , z: to[2]});
                element.rotation = rotation;
                for(let face_key in jsonElement.faces){
                    let rotate = 0;
                    switch(face_key){
                        case "down":
                            if(jsonElement.faces["down"] && this.textures[jsonElement.faces["down"].texture]){
                                if(jsonElement.faces["down"].rotation){
                                    rotate = jsonElement.faces["down"].rotation / 90;
                                }
                                element.createFace(FaceType.down,
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["down"].texture],rotate,
                                    jsonElement.faces["down"].uv)}
                                    );
                                if(jsonElement.faces["down"].cullface){
                                    this.isCullFace.down = true;
                                }
                            }

                            break;
                        case "up":
                            if(jsonElement.faces["up"] && this.textures[jsonElement.faces["up"].texture]){
                                if(jsonElement.faces["up"].rotation){
                                    rotate = jsonElement.faces["up"].rotation / 90;
                                }
                                element.createFace(FaceType.up, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["up"].texture],rotate,
                                    jsonElement.faces["up"].uv)}
                                    );
                                if(jsonElement.faces["up"].cullface){
                                    this.isCullFace.up = true;
                                }
                            }

                            break;
                        case "north":
                            if(jsonElement.faces["north"] && this.textures[jsonElement.faces["north"].texture]){
                                if(jsonElement.faces["north"].rotation){
                                    rotate = jsonElement.faces["north"].rotation / 90;
                                }
                                element.createFace(FaceType.north, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["north"].texture],rotate,
                                    jsonElement.faces["north"].uv)}
                                    );
                                if(jsonElement.faces["north"].cullface){
                                    this.isCullFace.north = true;
                                }
                            }

                            break;
                        case "south":
                            if(jsonElement.faces["south"] && this.textures[jsonElement.faces["south"].texture]){
                                if(jsonElement.faces["south"].rotation){
                                    rotate = jsonElement.faces["south"].rotation / 90;
                                }
                                element.createFace(FaceType.south, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["south"].texture],rotate,
                                    jsonElement.faces["south"].uv)}
                                    );
                                if(jsonElement.faces["south"].cullface){
                                    this.isCullFace.south = true;
                                } 
                            }

                            break;
                        case "west":
                            if(jsonElement.faces["west"] && this.textures[jsonElement.faces["west"].texture]){
                                if(jsonElement.faces["west"].rotation){
                                    rotate = jsonElement.faces["west"].rotation / 90;
                                }
                                element.createFace(FaceType.west, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["west"].texture],rotate,
                                    jsonElement.faces["west"].uv)}
                                    );
                                if(jsonElement.faces["west"].cullface){
                                    this.isCullFace.west = true;
                                } 
                            }

                            break;
                        case "east":
                            if(jsonElement.faces["east"] && this.textures[jsonElement.faces["east"].texture]){
                                if(jsonElement.faces["east"].rotation){
                                    rotate = jsonElement.faces["east"].rotation / 90;
                                }
                                element.createFace(FaceType.east, 
                                    {uv:Block.getUVMap(this.textures[jsonElement.faces["east"].texture],rotate,
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

    public pushGeometries(geometries : THREE.BufferGeometry[],pos: Vec3, 
        adjBlocks : {
            east : {id : BlockId, damage : number},
            west : {id : BlockId, damage : number},
            up : {id : BlockId, damage : number},
            down : {id : BlockId, damage : number},
            south : {id : BlockId, damage : number},
            north : {id : BlockId, damage : number},
        }
        ){

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
                if(Block.getBlockModelByID(adjBlocks.east.id,adjBlocks.east.damage).isFullFace.west){
                    flag.east = true;
                }
                if(Block.getBlockModelByID(adjBlocks.west.id,adjBlocks.west.damage).isFullFace.east){
                    flag.west = true;
                }
                if(Block.getBlockModelByID(adjBlocks.up.id,adjBlocks.up.damage).isFullFace.down){
                    flag.up = true;
                }
                if(Block.getBlockModelByID(adjBlocks.down.id,adjBlocks.down.damage).isFullFace.up){
                    flag.down = true;
                }
                if(Block.getBlockModelByID(adjBlocks.south.id,adjBlocks.south.damage).isFullFace.north){
                    flag.south = true;
                }
                if(Block.getBlockModelByID(adjBlocks.north.id,adjBlocks.north.damage).isFullFace.south){
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
            if(elementGeometries != null){
                geometries.push(elementGeometries.clone().translate(offsetPos[0],offsetPos[1],offsetPos[2]));
            }
        }
    }

    public getUV(path : string) : number[]{
        return Block.getUVMap(path, 0);
    }

    public rotateY() : BlockModel{
        const model = new BlockModel();
        for (let element of this.elements) {
            const from = {x : element.from.z , z : 16 - element.to.x , y : element.from.y};
            const to = {x : element.to.z, z : 16 - element.from.x, y : element.to.y};
            const newelement = model.createElement(from, to);
            if(element.rotation){
                const origin = element.rotation.origin;
                const newrotation : JsonRotation = {
                    origin : [16-origin[2], origin[1], origin[0]],
                    axis : 　element.rotation.axis == "y" ?  "y" : (element.rotation.axis == "z" ? "x" : "z"),
                    angle : element.rotation.axis == "y" ? element.rotation.angle : (element.rotation.axis == "z" ?  - element.rotation.angle : element.rotation.angle)
                }
                newelement.rotation = newrotation;
            }
            if(element.faces[FaceType.east]){
                newelement.createFace(FaceType.south,element.faces[FaceType.east].faceInfo);
            }
            if(element.faces[FaceType.north]){
                newelement.createFace(FaceType.east,element.faces[FaceType.north].faceInfo);
            }
            if(element.faces[FaceType.west]){
                newelement.createFace(FaceType.north,element.faces[FaceType.west].faceInfo);
            }
            if(element.faces[FaceType.south]){
                newelement.createFace(FaceType.west,element.faces[FaceType.south].faceInfo);
            }
            if(element.faces[FaceType.up]){
                let uv = [0,0, 0,0, 0,0, 0,0];
                const uvR = [4,5,0,1,6,7,2,3];
                for(let i = 0; i < 8; i++){
                    uv[i] = element.faces[FaceType.up].faceInfo.uv[uvR[i]];
                }
                newelement.createFace(FaceType.up,{uv:uv});
            }
            if(element.faces[FaceType.down]){
                let uv = [0,0, 0,0, 0,0, 0,0];
                const uvR = [4,5,0,1,6,7,2,3];
                for(let i = 0; i < 8; i++){
                    uv[i] = element.faces[FaceType.down].faceInfo.uv[uvR[i]];
                }
                newelement.createFace(FaceType.down,{uv:uv});
            }
            model.pushElement(newelement);
        }
        return model;
    }

    public rotateX() : BlockModel{
        const model = new BlockModel();
        for (let element of this.elements) {
            const from = {x : element.from.x , z : element.from.y , y : 16 - element.to.z};
            const to = {x : element.to.x, z : element.to.y, y : 16 - element.from.z};
            const newelement = model.createElement(from, to);
            if(element.rotation){
                const origin = element.rotation.origin;
                const newrotation : JsonRotation = {
                    origin : [origin[0], origin[2], 16 - origin[1]],
                    axis : 　element.rotation.axis == "x" ?  "x" : (element.rotation.axis == "z" ? "y" : "z"),
                    angle : element.rotation.axis == "x" ? element.rotation.angle : (element.rotation.axis == "y" ?  - element.rotation.angle : element.rotation.angle)
                }
                newelement.rotation = newrotation;
            }
            if(element.faces[FaceType.east]){
                let uv = [0,0, 0,0, 0,0, 0,0];
                const uvR = [4,5,0,1,6,7,2,3];
                for(let i = 0; i < 8; i++){
                    uv[i] = element.faces[FaceType.east].faceInfo.uv[uvR[i]];
                }
                newelement.createFace(FaceType.east,{uv:uv});
            }
            if(element.faces[FaceType.north]){
                let uv = [0,0, 0,0, 0,0, 0,0];
                const uvR = [4,5,0,1,6,7,2,3];
                for(let i = 0; i < 8; i++){
                    uv[i] = element.faces[FaceType.north].faceInfo.uv[uvR[i]];
                }
                newelement.createFace(FaceType.down,{uv:uv});
            }
            if(element.faces[FaceType.west]){
                let uv = [0,0, 0,0, 0,0, 0,0];
                const uvR = [4,5,0,1,6,7,2,3];
                for(let i = 0; i < 8; i++){
                    uv[i] = element.faces[FaceType.west].faceInfo.uv[uvR[i]];
                }
                newelement.createFace(FaceType.west,{uv:uv});
            }
            if(element.faces[FaceType.south]){
                let uv = [0,0, 0,0, 0,0, 0,0];
                const uvR = [4,5,0,1,6,7,2,3];
                for(let i = 0; i < 8; i++){
                    uv[i] = element.faces[FaceType.south].faceInfo.uv[uvR[i]];
                }
                newelement.createFace(FaceType.up,{uv:uv});
            }
            if(element.faces[FaceType.up]){
                let uv = [0,0, 0,0, 0,0, 0,0];
                const uvR = [4,5,0,1,6,7,2,3];
                for(let i = 0; i < 8; i++){
                    uv[i] = element.faces[FaceType.up].faceInfo.uv[uvR[i]];
                }
                newelement.createFace(FaceType.north,{uv:uv});
            }
            if(element.faces[FaceType.down]){
                let uv = [0,0, 0,0, 0,0, 0,0];
                const uvR = [4,5,0,1,6,7,2,3];
                for(let i = 0; i < 8; i++){
                    uv[i] = element.faces[FaceType.down].faceInfo.uv[uvR[i]];
                }
                newelement.createFace(FaceType.south,{uv:uv});
            }
            model.pushElement(newelement);
        }
        return model;
    }


}







