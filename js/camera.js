import * as THREE from "three";

export class CameraController {

    constructor(camera) {

        this.camera = camera;

        this.mouse = new THREE.Vector2();
        this.target = new THREE.Vector3(0, 0, 0);

        this.basePosition = new THREE.Vector3(
            0,
            30,
            250
        );

        this.currentPosition = this.basePosition.clone();

        this.time = 0;

        window.addEventListener(
            "mousemove",
            this.onMouseMove.bind(this)
        );

        window.addEventListener(
            "touchmove",
            this.onTouchMove.bind(this),
            { passive: true }
        );

    }

    onMouseMove(event) {

        this.mouse.x =
            (event.clientX / window.innerWidth) * 2 - 1;

        this.mouse.y =
            -(event.clientY / window.innerHeight) * 2 + 1;

    }

    onTouchMove(event) {

        if (!event.touches.length) return;

        const touch = event.touches[0];

        this.mouse.x =
            (touch.clientX / window.innerWidth) * 2 - 1;

        this.mouse.y =
            -(touch.clientY / window.innerHeight) * 2 + 1;

    }

    update(delta) {

        this.time += delta;

        // 自動でゆっくり漂う
        const autoX =
            Math.sin(this.time * 0.15) * 18;

        const autoY =
            Math.cos(this.time * 0.10) * 8;

        const autoZ =
            250 +
            Math.sin(this.time * 0.08) * 20;

        // マウス追従
        const targetX =
            autoX + this.mouse.x * 25;

        const targetY =
            30 + autoY + this.mouse.y * 18;

        const targetZ =
            autoZ;

        this.currentPosition.lerp(

            new THREE.Vector3(
                targetX,
                targetY,
                targetZ
            ),

            0.03

        );

        this.camera.position.copy(
            this.currentPosition
        );

        // 視線を少し揺らす
        this.target.set(

            Math.sin(this.time * 0.4) * 5,

            Math.cos(this.time * 0.3) * 2,

            0

        );

        this.camera.lookAt(this.target);

    }

}