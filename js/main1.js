import * as THREE from "three";

import { Stars } from "./stars.js";
import { Galaxy } from "./galaxy.js";
import { Nebula } from "./nebula.js";
import { BlackHole } from "./blackhole.js";
import { Meteors } from "./meteor.js";
import { Particles } from "./particles.js";
import { CameraController } from "./camera.js";
import { PostProcessing } from "./postprocessing.js";

// ==========================================
// Scene
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010105);

// ==========================================
// Camera
// ==========================================
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

camera.position.set(0, 20, 120);
camera.lookAt(0, 0, 0);

// ==========================================
// Renderer
// ==========================================
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

renderer.domElement.style.position = "fixed";
renderer.domElement.style.left = "0";
renderer.domElement.style.top = "0";
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = "0";

document.body.prepend(renderer.domElement);

// ==========================================
// Lights
// ==========================================
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(200, 300, 100);
scene.add(sun);

// ==========================================
// Objects
// ==========================================
const stars = new Stars(scene);
const galaxy = new Galaxy(scene);
const nebula = new Nebula(scene);
const blackHole = new BlackHole(scene);
const meteors = new Meteors(scene);
const particles = new Particles(scene);

const cameraController = new CameraController(camera);

// ==========================================
// Post Processing
// ==========================================
const post = new PostProcessing(
    renderer,
    scene,
    camera
);

// ==========================================
// Clock
// ==========================================
const clock = new THREE.Clock();

// ==========================================
// Resize
// ==========================================
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    post.composer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

// ==========================================
// Animation
// ==========================================
renderer.setAnimationLoop(() => {

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    stars.update(delta, elapsed);
    galaxy.update(delta, elapsed);
    nebula.update(delta, elapsed);
    blackHole.update(delta, elapsed);
    meteors.update(delta, elapsed);
    particles.update(delta, elapsed);

    cameraController.update(delta);

    post.render();

});