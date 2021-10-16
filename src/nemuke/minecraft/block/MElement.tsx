import * as THREE from 'three';
import { Vec3 } from "./Vec3";
import { Face, FaceInfo, FaceType } from './MFace';
import EmptyFace from './EmptyGeometry';

type faceFlag = {
    down : boolean,
    up  : boolean,
    north  : boolean,
    south  : boolean,
    west  : boolean,
    east  : boolean
}

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

    public getMesh(flag : faceFlag): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]> {
        const box = new THREE.Mesh(this.geometry, [
            flag.east ? EmptyFace : this.faces[FaceType.east].getFacesMaterial(),
            flag.west ? EmptyFace : this.faces[FaceType.west].getFacesMaterial() ,
            flag.up ? EmptyFace : this.faces[FaceType.up].getFacesMaterial() ,
            flag.down ? EmptyFace : this.faces[FaceType.down].getFacesMaterial() ,
            flag.south ? EmptyFace : this.faces[FaceType.south].getFacesMaterial() ,
            flag.north ? EmptyFace : this.faces[FaceType.north].getFacesMaterial() 
        ]);
        return box;
    }

    public getGeometries(flag : faceFlag) :  THREE.PlaneGeometry[]{
        let geometries : THREE.PlaneGeometry[] = [];
        if(!flag.east){
            let geometry = this.faces[FaceType.east].getPlaneGeometry();
            // geometry.attributes.uv.array[ 1 ] = 0.5;
            geometry.rotateY(Math.PI / 2);
            geometry.translate( 0.5, 0, 0 );
            geometries.push(geometry);
        }
        if(!flag.west){
            let geometry = this.faces[FaceType.east].getPlaneGeometry();
            geometry.rotateY(- Math.PI / 2);
            geometry.translate( -0.5, 0, 0 );
            geometries.push(geometry);
        }
        if(!flag.up){
            let geometry = this.faces[FaceType.east].getPlaneGeometry();
            geometry.rotateY(- Math.PI / 2);
            geometry.translate( 0, 50, 0 );
            geometries.push(geometry);
        }
        if(!flag.south){
            let geometry = this.faces[FaceType.east].getPlaneGeometry();
            geometry.translate( 0, 0, 50 );
            geometries.push(geometry);
        }
        if(!flag.up){
            let geometry = this.faces[FaceType.east].getPlaneGeometry();
            geometry.rotateY( Math.PI );
            geometry.translate( 0, 0, - 50 );
            geometries.push(geometry);
        }
        return geometries;
    }
}