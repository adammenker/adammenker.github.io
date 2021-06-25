import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: <HTMLCanvasElement> document.querySelector('#main__canvas'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

let knot: THREE.Group;

const objLoader = new GLTFLoader();
objLoader.load('../src/models/knot.glb', (glb) => {
    scene.add(glb.scene);
    knot = glb.scene;
    knot.scale.set(0.03,0.03,0.03);
});


const light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1.5);
scene.add(light);

const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});

export function animate() {
    requestAnimationFrame(animate);
    knot.rotation.y += 0.05;

    renderer.render(scene, camera);
}