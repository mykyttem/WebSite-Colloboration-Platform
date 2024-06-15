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
    const [selectedCity, setSelectedCity] = useState(""); 
    const userAvatar = "http://localhost:5000/profile/avatar";

    useEffect(() => {
        if (userData) {
            setUsernameInput(userData.username || "");
            setEmailInput(userData.email || "");
            setAboutInput(userData.bio || "");
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
                aboutInput,
                selectedCity
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

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-main">
                <div className="edit-profile-left">
                    <div className="avatar-column">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="avatar-edit"
                                onClick={handleAvatarClick}
                            />
                        ) : (
                            <img
                                src={userAvatar}
                                alt="Avatar"
                                className="avatar-edit"
                                onClick={handleAvatarClick}
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

                    {error401 && (
                        <div className="error-message">
                            Unauthorized access. Please check your password.
                        </div>
                    )}

                    <div className="name-inputs">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                placeholder="Enter Name"
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="Example@gmail.com"
                            />
                            <label htmlFor="current-password">Current Password</label>
                            <input
                                type="password"
                                id="current-password"
                                value={currentPasswordInput}
                                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                                placeholder="Current Password"
                            />
                            <label htmlFor="new-password">New Password</label>
                            <input
                                type="password"
                                id="new-password"
                                value={newPasswordInput}
                                onChange={(e) => setNewPasswordInput(e.target.value)}
                                placeholder="New Password"
                            />
                            <label htmlFor="city">Location</label>
                            <select
                                id="city"
                                className="select-city"
                                value={selectedCity}
                                onChange={handleCityChange}
                            >
                                <option value="" disabled>
                                    Select City
                                </option>
                                <option value="Cherkasy">Cherkasy</option>
                                <option value="Chernihiv">Chernihiv</option>
                                <option value="Chernivtsi">Chernivtsi</option>
                                <option value="Dnipropetrovsk">Dnipropetrovsk</option>
                                <option value="Donetsk">Donetsk</option>
                                <option value="Ivano-Frankivsk">Ivano-Frankivsk</option>
                                <option value="Kharkiv">Kharkiv</option>
                                <option value="Kherson">Kherson</option>
                                <option value="Khmelnytskyi">Khmelnytskyi</option>
                                <option value="Kyiv">Kyiv</option>
                                <option value="Kirovohrad">Kirovohrad</option>
                                <option value="Luhansk">Luhansk</option>
                                <option value="Lviv">Lviv</option>
                                <option value="Mykolaiv">Mykolaiv</option>
                                <option value="Odesa">Odesa</option>
                                <option value="Poltava">Poltava</option>
                                <option value="Rivne">Rivne</option>
                                <option value="Sumy">Sumy</option>
                                <option value="Ternopil">Ternopil</option>
                                <option value="Vinnytsia">Vinnytsia</option>
                                <option value="Volyn">Volyn</option>
                                <option value="Zakarpattia">Zakarpattia</option>
                                <option value="Zaporizhzhia">Запоріжжя</option>
                                <option value="Zhytomyr">Житомир</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="edit-profile-right">
                    <div className="about-container">
                        <label htmlFor="about" className="about-label">About Me</label>
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