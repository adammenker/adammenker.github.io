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
camera.position.setZ(50);
camera.position.setY(10);

let model: THREE.Group;
const ObjScale: number = 150;

const objLoader = new GLTFLoader();
objLoader.load('../src/models/computerp.glb', (glb) => {
    scene.add(glb.scene);
    console.log(glb);
    model = glb.scene;
    model.position.x = 35
    model.scale.set(ObjScale,ObjScale,ObjScale);
});

const light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1.5);
scene.add(light);

export function animate() {
    requestAnimationFrame(animate);
    model.rotation.y += 0.01;
    renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})