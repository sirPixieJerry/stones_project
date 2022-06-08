// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./css/app.css"; ---> solve later - see index html!
import Editor from "./components/editor";
import DetailStone from "./components/detail_view_stone";
import Welcome from "./components/landingpage";
import Signup from "./components/signup";
import Signin from "./components/signin";

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
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/signin" element={<Signin />}></Route>
                        <Route path="/editor" element={<Editor />}></Route>
                        <Route path="/detail" element={<DetailStone />}></Route>
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}
