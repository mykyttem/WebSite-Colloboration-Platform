import React, {useEffect, useState} from "react";
import { get_user_data } from "./fetch";
import useCustomNavigate from "../../hooks/redirect";


const ProfileUser = () => {
    const redirectTo = useCustomNavigate();

    const [user_data, set_user_data] = useState(null);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const data = await get_user_data();
                set_user_data(data);
            } catch(error) {
                console.error(`Error, ${error}`);
            }
        }
        fetch_data();
    }, []);

    const ButtonCreateProject = () => {
        redirectTo("/profile/create-project");
    };

    const ButtonUpdate = () => {
        redirectTo("/profile/update");
    };

    return (
        <div>
            <h1>Profile</h1>

            {user_data && (
                <div>
                    <p>ID: {user_data.id}</p>
                    <p>Username: {user_data.username}</p>
                    <p>Email: {user_data.email}</p>
                </div>
            )}

            <button onClick={ButtonCreateProject}>Create project</button> <br></br>
            <button onClick={ButtonUpdate}>Update</button>
        </div>
    )
}


export default ProfileUser;