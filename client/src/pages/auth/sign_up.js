import React, { useState } from "react";
import { SaveUser } from "../../requests/fetchAuth"; 
import useCustomNavigate from "../../hooks/redirect";
import "./styles/auth.css";


const SignUp = () => {
    const redirectTo = useCustomNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const urlAvatar = "http://localhost:5000/auth/sign-up/select-avatar";
    
    const handleAvatarClick = (avatarType) => {
        setSelectedAvatar(avatarType);
    };

    const handleSignUp = async () => {
        try {
            await SaveUser(username, email, password, selectedAvatar, formData);
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

            <h2>Choose your first avatar, you can change it in your profile</h2>
            <img 
                src={`${urlAvatar}/cat`} 
                alt="Cat Avatar" 
                className={selectedAvatar === "cat" ? "avatar-image selected" : "avatar-image"}
                onClick={() => handleAvatarClick("cat")}
            />
            <img 
                src={`${urlAvatar}/mouse`}  
                alt="Mouse Avatar" 
                className={selectedAvatar === "mouse" ? "avatar-image selected" : "avatar-image"}
                onClick={() => handleAvatarClick("mouse")}
            />

            <br></br>

            <button onClick={handleSignUp}>Sign up</button>
        </>
    );
};


export default SignUp;