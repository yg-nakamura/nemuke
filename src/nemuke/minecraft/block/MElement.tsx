import * as THREE from 'three';
import { Vec3 } from "./Vec3";
import { Face, FaceInfo, FaceType } from './MFace';

export class MElement {

    from: Vec3;
    to: Vec3;
    faces: { [key: string]: Face } = {};
    geometry: THREE.BoxGeometry;

    constructor(from: Vec3, to: Vec3) {
        this.from = from;
        this.to = to;
        this.geometry = new THREE.BoxGeometry((to.x - from.x) / 16, (to.y - from.y) / 16, (to.z - from.z) / 16);
    }

    public createFace(type: FaceType, faceInfo: FaceInfo) {
        this.faces[type] = new Face(type, faceInfo);
    }

    public getMesh(): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]> {
        const box = new THREE.Mesh(this.geometry, [
            this.faces[FaceType.east].getFacesMaterial(),
            this.faces[FaceType.west].getFacesMaterial(),
            this.faces[FaceType.up].getFacesMaterial(),
            this.faces[FaceType.down].getFacesMaterial(),
            this.faces[FaceType.south].getFacesMaterial(),
            this.faces[FaceType.north].getFacesMaterial(),
        ]);
        return box;
    }
}