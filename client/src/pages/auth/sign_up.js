import React, { useState } from "react";
import { SaveUser } from "../../requests/fetchAuth"; 
import useCustomNavigate from "../../hooks/redirect";


const SignUp = () => {
    const redirectTo = useCustomNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await SaveUser(username, email, password);
            redirectTo("/sign-in");
        } catch (error) {
            console.error(`Error signing up: ${error}`);
        }
    };


    return (
        <>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> <br />
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
            <button onClick={handleSignUp}>Sign up</button>
        </>
    );
};


export default SignUp;