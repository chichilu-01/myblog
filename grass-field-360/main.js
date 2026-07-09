import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";


import {OrbitControls}
from
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";


// scene

const scene = new THREE.Scene();

scene.fog =
new THREE.Fog(
0x88ccff,
20,
120
);


// camera

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
500
);

camera.position.set(
0,
5,
10
);


// renderer

const renderer =
new THREE.WebGLRenderer({
antialias:true
});


renderer.setSize(
window.innerWidth,
window.innerHeight
);


document.body.appendChild(
renderer.domElement
);


// control

const controls =
new OrbitControls(
camera,
renderer.domElement
);

controls.enableDamping=true;


// sky

scene.background =
new THREE.Color(
0x87ceeb
);


// light

const sun =
new THREE.DirectionalLight(
0xffffff,
2
);

sun.position.set(
10,
20,
10
);

scene.add(sun);


// ground

const ground =
new THREE.Mesh(

new THREE.PlaneGeometry(
200,
200
),

new THREE.MeshLambertMaterial({

color:
0x3fa34d

})

);


ground.rotation.x =
-Math.PI/2;


scene.add(
ground
);



// grass

const grass=[];


for(
let i=0;
i<3000;
i++
){

const geo =
new THREE.ConeGeometry(
0.05,
Math.random()*0.8+0.3,
5
);


const mat =
new THREE.MeshLambertMaterial({

color:
0x228B22

});


const blade =
new THREE.Mesh(
geo,
mat
);


blade.position.set(

(Math.random()-0.5)*100,

0.3,

(Math.random()-0.5)*100

);


blade.rotation.y =
Math.random()*Math.PI;


scene.add(blade);


grass.push(blade);

}



// animation

function animate(){

requestAnimationFrame(
animate
);


// grass wind

const time =
Date.now()*0.002;


grass.forEach(
(g,i)=>{

g.rotation.z =
Math.sin(
time+i
)*0.2;

});



controls.update();


renderer.render(
scene,
camera
);

}


animate();



// resize

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth/
window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);

});