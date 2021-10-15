import * as THREE from 'three';
import { World } from "./minecraft/world/World";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Block from './minecraft/block/Block';
import BlockId from './minecraft/block/BlockId';

export class MScreen {

    width: number = 950;
    height: number = 540;

    canvas: HTMLCanvasElement;

    world: World;

    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;

    constructor(mainCanvas: HTMLCanvasElement) {
        this.world = new World();
        this.canvas = mainCanvas;

        const p = this.init();
        this.renderer = p.renderer;
        this.scene = p.scene;
        this.camera = p.camera;

        console.log(p);

        this.enableAxesHelper();
        this.enableOrbitControls();


        const world = new World()
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                world.renderChunk(this.scene, x, z)
            }
        }

        update();
        function update() {
            p.renderer.render(p.scene, p.camera);
            requestAnimationFrame(update);
        }
    }

    private init(): { scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera } {

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.width, this.height);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, this.width / this.height);
        camera.position.set(15, 15, 15);

        return { scene: scene, renderer: renderer, camera: camera };
    }

    private enableAxesHelper() {
        const axesHelper = new THREE.AxesHelper(2.5);
        this.scene.add(axesHelper);
    }

    private enableOrbitControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.update();
    }


}