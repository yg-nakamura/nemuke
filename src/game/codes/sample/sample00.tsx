
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    camera.position.set(0, 0, 1000);

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    
    const loader = new THREE.TextureLoader()
    const side = getMaterial("stone.png",loader);
    const top = getMaterial("grass_carried.png",loader);



    const box = new THREE.Mesh(geometry, [side,side,side,side,top,side]);
    scene.add(box);


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    tick();
    function tick() {
        // box.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}


function getMaterial(p : string, loader : THREE.TextureLoader) : THREE.MeshBasicMaterial{
    const texture = loader.load("textures/" + p);
    texture.magFilter = THREE.NearestFilter;
    const m = new THREE.MeshBasicMaterial( { 
        map : texture
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