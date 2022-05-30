// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import React from "react"; // --> specify later!
// import "./css/editor.css"; ---> solve later - see index html!
import * as Drei from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// import { StoneModel } from "./components/stone_model";
import { CirclePicker } from "react-color";
// ----------------------------------------------------------------
// EDITOR.JS COMPONENT---------------------------------------------
// ----------------------------------------------------------------

export default function Editor() {
    // ____________________________________________________________
    // SETUP-------------------------------------------------------

    // ____________________________________________________________
    // TEST!-------------------------------------------------------
    function Model({ canvasRef, position }) {
        // const [hovered, hover] = React.useState(false);
        // const [grapped, grap] = React.useState(true);
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
        // document.body.onmousedown = () => grap(true);
        // document.body.onmouseup = () => {
        //     grap(false);
        //     hover(false);
        // };
        const { nodes } = Drei.useGLTF("./models/rock.gltf", true);
        return (
            <group ref={group} dispose={null}>
                <mesh
                    name="Rock"
                    geometry={nodes.Rock18.geometry}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={2.7}
                    position={position}
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
    // ____________________________________________________________
    // TEST!-------------------------------------------------------

    // STATES OF EDITOR.JS COMPONENT-------------------------------
    const [isPainting, setIsPainting] = React.useState(false);
    const [useColor, setUseColor] = React.useState("black");
    const [brushSize, setBrushSize] = React.useState(5);

    // REFERENCES OF EDITOR.JS COMPONENT---------------------------
    const canvasRef = React.useRef(null);
    const contextRef = React.useRef(null);

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
    const handleChangeColor = (color, evt) => {
        setUseColor(color.hex);
    };

    // ERASE PAITING ----------------------------------------------
    const handleNew = () => {
        contextRef.current.fillStyle = "white";
        contextRef.current.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    // FILL PAITING -----------------------------------------------
    const handleFill = () => {
        contextRef.current.fillStyle = useColor;
        contextRef.current.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    // ____________________________________________________________
    // RETURN JSX -------------------------------------------------

    return (
        <div className="container">
            <div className="div1">
                <div className="canvas-frame">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startPaint}
                        onMouseUp={stopPaint}
                        onMouseMove={paint}
                    />
                </div>
            </div>
            <div className="div2">
                <Canvas camera={{ position: [0, 1, 10], fov: 60 }}>
                    <ambientLight intensity={0.1} />
                    <Model canvasRef={canvasRef} position={[0, -1, -0.8]} />
                    <Drei.BakeShadows />
                    <Drei.Environment preset="city" environment="soft" />
                    <Drei.OrbitControls autoRotate={false} enableZoom={false} />
                </Canvas>
            </div>
            <div className="div3">
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
                <button>Submit</button>
                {/* <button onClick={safeImage}></button> */}
            </div>
        </div>
    );
}
