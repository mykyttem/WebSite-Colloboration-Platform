import React, { useState } from "react";
import BioInfo from "./components/bioInfo";
import "./styles/auth.css";
import FinishSignUp from "./components/finishSignUp";
import { FaArrowLeft } from "react-icons/fa";


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showBioInfo, setShowBioInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNextButtonClick = () => {
    if (!username || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setErrorMessage("");
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
            <button className="back" onClick={handleBackButtonClick}>
              <FaArrowLeft /> Back
            </button>
          </>
        ) : (
          <>
            <h1 className="title-auth">Get started with CB-Platform ✨</h1>
            <p className="sub-title">Create a free account.</p>

            <input
              type="text"
              placeholder="Username"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="started" onClick={handleNextButtonClick}>
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};


export default SignUp;