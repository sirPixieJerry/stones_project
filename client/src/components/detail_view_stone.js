// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import React from "react"; // --> specify later! 🚨
import * as Drei from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import StoneModel from "./stone_model";

// ----------------------------------------------------------------
// DETAIL_VIEW_STONE.JS COMPONENT----------------------------------
// ----------------------------------------------------------------

export default function DetailStone() {
    // ____________________________________________________________
    // SETUP-------------------------------------------------------

    // STATES OF DETAIL_VIEW_STONE.JS COMPONENT--------------------
    const [texture, setTexture] = React.useState(false);

    // SETUP 3D MODEL----------------------------------------------

    const positionStone = [0, 1, 0];
    const colorMaterialStone = "white";
    const rotationStone = [-Math.PI / 2, 0, 0]; // -Math.PI / 2, 0, 0
    const scaleStone = 2.7;
    const wireframeMaterialStone = false;
    const editmode = false;
    const textureStone = texture;

    // LOAD BASE64 FROM DB-----------------------------------------
    React.useEffect(() => {
        // console.log("REQ TO SERVER!");
        fetch("/api/load/texture")
            .then((res) => res.json())
            .then((data) => {
                // console.log("DATA CLIENT:", data);
                const { texture_data } = data;
                setTexture(texture_data);
            });
    }, []);

    // ____________________________________________________________
    // RETURN JSX -------------------------------------------------

    return (
        <div className="container">
            <div className="div6">
                {texture && (
                    <Canvas camera={{ position: [0, 1, 10], fov: 60 }}>
                        <ambientLight intensity={0.1} />
                        <StoneModel
                            position={positionStone}
                            colorMaterialStone={colorMaterialStone}
                            rotationStone={rotationStone}
                            scaleStone={scaleStone}
                            wireframeMaterialStone={wireframeMaterialStone}
                            editmode={editmode}
                            textureStone={textureStone}
                        />
                        <Drei.BakeShadows />
                        <Drei.Environment preset="city" environment="soft" />
                        <Drei.OrbitControls
                            autoRotate={true}
                            enableZoom={false}
                        />
                    </Canvas>
                )}
            </div>
            <div className="div8">
                <h3>Special Thanks To:</h3>
                <p>David Friedman</p>
                <p>Johannes Kronmüller</p>
                <p>Diego Caponera</p>
                <p>Merle Fischer</p>
                <p>Peter Anderson</p>
                <p>Oliver Sieweke</p>
                <p>Alistair Quinn</p>
                <p>Andrea Arias</p>
                <p>SPICED ACADEMY</p>
            </div>
        </div>
    );
}
