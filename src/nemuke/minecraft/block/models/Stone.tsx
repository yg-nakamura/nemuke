import Block from "../Block";
import { CubeAll } from "./CubeAll";
import terrain_texture from "./terrain_texture.json"


export default class Stone extends CubeAll{

    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.stone.textures[0]));
    }

}