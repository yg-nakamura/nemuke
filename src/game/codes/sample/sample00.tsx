
import * as THREE from 'three';

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
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();
    function tick() {
        box.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}