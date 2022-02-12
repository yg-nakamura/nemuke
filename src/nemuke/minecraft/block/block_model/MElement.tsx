import * as THREE from 'three';
import { JsonRotation } from '../assets/loader/ModelLoader';
import { Vec3 } from "../units/Vec3";
import { Face, FaceInfo, FaceType } from './MFace';
import * as  BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils"
import { BufferGeometry, PlaneGeometry, SphereGeometry } from 'three';
import { sign } from 'crypto';

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
    geometry?: THREE.BufferGeometry;
    rotation? : JsonRotation;

    constructor(from: Vec3, to: Vec3) {
        this.from = from;
        this.to = to;
    }

    public createFace(type: FaceType, faceInfo: FaceInfo) {
        const face = new Face(type, faceInfo);
        const sx = (this.to.x - this.from.x)/16;
        const sy = (this.to.y - this.from.y)/16;
        const sz = (this.to.z - this.from.z)/16;
        let tx = 0;
        let ty = 0;
        let tz = 0;
        switch(type){
            case FaceType.north:　//z-
                face.getGeometry().scale(sx, sy, 0)
                tz = -sz/2;
                break;
            case FaceType.south: //z+
                face.getGeometry().scale(sx, sy, 0)
                tz = sz/2;
                break;
            case FaceType.west: //x-
                face.getGeometry().scale(0, sy, sz)
                tx = -sx/2;
                break;
            case FaceType.east: //x+
                face.getGeometry().scale(0, sy, sz)
                tx = sx/2;
                break;
            case FaceType.down: //y-
                face.getGeometry().scale(sx, 0, sz)
                ty = -sy/2;
                break;
            case FaceType.up: //y+
                face.getGeometry().scale(sx, 0, sz)
                ty = sy/2;
                break;
            default:
                face.getGeometry().scale(0, 0, 0)
        }
        face.getGeometry().translate(tx,ty,tz);
        





        this.faces[type] = face;
    }
    
    public getGeometries(flag : faceFlag) :  THREE.BufferGeometry | null{
        if(this.geometry){
            return this.geometry;
        }
        let geometries : THREE.BufferGeometry[] = [];
        if(!flag.east && this.faces[FaceType.east]){
            geometries.push( this.faces[FaceType.east].getGeometry());
        }
        if(!flag.west && this.faces[FaceType.west]){
            geometries.push( this.faces[FaceType.west].getGeometry());
        }
        if(!flag.up && this.faces[FaceType.up]){
            geometries.push( this.faces[FaceType.up].getGeometry());
        }
        if(!flag.down && this.faces[FaceType.down]){
            geometries.push( this.faces[FaceType.down].getGeometry());
        }
        if(!flag.south && this.faces[FaceType.south]){;
            geometries.push( this.faces[FaceType.south].getGeometry());
        }
        if(!flag.north && this.faces[FaceType.north]){
            geometries.push( this.faces[FaceType.north].getGeometry());
        }
        if(geometries.length > 0){
            const geometry = BufferGeometryUtils.mergeBufferGeometries( geometries );
            this.geometry = geometry;
            if(this.rotation && this.geometry){
                const postion = this.geometry.getAttribute("position").array;
                let newV = new Float32Array(postion.length);
                const theta  = this.rotation.angle * ( Math.PI / 180 );
                let ooffset = this.rotation.origin.concat();
                ooffset[0] = ((ooffset[0] - this.from.x) / 16); //中心座標
                ooffset[1] = ((ooffset[1] - this.from.y) / 16);//-4
                ooffset[2] = ((ooffset[2] - this.from.z) / 16);
                const cx = ooffset[0] - ((this.to.x - this.from.x) / 32);
                const cy = ooffset[1] - ((this.to.y - this.from.y) / 32);
                const cz = ooffset[2] - ((this.to.z - this.from.z) / 32);
                for(let i  = 0; i < postion.length; i+= 3){
                    const vx = postion[i  ]-cx;
                    const vy = postion[i+1]-cy;
                    const vz = postion[i+2]-cz;
                    //回転

                    if(this.rotation.axis == "x"){
                        newV[i  ] = vx+cx;
                        newV[i+1] = Math.sin(-theta)*vz + Math.cos(-theta)*vy + cy;
                        newV[i+2] = Math.cos(-theta)*vz - Math.sin(-theta)*vy + cz;
                    }
                    if(this.rotation.axis == "y"){
                        newV[i  ] = Math.sin( theta)*vz + Math.cos( theta)*vx + cx;
                        newV[i+1] = vy+cy;
                        newV[i+2] = Math.cos( theta)*vz - Math.sin( theta)*vx + cz;
                    }
                    if(this.rotation.axis == "z"){
                        newV[i  ] = Math.cos( theta)*vx - Math.sin( theta)*vy + cx;
                        newV[i+1] = Math.sin( theta)*vx + Math.cos( theta)*vy + cy;
                        newV[i+2] = vz+cz;
                    }
                }
                geometry.setAttribute( 'position', new THREE.BufferAttribute( newV, 3 ) );

                return this.getGeometries(flag);
            }
            
            return this.getGeometries(flag);
        }else{
            return null;
        }

    }
}