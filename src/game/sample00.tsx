
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BlockStone } from '../nemuke/minecraft/block/blocks/BlockStone';
import { BlockTest } from '../nemuke/minecraft/block/blocks/BlockTest';



export default function main(MainCanvas?: HTMLCanvasElement) {
    if (!MainCanvas) return
    init(MainCanvas);
}

function init(MainCanvas: HTMLCanvasElement) {
    const width: number = 950;
    const height: number = 540;

    const renderer = new THREE.WebGLRenderer({ canvas: MainCanvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 5);

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const loader = new THREE.TextureLoader()
    const side = getMaterial("stone.png", loader);
    const top = getMaterial("grass_carried.png", loader);
    const empty = new THREE.MeshBasicMaterial({ opacity: 0 });
    empty.transparent = true
    empty.depthTest = false


    // const box = new THREE.Mesh(geometry, [side, side, empty, empty, side, side]);
    // registerBlocks();
    // const box = getBlock(Block.Stone);

    // box.position.set(0, 0, -1);

    const axesHelper = new THREE.AxesHelper(2.5);
    scene.add(axesHelper);
    // scene.add(box);

    const stone = new BlockStone();
    const test = new BlockTest();

    // stone.renderBlock({ x: 0, y: 0, z: 0 }, scene);
    // stone.renderBlock({ x: 0, y: 0, z: 1 }, scene);
    // test.renderBlock({ x: 0, y: 0, z: 2 }, scene);
    // stone.renderBlock({ x: 0, y: 0, z: 3 }, scene);
    // stone.renderBlock({ x: 0, y: 0, z: 4 }, scene);



    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    tick();
    function tick() {
        // box.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    /*
    tobe
    - Geometryとmaterialは使いまわし
    - 
    */
}


function getMaterial(p: string, loader: THREE.TextureLoader): THREE.MeshBasicMaterial {
    const texture = loader.load("textures/" + p);
    texture.magFilter = THREE.NearestFilter;
    const m = new THREE.MeshBasicMaterial({
        map: texture
    });

    return m;
}

// function loadMinecraftBlockTexture() : THREE.CubeTexture{

//     const cloader = new THREE.TextureLoader();
//     cloader.setPath('textures/');
//     const texture = cloader.load(['grass_carried.png']);
//     // texture.wrapS = THREE.RepeatWrapping;
//     // texture.wrapT = THREE.RepeatWrapping;
//     texture.magFilter = THREE.NearestFilter;
//     return texture
// }