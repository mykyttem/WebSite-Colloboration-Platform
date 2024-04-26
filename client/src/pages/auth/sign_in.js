import React, { useState } from "react";
import { SignInCheck } from "../../requests/fetchAuth";
import useCustomNavigate from "../../hooks/redirect";


const SignIn = () => {
    const redirectTo = useCustomNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            await SignInCheck(email, password);
            redirectTo("/profile");
        } catch (error) {
            console.error(`Error signing in: ${error}`);
        }
    };

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
            <button onClick={handleSignIn}>Sign in</button>
        </>
    );
};


export default SignIn;