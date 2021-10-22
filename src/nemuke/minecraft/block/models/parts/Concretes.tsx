import Block from "../../Block";
import { CubeAll } from "../CubeAll";
import terrain_texture from "../terrain_texture.json"


export {WhiteConcrete, OrangeConcrete, MagentaConcrete, LightBlueConcrete, YellowConcrete,
LimeConcrete, PinkConcrete, GrayConcrete, LightGrayConcrete,CyanConcrete,PurpleConcrete,
BlueConcrete, BrownConcrete, RedConcrete, BlackConcrete, GreenConcrete}

class WhiteConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[0]));
    }
}
class OrangeConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[1]));
    }
}
class MagentaConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[2]));
    }
}
class LightBlueConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[3]));
    }
}
class YellowConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[4]));
    }
}
class LimeConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[5]));
    }
}
class PinkConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[6]));
    }
}
class GrayConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[7]));
    }
}
class LightGrayConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[8]));
    }
}
class CyanConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[9]));
    }
}
class PurpleConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[10]));
    }
}
class BlueConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[11]));
    }
}
class BrownConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[12]));
    }
}
class GreenConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[13]));
    }
}
class RedConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[14]));
    }
}
class BlackConcrete extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.concrete.textures[15]));
    }
}