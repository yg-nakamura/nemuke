import * as THREE from 'three';
import { World } from "./minecraft/world/World";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VignetteShader} from "three/examples/jsm/shaders/VignetteShader";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
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
    light: THREE.DirectionalLight;

    mtexture : MTextureLoader;

    constructor(mainCanvas: HTMLCanvasElement, renderInfo: HTMLDivElement | null, mtexture : MTextureLoader) {
        this.world = new World();
        this.canvas = mainCanvas;
        this.mtexture = mtexture;

        Block.setMTexture(mtexture);

        this.width = mainCanvas.clientWidth;
        this.height = mainCanvas.clientHeight;

        const p = this.init();
        this.renderer = p.renderer;
        this.scene = p.scene;
        this.camera = p.camera;
        this.light = p.light;

        let composer = new EffectComposer(this.renderer);

        var vignette = new ShaderPass(VignetteShader);

        console.log(vignette)
        vignette.uniforms.darkness.value = 10;
        vignette.uniforms.offset.value = 0;
        // vignette.uniforms.tDiffuse.value = Block.getTexture();

        let composerRender = new RenderPass(this.scene, this.camera)
        composer.addPass(composerRender);
        composer.addPass(vignette);

        this.enableAxesHelper();
        this.enableOrbitControls();


        const world = new World()


        testMap(world);


        for (let x = -4; x < 4; x++) {
            for (let z = -4 ; z < 4; z++) {
                world.renderChunk(this.scene, x, z)
            }
        }

        update();

        function update() {
            // console.log(p.camera.position);
            // p.renderer.render(p.scene, p.camera);
            composer.render();
            p.light.position.set(p.camera.position.x,p.camera.position.y,p.camera.position.z)
            if(renderInfo){
                renderInfo.innerHTML = JSON.stringify(p.renderer.info.render);
            }
            requestAnimationFrame(update);
        }
    }

    private init(): { scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera , light : THREE.DirectionalLight} {

        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.width, this.height);
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio( window.devicePixelRatio );

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, this.width / this.height);
        camera.position.set(15, 15, 15);
        scene.background = new THREE.Color(0xbfd1e5);
        // scene.fog = new THREE.Fog(0xbfd1e5, 50, 100);



        const directionalLight = new THREE.DirectionalLight(0xffffff,1);

        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height= 2048;

        directionalLight.shadow.camera.right = 15;
        directionalLight.shadow.camera.left = -15;
        directionalLight.shadow.camera.top = 15;
        directionalLight.shadow.camera.bottom = -15;
        scene.add(directionalLight);

        scene.add(new THREE.AmbientLight(0xffffff,0.6));

        // var directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
        // scene.add( directionalLightShadowHelper);
        // var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
        // scene.add( directionalLightHelper);

        return { scene: scene, renderer: renderer, camera: camera, light: directionalLight };
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
