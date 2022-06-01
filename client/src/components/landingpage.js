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
    const positionStone = [0, -1, -3];
    const colorMaterialStone = "white";
    const rotationStone = [-Math.PI / 2, 0, 1.6];
    const scaleStone = 5.7;
    const wireframeMaterialStone = false;
    const editmode = false;
    const textureStone = false;

    // ____________________________________________________________
    // RETURN JSX--------------------------------------------------
    return (
        <div className="container">
            <div className="div7">
                <div className="start-stone">
                    <Canvas camera={{ position: [0, 6, 10], fov: 60 }}>
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
                        <Drei.ContactShadows
                            opacity={0.7}
                            scale={10}
                            blur={1}
                            far={17}
                            resolution={256}
                            color="#000000"
                        />
                        <Drei.BakeShadows />
                        <Drei.Environment preset="city" environment="soft" />
                    </Canvas>
                </div>
                <div className="welcome">
                    <h3>{`"We can choose to throw stones, to stumble on them, to climb over them, or to build with them."`}</h3>
                    <p>{`(William Arthur Ward)`}</p>
                </div>
                <Link to="/editor">
                    <button className="start">Claim Stone</button>
                </Link>
            </div>
        </div>
    );
}
