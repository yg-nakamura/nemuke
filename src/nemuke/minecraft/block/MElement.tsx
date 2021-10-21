import * as THREE from 'three';
import { Vec3 } from "./Vec3";
import { Face, FaceInfo, FaceType } from './MFace';

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
        const face = new Face(type, faceInfo);
        const sx = (this.to.x - this.from.x)/16;
        const sy = (this.to.y - this.from.y)/16;
        const sz = (this.to.z - this.from.z)/16
        switch(type){
            case FaceType.north:　//z-
                face.getPlaneGeometry().scale(sx, sy, 0)
                face.getPlaneGeometry().translate(0,0,-sz/2)//12-2=10 , 10/16=0.625  0.3125 / 2
                break;
            case FaceType.south: //z+
                face.getPlaneGeometry().scale(sx, sy, 0)
                console.log((1 - sz)/2);
                face.getPlaneGeometry().translate(0,0,sz/2)//12 - 4 = 8, 8 / 16 = 0.5, (1-0.5)/2 = 0.25
                break;
            case FaceType.west: //x-
                face.getPlaneGeometry().scale(0, sy, sz)
                face.getPlaneGeometry().translate(-sx/2, 0,0)
                break;
            case FaceType.east: //x+
                face.getPlaneGeometry().scale(0, sy, sz)
                face.getPlaneGeometry().translate(sx/2,0,0)
                break;
            case FaceType.down: //y-
                face.getPlaneGeometry().scale(sx, 0, sz)
                face.getPlaneGeometry().translate(0, -sy/2, 0)
                break;
            case FaceType.up: //y+
                face.getPlaneGeometry().scale(sx, 0, sz)
                face.getPlaneGeometry().translate(0, sy/2, 0)
                break;
            default:
                face.getPlaneGeometry().scale(0, 0, 0)
        }

        this.faces[type] = face;
    }
    
    public getGeometries(flag : faceFlag) :  THREE.PlaneGeometry[]{
        let geometries : THREE.PlaneGeometry[] = [];
        if(!flag.east){
            geometries.push( this.faces[FaceType.east].getPlaneGeometry());
        }
        if(!flag.west){
            geometries.push( this.faces[FaceType.west].getPlaneGeometry());
        }
        if(!flag.up){
            geometries.push( this.faces[FaceType.up].getPlaneGeometry());
        }
        if(!flag.down){
            geometries.push( this.faces[FaceType.down].getPlaneGeometry());
        }
        if(!flag.south){;
            geometries.push( this.faces[FaceType.south].getPlaneGeometry());
        }
        if(!flag.north){
            geometries.push( this.faces[FaceType.north].getPlaneGeometry());
        }
        return geometries;
    }
}