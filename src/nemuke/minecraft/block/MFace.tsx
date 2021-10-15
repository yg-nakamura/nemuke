import * as THREE from 'three';

export class Face {

    type: FaceType;
    faceInfo: FaceInfo;
    material: THREE.MeshBasicMaterial;

    constructor(type: FaceType, faceInfo: FaceInfo) {
        this.type = type;
        this.faceInfo = faceInfo;
        const loader = new THREE.TextureLoader()
        const texture = loader.load(faceInfo.folder + faceInfo.texture);
        texture.magFilter = THREE.NearestFilter;
        this.material = new THREE.MeshBasicMaterial({
            map: texture
        });
    }

    public getFacesMaterial(): THREE.MeshBasicMaterial {
        return this.material;
    }

}

export type FaceInfo = {
    folder: string,
    texture: string
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