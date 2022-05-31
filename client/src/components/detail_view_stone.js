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

    // LOAD BASE64 FROM DB-----------------------------------------
    React.useEffect(() => {
        fetch("api/loadtexture")
            .then((res) => res.json())
            .then((data) => {
                console.log("DATA CLIENT:", data);
                const { texture_data } = data;
                setTexture(texture_data);
            });
    }, []);

    // SETUP 3D MODEL----------------------------------------------

    const positionStone = [0, 1, 0];
    const colorMaterialStone = "white";
    const rotationStone = [-Math.PI / 2, 0, 0];
    const scaleStone = 2.7;
    const wireframeMaterialStone = false;
    const editmode = false;
    const textureStone = texture; // <-- FILL IN TEXTURE FROM DB

    // ____________________________________________________________
    // RETURN JSX -------------------------------------------------

    return (
        <div className="container">
            <div className="div6">
                <Canvas camera={{ position: [0, 1, 10], fov: 60 }}>
                    <ambientLight intensity={0.1} />
                    <StoneModel
                        position={positionStone}
                        colorMaterialStone={colorMaterialStone}
                        rotationStone={rotationStone}
                        scaleStone={scaleStone}
                        wireframeMaterialStone={wireframeMaterialStone}
                        editmode={editmode}
                    />
                </Canvas>
            </div>
        </div>
    );
}
