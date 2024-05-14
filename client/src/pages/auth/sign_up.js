import React, { useState } from "react";
import BioInfo from "./components/bioInfo"; 
import "./styles/auth.css";
import FinishSignUp from "./components/finishSignUp";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [showBioInfo, setShowBioInfo] = useState(false);

    const handleNextButtonClick = () => {
        setShowBioInfo(true);
    };

    const handleBackButtonClick = () => {
        setShowBioInfo(false); 
    };

    return (
        <div className="main-page-auth">
            <div className="container-auth-sign-up">
                {showBioInfo ? ( 
                    <>
                        <BioInfo 
                            selectedAvatar={selectedAvatar}
                            setSelectedAvatar={setSelectedAvatar}
                        />

                        <FinishSignUp
                            username={username}
                            email={email}
                            password={password}
                            selectedAvatar={selectedAvatar}
                        />

                        <button className="back" onClick={handleBackButtonClick}>Back</button>
                    </>
                ) : (
                    <>
                        <b className="title-auth">Get started with CB-Platform ✨</b>
                        <p className="sub-title">Create a free account.</p>
                    
                        <input
                            type="text"
                            placeholder="Username"
                            className="auth-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /> <br />
                        <input
                            type="email"
                            placeholder="Email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /> <br />
                        <input
                            type="password"
                            placeholder="Password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /> <br />
            
                        <button className="started" onClick={handleNextButtonClick}>Next</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SignUp;
