
type MTexture = {
    offset :number,
    width : number,
    height : number
}



export class MTextureLoader{


    canvas : HTMLCanvasElement;

    loadTextureList = [
        "stone",
        "dirt",
        "grass_carried",
        "grass_side_carried",
        "glazed_terracotta_lime",
    ]

    textures : {[key:string]:MTexture} = {};

    isloadTextures : boolean = false;

    constructor(canvas : HTMLCanvasElement){
        this.canvas = canvas;
    }

    loadImageFile(callback : any){
        let cont = this.loadTextureList.length;
        const ctx = this.canvas.getContext("2d");
        if(ctx == null) return;
        const images : {[key:string] : HTMLImageElement } = {};
        let width = 0;
        let height = 0;
        for(let file of this.loadTextureList){
            const image = new Image();
            image.src = "texture/"+file+".png"
            
            
            image.onload = () => {
                images[file] = image;
                width += image.width;
                if(height < image.height){
                    height = image.height;
                } 
                cont--;
                if(cont === 0){
                    ctx.canvas.width = width;
                    ctx.canvas.height = height;
                    console.log(this.canvas.width);
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

    public getUVMap(name : string) : number[]{
        const texture = this.textures[name];

        const offset = texture.offset / this.canvas.width;
        const width = texture.width / this.canvas.width;
        const height = texture.height / this.canvas.height;

        return [
            offset          ,height,
            offset + width  ,height,
            offset          ,0,
            offset + width  ,0
        ];
    }

    public getCanvas() :HTMLCanvasElement{
        return this.canvas;
    }

    




}