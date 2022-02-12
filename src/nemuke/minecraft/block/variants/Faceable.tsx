import BlockId from "../BlockId";
import { FaceType } from "../block_model/MFace";
import AdjBlocks from "../units/AdjBlocks";
import { Vec3 } from "../units/Vec3";
import { Variants } from "./Variants";


export class Faceable extends Variants{
    protected static HORIZONTALS = [FaceType.south, FaceType.west, FaceType.north, FaceType.east]    

    public static fromHorizontalIndex(index : number) : string{
        return Faceable.HORIZONTALS[Math.abs(index % Faceable.HORIZONTALS.length)];
    }

    public override pushGeometries(geometries : THREE.BufferGeometry[],pos : Vec3, data : number, adjBlocks : AdjBlocks,keys : string[]){
        keys.push("facing=" + Faceable.fromHorizontalIndex(data & 0x7) )
        super.pushGeometries(geometries,pos,data,adjBlocks,keys);
    }
}

export class Anvil extends Faceable{
    
}

export class Banner extends Faceable{
    
}

export class Bed extends Faceable{
    
}

export class BlockHayBale extends Faceable{
    
}

export class Bone extends Faceable{
    
}

export class Button extends Faceable{
    
}

export class Chest extends Faceable{
    
}

export class Cocoa extends Faceable{
    
}

export class Dispenser extends Faceable{
    
}

export class Door extends Faceable{
    
}

export class EnderChest extends Faceable{
    
}

export class EndPortalFrame extends Faceable{
    
}

export class EndRod extends Faceable{
    
}

export class FanceGate extends Faceable{
    
}

export class FurnaceBurning extends Faceable{
    
}

export class Hopper extends Faceable{
    
}

export class Ladder extends Faceable{
    
}

export class Lever extends Faceable{
    
}


export class NetherPortal extends Faceable{
    
}

export class Ovserver extends Faceable{
    
}

export class PistonBase extends Faceable{
    
}

export class Pumpkin extends Faceable{
    
}

export class Rail extends Faceable{
    
}

export class RedstoneDiode extends Faceable{
    
}

export class SignPost extends Faceable{
    
}

export class Stairs extends Faceable{
    
}

export class TerracottaGlaze extends Faceable{
    
}

export class Torch extends Faceable{
    
}

export class Trapdoor extends Faceable{
    
}