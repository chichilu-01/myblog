import * as THREE from "three";

export class Meteors {

    constructor(scene) {

        this.scene = scene;
        this.meteors = [];

        this.maxMeteors = 25;

        for (let i = 0; i < this.maxMeteors; i++) {
            this.spawnMeteor(true);
        }

    }

    spawnMeteor(first = false) {

        const length = 60 + Math.random() * 120;

        const points = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(-length, length * 0.25, -length * 0.15)
        ];

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        const line = new THREE.Line(geometry, material);

        line.position.set(
            (Math.random() - 0.5) * 2200,
            400 + Math.random() * 600,
            -1200 + Math.random() * 2400
        );

        line.rotation.z = THREE.MathUtils.degToRad(
            -25 - Math.random() * 20
        );

        const meteor = {
            mesh: line,
            speed: 250 + Math.random() * 350,
            life: first
                ? Math.random() * 5
                : 5 + Math.random() * 5
        };

        this.scene.add(line);

        this.meteors.push(meteor);

    }

    resetMeteor(meteor) {

        meteor.mesh.position.set(
            (Math.random() - 0.5) * 2200,
            400 + Math.random() * 600,
            -1200 + Math.random() * 2400
        );

        meteor.speed = 250 + Math.random() * 350;
        meteor.life = 5 + Math.random() * 5;

    }

    update(delta) {

        for (const meteor of this.meteors) {

            meteor.life -= delta;

            meteor.mesh.position.x -= meteor.speed * delta;
            meteor.mesh.position.y -= meteor.speed * 0.35 * delta;
            meteor.mesh.position.z += meteor.speed * 0.12 * delta;

            meteor.mesh.material.opacity =
                Math.max(0.15, meteor.life / 5);

            if (
                meteor.life <= 0 ||
                meteor.mesh.position.x < -1600 ||
                meteor.mesh.position.y < -900
            ) {
                this.resetMeteor(meteor);
            }

        }

    }

}