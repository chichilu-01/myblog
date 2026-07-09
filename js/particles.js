import * as THREE from "three";

export class Particles {

    constructor(scene) {

        this.scene = scene;
        this.count = 3000;

        this.positions = new Float32Array(this.count * 3);
        this.colors = new Float32Array(this.count * 3);

        this.data = [];

        const color = new THREE.Color();

        for (let i = 0; i < this.count; i++) {

            const radius = 80 + Math.random() * 700;
            const angle = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 120;

            this.data.push({
                radius,
                angle,
                y,
                speed: 0.15 + Math.random() * 0.35,
                fall: 0.3 + Math.random() * 0.7
            });

            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            this.positions[i * 3] = x;
            this.positions[i * 3 + 1] = y;
            this.positions[i * 3 + 2] = z;

            const r = Math.random();

            if (r < 0.25)
                color.set(0xffd166);
            else if (r < 0.5)
                color.set(0xffffff);
            else if (r < 0.75)
                color.set(0x66ccff);
            else
                color.set(0x9b6cff);

            this.colors[i * 3] = color.r;
            this.colors[i * 3 + 1] = color.g;
            this.colors[i * 3 + 2] = color.b;
        }

        this.geometry = new THREE.BufferGeometry();

        this.geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(this.positions, 3)
        );

        this.geometry.setAttribute(
            "color",
            new THREE.BufferAttribute(this.colors, 3)
        );

        this.material = new THREE.PointsMaterial({
            size: 1.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(
            this.geometry,
            this.material
        );

        scene.add(this.points);

    }

    update(delta, elapsed) {

        const pos = this.geometry.attributes.position.array;

        for (let i = 0; i < this.count; i++) {

            const p = this.data[i];

            p.angle += delta * p.speed;
            p.radius -= delta * p.fall * 20;

            if (p.radius < 15) {

                p.radius = 700 + Math.random() * 300;
                p.angle = Math.random() * Math.PI * 2;
                p.y = (Math.random() - 0.5) * 120;

            }

            pos[i * 3] =
                Math.cos(p.angle) * p.radius;

            pos[i * 3 + 1] =
                p.y +
                Math.sin(elapsed * 2 + i) * 0.25;

            pos[i * 3 + 2] =
                Math.sin(p.angle) * p.radius;

        }

        this.geometry.attributes.position.needsUpdate = true;

        this.points.rotation.y += delta * 0.08;

    }

}