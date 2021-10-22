
type MTexture = {
    offset :number,
    width : number,
    height : number
}



export class MTextureLoader{


    canvas : HTMLCanvasElement;

    loadTextureList = [
        "blocks/stone",
        "blocks/dirt",
        "blocks/grass_carried",
        "blocks/grass_side_carried",
        "blocks/glazed_terracotta_lime",
        "blocks/torch_on"
    ]

    textures : {[key:string]:MTexture} = {};

    isloadTextures : boolean = false;

    constructor(canvas : HTMLCanvasElement){
        this.canvas = canvas;
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
        for(let file of this.loadTextureList){
            const image = new Image();
            image.src = "texture/"+file+".png"
            image.onload = () => {
                images[file] = image;
                ctx.canvas.width += image.width;
                if(ctx.canvas.height < image.height){
                    ctx.canvas.height = image.height;
                } 
                counter.n--;
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
        const t = 16 - uv[1];
        uv[1] = 16 - uv[3];
        uv[3] = t;
        const offsetx = (texture.offset + (uv[0]/16) * texture.width) / this.canvas.width;
        const width = texture.width / this.canvas.width * ((uv[2]-uv[0])/16);
        const height = texture.height / this.canvas.height * ((uv[3]-uv[1])/16) ;
        const offsety = uv[1] / 16; 

        return [
            offsetx            ,offsety + height,
            offsetx + width    ,offsety + height,
            offsetx            ,offsety,
            offsetx + width    ,offsety
        ];
    }

    public getCanvas() :HTMLCanvasElement{
        return this.canvas;
    }

    




}