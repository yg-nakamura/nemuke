
import textures from "./texture.json"

type MTexture = {
    offset :number,
    width : number,
    height : number
}

// const loadTextureList = [
//     terrain_texture.texture_data.acacia_planks.textures,
//     terrain_texture.texture_data.stone.textures[0]
// ]

export class MTextureLoader{


    canvas : HTMLCanvasElement;

    

    textures : {[key:string]:MTexture} = {};

    isloadTextures : boolean = false;

    loadTextureList : string[] = [];

    constructor(canvas : HTMLCanvasElement){
        this.canvas = canvas;

        // type WaterLilyObj = { 
        //     path: string; 
        //     tint_color: string; 
        // }
        // type OverlayTextureObj = {
        //     overlay_color: string
        //     path: string
        // }
        // type TerrainTextureObj = {
        //     textures : string | OverlayTextureObj | string[] | (string | OverlayTextureObj)[] | WaterLilyObj[]
        // }
        // type TerrainTextureListObj = {
        //     [key:string] : TerrainTextureObj
        // }
        // const TrreinTextures : TerrainTextureListObj = terrain_texture.texture_data


        // for(let loadTexture in TrreinTextures){
        //     const t1 = TrreinTextures[loadTexture]
        //     if(typeof t1.textures === 'string'){
        //         this.loadTextureList.push(t1.textures);
        //     }else if(Array.isArray(t1.textures)){
        //         for(let t of t1.textures){
        //             if(typeof t === 'string'){
        //                 this.loadTextureList.push(t);
        //             }
        //         }
        //     }
        // }

        // const undefindTextures = ['textures/blocks/cake', 'textures/blocks/cactus_bottom', 'textures/blocks/cactus_side', 'textures/blocks/cactus_top', 'textures/blocks/double_plant_syringa_bottom', 'textures/blocks/double_plant_grass_bottom', 'textures/blocks/double_plant_fern_bottom', 'textures/blocks/double_plant_syringa_top', 'textures/blocks/double_plant_grass_top', 'textures/blocks/double_plant_fern_top', 'textures/blocks/grindstone_pivot', 'textures/blocks/grindstone_round', 'textures/blocks/grindstone_side', 'textures/blocks/kelp_a', 'textures/blocks/kelp_b', 'textures/blocks/kelp_c', 'textures/blocks/kelp_d', 'textures/blocks/kelp_top', 'textures/blocks/kelp_top_bulb', 'textures/blocks/leaves_oak', 'textures/blocks/leaves_spruce', 'textures/blocks/leaves_birch', 'textures/blocks/leaves_jungle', 'textures/blocks/leaves_acacia', 'textures/blocks/leaves_big_oak', 'textures/blocks/leaves_oak_carried', 'textures/blocks/leaves_spruce_carried', 'textures/blocks/leaves_birch_carried', 'textures/blocks/leaves_jungle_carried', 'textures/blocks/leaves_acacia_carried', 'textures/blocks/leaves_big_oak_carried', 'textures/misc/missing_texture', 'textures/blocks/reeds', 'textures/blocks/scaffolding_bottom', 'textures/blocks/scaffolding_side', 'textures/blocks/scaffolding_top', 'textures/blocks/seagrass_doubletall_bottom_a', 'textures/blocks/seagrass_doubletall_bottom_b', 'textures/blocks/seagrass_doubletall_top_a', 'textures/blocks/seagrass_doubletall_top_b', 'textures/blocks/stonecutter2_saw', 'textures/blocks/fern', 'textures/blocks/tallgrass_carried', 'textures/blocks/fern_carried'];
        
        // this.loadTextureList = Array.from(new Set(this.loadTextureList)).filter((k) => {
        //     return !k.includes("items") && !k.includes("environment") && undefindTextures.indexOf(k) == -1
        // } )

        for(let texture of textures.list){
            this.loadTextureList.push("block/" + texture)
        }
      
    }


    loadImageFile(callback : any){
        let counter = {
            n : this.loadTextureList.length
        }
        const ctx = this.canvas.getContext("2d");
        if(ctx == null) return;
        const images : {[key:string] : HTMLImageElement } = {};
        ctx.canvas.width = 0;
        ctx.canvas.height = 0;

        // const loadlist:string[] = [];

        for(let file of this.loadTextureList){
            const image = new Image();
            image.src = "textures/" +file+".png"
            // console.log(file);
            image.onload = () => {
                images[file] = image;
                ctx.canvas.width += image.width;
                if(ctx.canvas.height < image.height){
                    ctx.canvas.height = image.height;
                } 
                counter.n--;
                // loadlist.push(file);
                // console.log(this.loadTextureList.filter(i=>loadlist.indexOf(i) == -1))
                // console.log(counter.n);
                if(counter.n === 0){
                    this.applyToCantext(images, ctx, callback);
                }
            }
        }
    }

    public applyToCantext(images : {[key:string] : HTMLImageElement }, ctx : CanvasRenderingContext2D, callback : any){
        
        let offset = 0;
        for(let name in images){
            ctx.drawImage(images[name],offset,0);
            this.textures[name] = {
                offset : offset,
                width : images[name].width,
                height : images[name].height
            }
            offset += images[name].width; 
        }
        this.isloadTextures = true;
        callback(this);
    }

    public getUVMap(name : string, uv : number[]) : number[]{
        const texture = this.textures[name];

        if(texture){
            
            const oy = (((16-uv[3])/16)*texture.height) / this.canvas.height;

            const ty = ((uv[3]-uv[1])/16)  * texture.height;

            const offsetx = (texture.offset + (uv[0]/16) * texture.width) / this.canvas.width;
            const width = texture.width / this.canvas.width * ((uv[2]-uv[0])/16);
            const height =  ty / this.canvas.height;
            const offsety = (this.canvas.height - texture.height) / this.canvas.height + oy; 

            return [
                offsetx            ,offsety + height,
                offsetx + width    ,offsety + height,
                offsetx            ,offsety,
                offsetx + width    ,offsety
            ];
        }
        return [];
    }

    public getCanvas() :HTMLCanvasElement{
        return this.canvas;
    }

    




}