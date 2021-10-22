import * as THREE from 'three';
import { World } from "./minecraft/world/World";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTextureLoader } from './minecraft/block/MTextureLoader';
import Block from './minecraft/block/Block';
import BlockId from './minecraft/block/BlockId';
import testMap from './minecraft/world/TestMap';


export class MScreen {

    width: number = 950;
    height: number = 540;

    canvas: HTMLCanvasElement;

    world: World;

    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;

    mtexture : MTextureLoader;

    constructor(mainCanvas: HTMLCanvasElement, renderInfo: HTMLDivElement | null, mtexture : MTextureLoader) {
  
        this.world = new World();
        this.canvas = mainCanvas;
        this.mtexture = mtexture;

        this.width = mainCanvas.clientWidth;
        this.height = mainCanvas.clientHeight;

        const p = this.init();
        this.renderer = p.renderer;
        this.scene = p.scene;
        this.camera = p.camera;


        this.enableAxesHelper();
        this.enableOrbitControls();

        Block.setMTexture(mtexture);

        const world = new World()


        testMap(world);


        for (let x = 0; x < 1; x++) {
            for (let z = 0; z < 1; z++) {
                world.renderChunk(this.scene, x, z)
            }
        }

        update();

        function update() {
            p.renderer.render(p.scene, p.camera);
            if(renderInfo){
                renderInfo.innerHTML = JSON.stringify(p.renderer.info.render);
            }
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
        scene.background = new THREE.Color(0xbfd1e5);
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

    public translateCameraXZ(x: number, z: number) {
        this.camera.translateX(x);
        // this.camera.translateY(y);
        this.camera.translateZ(z);
    }
}
