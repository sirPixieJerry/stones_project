// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import React from "react"; // --> specify later!
// import "./css/app.css"; ---> solve later - see index html!
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// ----------------------------------------------------------------
// EDITOR.JS COMPONENT---------------------------------------------
// ----------------------------------------------------------------

export default function StoneModel({ canvasRef }) {
    const group = React.useRef();
    const tex = React.useRef();
    useFrame((state) => {
        tex.current.needsUpdate = true;
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
        group.current.rotation.y = Math.sin(t / 4) / 8;
        group.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
        group.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });
    const { nodes } = useGLTF("/rock.gltf");
    return (
        <group ref={group} dispose={null}>
            <mesh
                name="Rock"
                geometry={nodes.Rock18.geometry}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={2.7}
            >
                <meshStandardMaterial
                    attach="material"
                    trasparent
                    color="white"
                    opacity={1}
                >
                    <canvasTexture
                        ref={tex}
                        image={canvasRef.current}
                        attach="map"
                    />
                </meshStandardMaterial>
            </mesh>
        </group>
    );
}
