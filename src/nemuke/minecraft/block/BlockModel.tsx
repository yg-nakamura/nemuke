
import * as THREE from 'three';
import { MElement } from './MElement';
import { Vec3 } from './Vec3';

export class BlockModel {

    elements: MElement[];

    constructor() {
        this.elements = [];
    }

    protected createElement(from: Vec3, to: Vec3): MElement {
        return new MElement(from, to);
    }

    protected pushElement(element: MElement) {
        this.elements.push(element);
    }

    public getMeshes(pos: Vec3): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>[] {
        const meshes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[]>[] = [];
        for (let element of this.elements) {
            const mesh = element.getMesh();
            mesh.position.set(
                pos.x + 0.5 + (element.from.x / 16) - (16 - element.to.x + element.from.x) / 32,
                pos.y + 0.5 + (element.from.y / 16) - (16 - element.to.y + element.from.y) / 32,
                pos.z + 0.5 + (element.from.z / 16) - (16 - element.to.z + element.from.z) / 32
            );
            meshes.push(mesh);
        }
        return meshes;
    }

    public spawnBlock(pos: Vec3, scene: THREE.Scene) {
        for (let m of this.getMeshes(pos)) {
            scene.add(m)
        }
    }
}







