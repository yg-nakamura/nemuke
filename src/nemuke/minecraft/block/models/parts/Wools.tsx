import Block from "../../Block";
import { CubeAll } from "../CubeAll";
import terrain_texture from "../terrain_texture.json"


export {WhiteWool, OrangeWool, MagentaWool, LightBlueWool, YellowWool,
LimeWool, PinkWool, GrayWool, LightGrayWool,CyanWool,PurpleWool,
BlueWool, BrownWool, RedWool, BlackWool, GreenWool}

class WhiteWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[0]));
    }
}
class OrangeWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[1]));
    }
}
class MagentaWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[2]));
    }
}
class LightBlueWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[3]));
    }
}
class YellowWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[4]));
    }
}
class LimeWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[5]));
    }
}
class PinkWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[6]));
    }
}
class GrayWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[7]));
    }
}
class LightGrayWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[8]));
    }
}
class CyanWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[9]));
    }
}
class PurpleWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[10]));
    }
}
class BlueWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[11]));
    }
}
class BrownWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[12]));
    }
}
class GreenWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[13]));
    }
}
class RedWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[14]));
    }
}
class BlackWool extends CubeAll{
    constructor(){
        super(Block.getUVMap(terrain_texture.texture_data.wool.textures[15]));
    }
}