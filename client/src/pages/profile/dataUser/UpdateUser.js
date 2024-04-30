import React, { useState, useEffect } from "react";
import { UpdatePhoto, UpdateUserData } from "../../../requests/fetchUser"; 
import useCustomNavigate from "../../../hooks/redirect";
import useFetchUserData from "../../../components/useUserData"; 

/**
 * Update user data
 * Preview avatart before save in DB
*/


const UpdateProfile = () => {
    const redirectTo = useCustomNavigate();
    const userData = useFetchUserData();

    const [error401, setError401] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarPath, setAvatarPath] = useState(null); 

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

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            // Create a FormData object to store the file data
            const formData = new FormData();
            formData.append("file", files[0]);
            
            const file = files[0];

            // Create a preview URL for the file using URL.createObjectURL
            const previewURL = URL.createObjectURL(file);
            setAvatarPreview(previewURL);
            
            try {
                // Send the FormData object containing the file to the server for upload
                const response = await UpdatePhoto(formData);
                setAvatarPath(response.data.avatar_path);
                setAvatarPreview(null);
            } catch (error) {
                console.error("Error uploading file", error);
            }
        }
    };

    return (
        <>
            <h1>Update profile</h1>
            {error401 && <p style={{ color: "red" }}>Password incorrect</p>}

            {userData && (
                <>
                    {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" style={{ width: "100px", height: "100px" }} />}
                    {avatarPath && <img src={avatarPath} alt="Avatar" style={{ width: "100px", height: "100px" }} />}
                    
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
                        type="file"
                        onChange={(e) => handleFileUpload(e)}
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