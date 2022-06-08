// ----------------------------------------------------------------
// IMPORT DEPENDENCIES---------------------------------------------
// ----------------------------------------------------------------

import useStatefulFields from "../hooks/use_stateful_fields";
import useAuthSubmit from "../hooks/use-auth-submit";

// ----------------------------------------------------------------
// SIGNUP.JS COMPONENT---------------------------------------------
// ----------------------------------------------------------------

export default function Signin() {
    // ____________________________________________________________
    // SETUP-------------------------------------------------------

    // STATES OF SIGNUP.JS COMPONENT-------------------------------
    const [values, handleChange] = useStatefulFields();
    const [err, handleSubmit] = useAuthSubmit("/api/signin", values);

    // ____________________________________________________________
    // RETURN JSX--------------------------------------------------

    return (
        <>
            <div>
                {err && <div>Error!</div>}
                <input
                    onChange={handleChange}
                    type="text"
                    className=""
                    name="email"
                    placeholder="Email"
                    required
                />
                <input
                    onChange={handleChange}
                    type="password"
                    className=""
                    name="password"
                    placeholder="Password"
                    required
                />
                <button onClick={handleSubmit}>Signin!</button>
            </div>
        </>
    );
}
