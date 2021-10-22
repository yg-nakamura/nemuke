import Block from "../Block";
import { ButtonInventory } from "./ButtonInventory";
import terrain_texture from "./terrain_texture.json"

export default class Stone extends ButtonInventory{

    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.acacia_planks.textures));
    }

}