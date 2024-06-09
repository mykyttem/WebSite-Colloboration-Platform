import React, { useState, useEffect } from "react";
import { UpdatePhoto, UpdateUserData } from "../../../requests/fetchUser";
import useCustomNavigate from "../../../hooks/redirect";
import useFetchUserData from "../../../components/useUserData";
import "../styles/update_profile.css";


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
    const [aboutInput, setAboutInput] = useState("");
    const userAvatar = "http://localhost:5000/profile/avatar";

    useEffect(() => {
        if (userData) {
            setUsernameInput(userData.username || "");
            setEmailInput(userData.email || "");
            setAboutInput(userData.about || "");
        }
    }, [userData]);

    const handleUpdate = async () => {
        setError401(false);
        try {
            const statusCode = await UpdateUserData(
                usernameInput,
                emailInput,
                currentPasswordInput,
                newPasswordInput,
                aboutInput
            );
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


    const handleAvatarClick = () => {
        document.getElementById("avatar-input").click();
    };

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-main">
                <div className="edit-profile-left">
                    <div className="avatar-column" onClick={handleAvatarClick}>
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="avatar-edit"
                            />
                        ) : (
                            <img
                                src={userAvatar}
                                alt="Avatar"
                                className="avatar-edit"
                            />
                        )}
                        <input
                            type="file"
                            id="avatar-input"
                            onChange={handleFileUpload}
                            style={{ display: "none" }}
                        />
                        <button
                            className="done-edit-profile"
                            onClick={handleUpdate}
                        >
                            Done
                        </button>
                    </div>

                    <div className="name-inputs">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={usernameInput}
                                onChange={(e) =>
                                    setUsernameInput(e.target.value)
                                }
                                placeholder="Enter Name"
                            />
                            <label htmlFor="email">Gmail</label>
                            <input
                                type="email"
                                id="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="Example@gmail.com"
                            />
                            <label htmlFor="current-password">
                                Enter New Password
                            </label>
                            <input
                                type="password"
                                id="current-password"
                                value={currentPasswordInput}
                                onChange={(e) =>
                                    setCurrentPasswordInput(e.target.value)
                                }
                                placeholder="Current Password"
                            />
                            <input
                                type="password"
                                id="new-password"
                                value={newPasswordInput}
                                onChange={(e) =>
                                    setNewPasswordInput(e.target.value)
                                }
                                placeholder="New Password"
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-profile-right">
                    <div className="about-container">
                        <label htmlFor="about" className="about-label">
                            About Me
                        </label>
                        <textarea
                            id="about"
                            className="about-input"
                            value={aboutInput}
                            onChange={(e) => setAboutInput(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default UpdateProfile;
