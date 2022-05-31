// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import React from "react"; // --> specify later! 🚨
// import "./css/editor.css"; ---> solve later - see index html! 🚨
import * as Drei from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import StoneModel from "./stone_model";
import { CirclePicker } from "react-color";
// ----------------------------------------------------------------
// EDITOR.JS COMPONENT---------------------------------------------
// ----------------------------------------------------------------

export default function Editor() {
    // ____________________________________________________________
    // SETUP-------------------------------------------------------

    // STATES OF EDITOR.JS COMPONENT-------------------------------
    const [isPainting, setIsPainting] = React.useState(false);
    const [useColor, setUseColor] = React.useState("black");
    const [brushSize, setBrushSize] = React.useState(5);
    const [error, setError] = React.useState(false);

    // REFERENCES OF EDITOR.JS COMPONENT---------------------------
    const canvasRef = React.useRef(null);
    const contextRef = React.useRef(null);

    // SETUP 3D MODEL----------------------------------------------
    const positionStone = [0, -1, -0.8];
    const colorMaterialStone = "white";
    const rotationStone = [-Math.PI / 2, 0, 0];
    const scaleStone = 2.7;
    const wireframeMaterialStone = false;
    const editmode = true;

    // ____________________________________________________________
    // CANVAS------------------------------------------------------

    // PROPERTIES OF CANVAS ELEMENT -------------------------------
    const canvasWidth = 400;
    const canvasHeight = 300;

    // INITIALISE CANVAS ------------------------------------------
    React.useLayoutEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        contextRef.current = context; // store ctx to contextRef
    }, []);

    // CANVAS CONTROLS --------------------------------------------

    // PAINT FUNCTIONALITY ----------------------------------------
    const startPaint = ({ nativeEvent }) => {
        // use nativeEvent to track mouse movement
        const { offsetX, offsetY } = nativeEvent;
        // setup the style of the pen
        contextRef.current.lineCap = "round";
        contextRef.current.strokeStyle = useColor;
        contextRef.current.lineWidth = brushSize;
        // draw a line
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        // track if user starts painting
        setIsPainting(true);
    };

    const stopPaint = () => {
        contextRef.current.closePath();
        // track if user stops painting
        setIsPainting(false);
    };

    const paint = ({ nativeEvent }) => {
        // if user is NOT painting return
        if (!isPainting) {
            return;
        }
        // else apply paiting to canvas
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    // CHANGE COLOR BY COLORPICKER --------------------------------
    const handleChangeColor = (color) => {
        setUseColor(color.hex);
    };

    // ERASE PAINTING ---------------------------------------------
    const handleNew = () => {
        contextRef.current.fillStyle = "white";
        contextRef.current.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    // FILL PAINTING ----------------------------------------------
    const handleFill = () => {
        contextRef.current.fillStyle = useColor;
        contextRef.current.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    // SUBMIT PAINTING --------------------------------------------
    const submitCanvas = (evt) => {
        evt.preventDefault();
        const data = canvasRef.current.toDataURL();
        fetch("/api/submit/canvas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (!result.success) {
                    setError(true);
                } else {
                    console.log("REDIRECT!");
                    // location.replace();
                }
            });
    };

    // ____________________________________________________________
    // RETURN JSX -------------------------------------------------

    return (
        <div className="container">
            <div className="div1">
                <div className="canvas-frame">
                    {/* render the canvas element */}
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startPaint}
                        onMouseUp={stopPaint}
                        onMouseMove={paint}
                    />
                </div>
            </div>
            <div className="div2">
                {/* render the stone */}
                <Canvas camera={{ position: [0, 1, 10], fov: 60 }}>
                    <ambientLight intensity={0.1} />
                    <StoneModel
                        canvasRef={canvasRef}
                        position={positionStone}
                        colorMaterialStone={colorMaterialStone}
                        rotationStone={rotationStone}
                        scaleStone={scaleStone}
                        wireframeMaterialStone={wireframeMaterialStone}
                        editmode={editmode}
                    />
                    <Drei.BakeShadows />
                    <Drei.Environment preset="city" environment="soft" />
                    <Drei.OrbitControls autoRotate={false} enableZoom={false} />
                </Canvas>
            </div>
            <div className="div3">
                {/* render the colorpicker and brush size */}
                <CirclePicker className="picker" onChange={handleChangeColor} />
                <div className="brush-size-container">
                    <div
                        className="brush-size"
                        style={{
                            width: `${brushSize}px`,
                            height: `${brushSize}px`,
                        }}
                    ></div>
                </div>
            </div>
            <div className="div4">
                {/* render the tools buttons */}
                <div className="buttons">
                    <button onClick={() => setUseColor("white")}>
                        <img src="/images/rubber.png" alt=""></img>
                    </button>
                    <button>
                        <img
                            onClick={handleNew}
                            src="/images/papers.png"
                            alt=""
                        ></img>
                    </button>
                    <button>
                        <img
                            onClick={handleFill}
                            src="/images/paint-bucket.png"
                            alt=""
                        ></img>
                    </button>
                </div>
                <input
                    type="range"
                    min="1"
                    max="30"
                    value={brushSize}
                    onChange={(e) => setBrushSize(e.target.value)}
                    step="1"
                />
            </div>
            <div className="div5">
                {/* render submit button */}
                <button onClick={submitCanvas}>Submit</button>
            </div>
        </div>
    );
}
