import React, { useState, useEffect } from "react";
import { UpdatePhoto, UpdateUserData } from "../../../requests/fetchUser"; 
import useCustomNavigate from "../../../hooks/redirect";
import useFetchUserData from "../../../components/useUserData"; 
import '../styles/edit_profile.css';


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
            const formData = new FormData();
            formData.append("file", files[0]);
            
            const file = files[0];
            const previewURL = URL.createObjectURL(file);
            setAvatarPreview(previewURL);
            
            try {
                const response = await UpdatePhoto(formData);
                setAvatarPath(response.data.avatar_path);
                setAvatarPreview(null);
            } catch (error) {
                console.error("Error uploading file", error);
            }
        }
    };

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-main">
                <div className="edit-profile-left">
                    <div className="avatar-colum">
                        {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="avatar-edit" style={{ width: "100px", height: "100px" }} />}
                        <button className="done-edit-profile" onClick={handleUpdate}>Done</button>
                    </div>
                    <div className="name-inputs">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter Name" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                            <label htmlFor="email">Gmail</label>
                            <input type="email" id="email" placeholder="Example@gmail.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                            <label htmlFor="new-password">Enter New Password</label>
                            <input type="password" id="current-password" placeholder="Current Password" value={currentPasswordInput} onChange={(e) => setCurrentPasswordInput(e.target.value)} />
                            <input type="password" id="new-password" placeholder="New Password" value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} />
                            <label htmlFor="work-experience">Work Experience</label>
                            <input type="text" id="work-experience" />
                            
                            <input type="file" onChange={handleFileUpload} />
                        </div>
                    </div>                
                </div>
                <div className="edit-profile-right">
                    <div className="about-container">
                        <label htmlFor="about" className="about-label">About Me</label>
                        <textarea id="about" className="about-input"></textarea>
                    </div>
                </div>
            </div>
          
            {error401 && <p style={{ color: "red" }}>Password incorrect</p>}
        </div>
    );
}


export default UpdateProfile;
