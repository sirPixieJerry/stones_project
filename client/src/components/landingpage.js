// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import React from "react"; // --> specify later! 🚨
import { Link, BrowserRouter, Routes } from "react-router-dom";
import * as Drei from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import StoneModel from "./stone_model";

// ----------------------------------------------------------------
// LANDINGPAGE.JS COMPONENT----------------------------------------
// ----------------------------------------------------------------

export default function Welcome() {
    // ____________________________________________________________
    // SETUP-------------------------------------------------------

    // SETUP 3D MODEL----------------------------------------------
    const positionStone = [0, -1, -0.8];
    const colorMaterialStone = "lightgray";
    const rotationStone = [-Math.PI / 2, 0, 3];
    const scaleStone = 4.8;
    const wireframeMaterialStone = true;
    const editmode = false;
    const textureStone = false;

    // ____________________________________________________________
    // RETURN JSX--------------------------------------------------
    return (
        <div className="container">
            <div className="div7">
                <div className="welcome">
                    <h3>{`"We can choose to throw stones, to stumble on them, to climb over them, or to build with them."`}</h3>
                    <p>{`(William Arthur Ward)`}</p>
                </div>

                <div>
                    <Canvas camera={{ position: [0, 1, 10], fov: 60 }}>
                        <ambientLight intensity={0.1} />
                        <StoneModel
                            canvasRef={false}
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
                    </Canvas>
                </div>
                <button className="start">Start</button>
            </div>
        </div>
    );
}
