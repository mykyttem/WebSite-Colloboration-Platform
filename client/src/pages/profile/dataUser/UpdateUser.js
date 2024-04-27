import React, { useState, useEffect } from "react";
import { UpdateUserData } from "../../../requests/fetchUser"; 
import useCustomNavigate from "../../../hooks/redirect";
import useFetchUserData from "../../../components/useUserData"; 


const UpdateProfile = () => {
    const redirectTo = useCustomNavigate();
    const userData = useFetchUserData();

    const [error401, setError401] = useState(false);

    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [currentPasswordInput, setCurrentPasswordInput] = useState("");
    const [newPasswordInput, setNewPasswordInput] = useState("");

    useEffect(() => {
        if (userData) {
            setUsernameInput(userData.username || "");
            setEmailInput(userData.email || "");
        }
    }, [userData]);

    const handleUpdate = async () => {
        setError401(false);
        try {
            const statusCode = await UpdateUserData(usernameInput, emailInput, currentPasswordInput, newPasswordInput);
            if (statusCode === 401) {
                redirectTo("/profile");
            } else {
                setError401(true);
            }
        } catch (error) {
            console.error(`Error update user ${error}`);
        }
    };

    return (
        <>
            <h1>Update profile</h1>
            {error401 && <p style={{ color: "red" }}>Password incorrect</p>}

            {userData && (
                <>
                    <input
                        type="text"
                        placeholder="username"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                    /> <br />
                    <input
                        type="email"
                        placeholder="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    /> <br />
                    <input
                        type="password"
                        placeholder="current password"
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    /> <br />
                    <input
                        type="password"
                        placeholder="new password"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                    /> <br />
                </>
            )}

            <button onClick={handleUpdate}>Save changes</button>
        </>
    )
}


export default UpdateProfile;