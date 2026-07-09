import * as THREE from "three";

export class Nebula {

    constructor(scene) {

        this.scene = scene;
        this.nebulas = [];

        const texture = this.createTexture();

        const colors = [
            0x66ccff,
            0x7b68ee,
            0xff66cc,
            0xffd166,
            0x00ffff
        ];

        for (let i = 0; i < 18; i++) {

            const material = new THREE.SpriteMaterial({
                map: texture,
                color: colors[i % colors.length],
                transparent: true,
                opacity: 0.12,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });

            const sprite = new THREE.Sprite(material);

            const scale = 350 + Math.random() * 500;

            sprite.scale.set(scale, scale, 1);

            sprite.position.set(
                (Math.random() - 0.5) * 2500,
                (Math.random() - 0.5) * 1200,
                (Math.random() - 0.5) * 2500
            );

            sprite.userData = {

                speed: 0.02 + Math.random() * 0.05,

                rotSpeed:
                    (Math.random() - 0.5) * 0.04,

                baseOpacity:
                    0.08 + Math.random() * 0.08

            };

            scene.add(sprite);

            this.nebulas.push(sprite);

        }

    }

    createTexture() {

        const canvas = document.createElement("canvas");

        canvas.width = 512;
        canvas.height = 512;

        const ctx = canvas.getContext("2d");

        const g = ctx.createRadialGradient(
            256,
            256,
            0,
            256,
            256,
            256
        );

        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.15, "rgba(255,255,255,0.6)");
        g.addColorStop(0.4, "rgba(180,180,255,0.2)");
        g.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 512, 512);

        return new THREE.CanvasTexture(canvas);

    }

    update(delta, elapsed) {

        this.nebulas.forEach(sprite => {

            sprite.material.rotation +=
                sprite.userData.rotSpeed * delta;

            sprite.position.x +=
                Math.sin(elapsed * sprite.userData.speed) * 0.08;

            sprite.position.y +=
                Math.cos(elapsed * sprite.userData.speed) * 0.04;

            sprite.material.opacity =
                sprite.userData.baseOpacity +
                Math.sin(elapsed * sprite.userData.speed * 4) * 0.02;

        });

    }

}