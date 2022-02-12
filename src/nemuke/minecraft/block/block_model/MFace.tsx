import * as THREE from 'three';

export type FaceInfo = {
    uv: number[]
}

export enum FaceType {
    down = "down",
    up = "up",
    north = "north",
    south = "south",
    west = "west",
    east = "east",
    none = "none",
    all = "all"
}

export class Face {

    type: FaceType;
    faceInfo: FaceInfo;
    // material: THREE.MeshBasicMaterial;
    geometry : THREE.BufferGeometry;

    constructor(type: FaceType, faceInfo: FaceInfo) {
        this.type = type;
        this.faceInfo = faceInfo;

        let geometry = new THREE.PlaneGeometry(1,1);
        if(this.type === FaceType.east){
            geometry.rotateY(Math.PI / 2);
        }else if(this.type === FaceType.west){
            geometry.rotateY(- Math.PI / 2);
        }else if(this.type === FaceType.up){
            geometry.rotateX(- Math.PI / 2);
        }else if(this.type === FaceType.south){

        }else if(this.type === FaceType.north){
            geometry.rotateY( Math.PI );
        }else if(this.type === FaceType.down){
            geometry.rotateX( Math.PI / 2);
        }
        let uvs = new Float32Array(8);
        uvs[0] = faceInfo.uv[0]; uvs[1] = faceInfo.uv[1]; //画像の左上 -> (u : 0, v : 1)
        uvs[2] = faceInfo.uv[2]; uvs[3] = faceInfo.uv[3]; //画像の右上 -> (u : 1, v : 1) 
        uvs[4] = faceInfo.uv[4]; uvs[5] = faceInfo.uv[5]; //画像の左下 -> (u : 0, v : 0)
        uvs[6] = faceInfo.uv[6]; uvs[7] = faceInfo.uv[7]; //画像の右下 -> (u : 1, v : 0) 
        // uvs[0] = faceInfo.uv[4]; uvs[1] = faceInfo.uv[5]; //画像の左上 -> (u : 0, v : 1)
        // uvs[2] = faceInfo.uv[6]; uvs[3] = faceInfo.uv[7]; //画像の右上 -> (u : 1, v : 1) 
        // uvs[4] = faceInfo.uv[0]; uvs[5] = faceInfo.uv[1]; //画像の左下 -> (u : 0, v : 0)
        // uvs[6] = faceInfo.uv[2]; uvs[7] = faceInfo.uv[3]; //画像の右下 -> (u : 1, v : 0) 
        let uvAttribute = new THREE.Float32BufferAttribute(uvs, 2 ).setUsage(THREE.StaticDrawUsage);
        geometry.setAttribute("uv",uvAttribute);

        this.geometry = geometry;
    }


    public getGeometry() : THREE.BufferGeometry{
       return this.geometry;
    }

    public setGeometry(geometry : THREE.BufferGeometry){
        this.geometry = geometry;
    }


}

