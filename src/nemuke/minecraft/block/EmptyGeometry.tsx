import * as THREE from 'three';

const EmptyFace = new THREE.MeshBasicMaterial({ opacity: 0 });
EmptyFace.transparent = true
EmptyFace.depthTest = false

export default EmptyFace;