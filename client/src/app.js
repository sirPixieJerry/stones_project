// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import React from "react"; // --> specify later!
// import "./css/app.css"; ---> solve later - see index html!
import { Canvas } from "@react-three/fiber";
import * as Drei from "@react-three/drei"; // specify later!
import Editor from "./components/editor";

// ----------------------------------------------------------------
// APP:JS COMPONENT------------------------------------------------
// ----------------------------------------------------------------

export default function App() {
    return (
        <>
            <div>
                <Editor />
            </div>
        </>
    );
}
