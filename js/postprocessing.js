import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import * as THREE from "three";

export class PostProcessing {

    constructor(renderer, scene, camera) {

        this.composer = new EffectComposer(renderer);

        const renderPass = new RenderPass(
            scene,
            camera
        );

        this.composer.addPass(renderPass);

        this.bloom = new UnrealBloomPass(

            new THREE.Vector2(
                window.innerWidth,
                window.innerHeight
            ),

            1.2,   // strength
            0.45,  // radius
            0.82   // threshold

        );

        this.composer.addPass(this.bloom);

        window.addEventListener(
            "resize",
            () => {

                this.composer.setSize(

                    window.innerWidth,
                    window.innerHeight

                );

            }

        );

    }

    render() {

        this.composer.render();

    }

    setBloom(strength) {

        this.bloom.strength = strength;

    }

    setRadius(radius) {

        this.bloom.radius = radius;

    }

    setThreshold(value) {

        this.bloom.threshold = value;

    }

}