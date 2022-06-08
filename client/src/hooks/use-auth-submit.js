// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import { useState } from "react";

// ----------------------------------------------------------------
// USEAUTHSUBMIT.JS HOOK-------------------------------------------
// ----------------------------------------------------------------

export default function useAuthSubmit(url, values) {
    // ____________________________________________________________
    // SETUP-------------------------------------------------------

    // STATES OF USESTATEFULFIELDS.JS HOOK-------------------------
    const [err, setErr] = useState();

    // ____________________________________________________________
    // HOOK--------------------------------------------------------
    const handleSubmit = () => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((resp) => resp.json())
            .then(
                (data) => (data.success ? location.replace("/") : setErr(true)) // change later 🚨!
            );
    };
    return [err, handleSubmit];
}
