import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: <HTMLCanvasElement> document.querySelector('#main__canvas'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
camera.position.setZ(30);

let knot: THREE.Group;
const ObjScale: number = 0.04;

const objLoader = new GLTFLoader();
objLoader.load('../src/models/knot.glb', (glb) => {
    scene.add(glb.scene);
    knot = glb.scene;
    knot.position.y = -8
    knot.position.x = 25
    knot.scale.set(ObjScale,ObjScale,ObjScale);
});

const light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1.5);
scene.add(light);

export function animate() {
    requestAnimationFrame(animate);
    knot.rotation.y += 0.01;
    renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})