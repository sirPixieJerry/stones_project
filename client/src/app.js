// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./css/app.css"; ---> solve later - see index html!
import Editor from "./components/editor";
import DetailStone from "./components/detail_view_stone";

// ----------------------------------------------------------------
// APP:JS COMPONENT------------------------------------------------
// ----------------------------------------------------------------

export default function App() {
    // ____________________________________________________________
    // SETUP-------------------------------------------------------

    // SETUP 3D MODEL----------------------------------------------

    // ____________________________________________________________
    // RETURN JSX--------------------------------------------------
    return (
        <>
            <div className="background"></div>
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Editor />}></Route>
                        <Route path="/detail" element={<DetailStone />}></Route>
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}
