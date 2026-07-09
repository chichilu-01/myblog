import * as THREE from "three";

export class BlackHole {

    constructor(scene) {

        this.group = new THREE.Group();

        // ブラックホール本体
        const coreGeometry = new THREE.SphereGeometry(18, 64, 64);

        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000
        });

        this.core = new THREE.Mesh(coreGeometry, coreMaterial);
        this.group.add(this.core);

        // 発光リング
        const ringGeometry = new THREE.TorusGeometry(
            34,
            4,
            32,
            180
        );

        const ringMaterial = new THREE.MeshBasicMaterial({

            color: 0xffc857,

            transparent: true,

            opacity: 0.95,

            blending: THREE.AdditiveBlending

        });

        this.ring = new THREE.Mesh(
            ringGeometry,
            ringMaterial
        );

        this.ring.rotation.x = Math.PI / 2.8;

        this.group.add(this.ring);

        // 外側リング
        const outerGeometry = new THREE.TorusGeometry(
            55,
            2,
            16,
            220
        );

        const outerMaterial = new THREE.MeshBasicMaterial({

            color: 0x66ccff,

            transparent: true,

            opacity: 0.25,

            blending: THREE.AdditiveBlending

        });

        this.outerRing = new THREE.Mesh(
            outerGeometry,
            outerMaterial
        );

        this.outerRing.rotation.x = Math.PI / 2.5;

        this.group.add(this.outerRing);

        // オーラ
        const auraGeometry = new THREE.SphereGeometry(
            70,
            48,
            48
        );

        const auraMaterial = new THREE.MeshBasicMaterial({

            color: 0xffd166,

            transparent: true,

            opacity: 0.05,

            side: THREE.BackSide,

            blending: THREE.AdditiveBlending

        });

        this.aura = new THREE.Mesh(
            auraGeometry,
            auraMaterial
        );

        this.group.add(this.aura);

        // ライト
        const light = new THREE.PointLight(
            0xffc857,
            4,
            500
        );

        this.group.add(light);

        scene.add(this.group);

    }

    update(delta, elapsed) {

        // リング回転
        this.ring.rotation.z += delta * 1.5;

        this.outerRing.rotation.z -= delta * 0.6;

        // オーラ鼓動
        const scale =
            1 +
            Math.sin(elapsed * 2.5) * 0.04;

        this.aura.scale.set(
            scale,
            scale,
            scale
        );

        // 光の強弱
        this.ring.material.opacity =
            0.8 +
            Math.sin(elapsed * 4.0) * 0.15;

        this.outerRing.material.opacity =
            0.2 +
            Math.sin(elapsed * 2.2) * 0.08;

        // ゆっくり全体回転
        this.group.rotation.y += delta * 0.1;

    }

}