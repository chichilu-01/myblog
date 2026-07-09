import * as THREE from "three";

export class Stars {

    constructor(scene) {

        this.scene = scene;

        this.count = 10000;
        this.radius = 2500;

        this.positions = new Float32Array(this.count * 3);
        this.colors = new Float32Array(this.count * 3);
        this.sizes = new Float32Array(this.count);

        const color = new THREE.Color();

        for (let i = 0; i < this.count; i++) {

            const r = this.radius * Math.sqrt(Math.random());
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = (Math.random() - 0.5) * this.radius * 2;

            this.positions[i * 3] = x;
            this.positions[i * 3 + 1] = y;
            this.positions[i * 3 + 2] = z;

            const t = Math.random();

            if (t < 0.25) {
                color.set(0xffffff);
            } else if (t < 0.5) {
                color.set(0xfff3b0);
            } else if (t < 0.75) {
                color.set(0x8fd3ff);
            } else {
                color.set(0xcaa8ff);
            }

            this.colors[i * 3] = color.r;
            this.colors[i * 3 + 1] = color.g;
            this.colors[i * 3 + 2] = color.b;

            this.sizes[i] = 1 + Math.random() * 3;
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

        const texture = this.createStarTexture();

        this.material = new THREE.PointsMaterial({
            size: 2,
            map: texture,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            sizeAttenuation: true
        });

        this.points = new THREE.Points(
            this.geometry,
            this.material
        );

        scene.add(this.points);

    }

    createStarTexture() {

        const canvas = document.createElement("canvas");

        canvas.width = 64;
        canvas.height = 64;

        const ctx = canvas.getContext("2d");

        const gradient = ctx.createRadialGradient(
            32,
            32,
            0,
            32,
            32,
            32
        );

        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.2, "#ffffff");
        gradient.addColorStop(0.4, "#ffe8a0");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        return texture;
    }

    update(delta, elapsed) {

        const pos = this.geometry.attributes.position.array;

        for (let i = 0; i < this.count; i++) {

            pos[i * 3 + 2] += 20 * delta;

            if (pos[i * 3 + 2] > 1500) {

                pos[i * 3 + 2] = -2500;

            }

        }

        this.geometry.attributes.position.needsUpdate = true;

        this.points.rotation.y += delta * 0.01;
        this.points.rotation.x =
            Math.sin(elapsed * 0.05) * 0.03;

        this.material.opacity =
            0.9 + Math.sin(elapsed * 2.0) * 0.05;

    }

}