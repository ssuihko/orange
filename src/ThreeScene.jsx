import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {

    const mountRef = useRef(null);

    useEffect(() => {

        const container = mountRef.current;
        if (!container) return;

        container.innerHTML = "";

        const scene = new THREE.Scene();

        scene.background = new THREE.Color(0xeeeeee);
        
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // cube 
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x0077ff })
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [])

    return <div ref={mountRef} style={{ width: "600px", height: "400px" }} />;
}