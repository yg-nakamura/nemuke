
import * as THREE from 'three';

export class BlockModel{
    
    elements : Element[];

    constructor(){
        this.elements = [];
    }

    protected createElement(from : Vec3, to : Vec3) : Element{
        return new Element(from, to);
    }

    protected pushElement(element : Element){
        this.elements.push(element);
    }

    public getMeshes(pos : Vec3) : THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>[]{
        const meshes : THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>[] = [];
        for(let element of this.elements){
            const mesh = element.getMesh();
            mesh.position.set(element.from.x + pos.x, element.from.y + pos.y, element.from.z + pos.z);
            meshes.push(mesh);
        }
        return meshes;
    }

    public spawnBlock(pos : Vec3, scene : THREE.Scene){
        for(let m of this.getMeshes(pos)){
            scene.add(m)
        }
    }
}

type Vec3 = {
    x : number,
    y : number,
    z : number
}
class Element{

    from : Vec3;
    to : Vec3;
    faces : {[key:string]:Face} = {}; 
    geometry : THREE.BoxGeometry;

    constructor(from : Vec3, to : Vec3){
        this.from  = from;
        this.to = to;
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    public createFace(type : FaceType, faceInfo : FaceInfo){
        this.faces[type] = new Face(type, faceInfo);
    }

    public getMesh() : THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>{
        const box = new THREE.Mesh(this.geometry, [
            this.faces[FaceType.down].getFacesMaterial(),
            this.faces[FaceType.up].getFacesMaterial(),
            this.faces[FaceType.north].getFacesMaterial(),
            this.faces[FaceType.south].getFacesMaterial(),
            this.faces[FaceType.west].getFacesMaterial(),
            this.faces[FaceType.east].getFacesMaterial(),
        ]);
        return box;
    }
}

export type FaceInfo = {
    folder : string,
    texture : string
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

class Face{

    type : FaceType;
    faceInfo : FaceInfo;
    material : THREE.MeshBasicMaterial;

    constructor(type : FaceType, faceInfo : FaceInfo){
        this.type = type;
        this.faceInfo = faceInfo;
        const loader = new THREE.TextureLoader()
        const texture = loader.load(faceInfo.folder + faceInfo.texture);
        texture.magFilter = THREE.NearestFilter;
        this.material = new THREE.MeshBasicMaterial({
            map: texture
        });
    }

    public getFacesMaterial() : THREE.MeshBasicMaterial{
        return this.material;
    }
}