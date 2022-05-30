// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import React from "react"; // --> specify later! 🚨
// import "./css/app.css"; ---> solve later - see index html! 🚨
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// ----------------------------------------------------------------
// STONE_MODEL.JS COMPONENT----------------------------------------
// ----------------------------------------------------------------

export default function StoneModel({
    canvasRef,
    positionStone,
    colorMaterialStone,
    rotationStone,
    scaleStone,
    wireframeMaterialStone,
}) {
    // MOVE THIS PART TO EDITOR 🚨
    // ASK TEACHERS HOW TO FORWARD REFS FROM CHILD TO PARENT!
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
    // use helper from @react-three/drei to load gltf 3d model
    const { nodes } = useGLTF("./models/rock.gltf");
    return (
        <group ref={group} dispose={null}>
            <mesh
                geometry={nodes.Rock18.geometry}
                rotation={rotationStone} // rotation -> e.g. [-Math.PI / 2, 0, 0]
                scale={scaleStone} // scale -> e.g. 2.7
                position={positionStone} // position -> e.g. [0, 1, 1]
            >
                <meshStandardMaterial
                    attach="material"
                    trasparent
                    wireframe={wireframeMaterialStone} // wireframe -> e.g. true
                    color={colorMaterialStone} // material color -> white
                    opacity={1}
                >
                    <canvasTexture
                        ref={tex} // reference texture
                        image={canvasRef.current} // reference texture -> e.g. canvas
                        attach="map"
                    />
                </meshStandardMaterial>
            </mesh>
        </group>
    );
}
