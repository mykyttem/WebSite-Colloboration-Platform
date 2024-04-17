import React, {useEffect, useState} from "react";
import useCustomNavigate from "../../hooks/redirect";
import { get_user_data, UpdateUserData } from "./fetch";


const UpdateProfile = () => {
    const redirectTo = useCustomNavigate();

    const [user_data, set_user_data] = useState(null);
    const [error401, setError401] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const data = await get_user_data();
                set_user_data(data);
                
                setUsername(data.username);
                setEmail(data.email);
            } catch(error) {
                console.error(`Error, ${error}`);
            }
        }
        fetch_data();
    }, []);

    const handleUpdate = async () => {
        setError401(false);
        try {
            const statusCode = await UpdateUserData(username, email, currentPassword, newPassword);
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

            {user_data && (
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
                        placeholder="current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    /> <br />    
                    <input
                        type="password"
                        placeholder="new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    /> <br />    
                </>
            )}

            <button onClick={handleUpdate}>Save changes</button>
        </>
    )
}

export default UpdateProfile;