import React, { useState } from "react";
import { SignInCheck } from "./fetch";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /> <br />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /> <br />
            <button onClick={() => SignInCheck(email, password)}>Sign in</button>
        </>
    );
};


export default SignIn;