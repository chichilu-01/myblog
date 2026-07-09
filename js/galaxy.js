import * as THREE from "three";

export class Galaxy {

    constructor(scene) {

        this.scene = scene;

        this.count = 50000;
        this.radius = 600;

        const positions = new Float32Array(this.count * 3);
        const colors = new Float32Array(this.count * 3);

        const geometry = new THREE.BufferGeometry();

        const color = new THREE.Color();

        const branches = 4;
        const spin = 1.8;

        for (let i = 0; i < this.count; i++) {

            const i3 = i * 3;

            const r = Math.random() * this.radius;

            const branchAngle =
                (i % branches) / branches * Math.PI * 2;

            const spinAngle = r * spin * 0.015;

            const randomX =
                (Math.random() - 0.5) *
                (this.radius - r) * 0.18;

            const randomY =
                (Math.random() - 0.5) *
                (this.radius - r) * 0.08;

            const randomZ =
                (Math.random() - 0.5) *
                (this.radius - r) * 0.18;

            positions[i3] =
                Math.cos(branchAngle + spinAngle) * r + randomX;

            positions[i3 + 1] =
                randomY;

            positions[i3 + 2] =
                Math.sin(branchAngle + spinAngle) * r + randomZ;

            if (r < this.radius * 0.25) {

                color.set(0xffd166);

            } else if (r < this.radius * 0.5) {

                color.set(0x66ccff);

            } else if (r < this.radius * 0.75) {

                color.set(0x7b68ee);

            } else {

                color.set(0xffffff);

            }

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );

        geometry.setAttribute(
            'color',
            new THREE.BufferAttribute(colors, 3)
        );

        const material = new THREE.PointsMaterial({

            size: 2.2,
            transparent: true,
            opacity: 0.9,

            vertexColors: true,

            depthWrite: false,

            blending: THREE.AdditiveBlending

        });

        this.points = new THREE.Points(
            geometry,
            material
        );

        scene.add(this.points);

    }

    update(delta, elapsed) {

        this.points.rotation.y += delta * 0.03;

        this.points.rotation.z =
            Math.sin(elapsed * 0.1) * 0.05;

    }

}