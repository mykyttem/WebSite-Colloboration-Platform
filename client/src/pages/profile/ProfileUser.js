import React from "react";
import useCustomNavigate from "../../hooks/redirect";
import { logout, deleteAccount} from "../../requests/fetchUser";
import useFetchUserData from "../../components/useUserData"; 


const ProfileUser = () => {
    const redirectTo = useCustomNavigate();
    const userData = useFetchUserData();


    return (
        <div>
            <h1>Profile</h1>

            {userData && (
                <div>
                    <p>ID: {userData.id}</p>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                </div>
            )}

            <button onClick={() => redirectTo("/profile/create-project")}>Create project</button> <br></br>
            <button onClick={() => redirectTo("/profile/projects")}>My projects</button> <br></br>
            <button onClick={() => redirectTo("/profile/update")}>Update</button> <br></br>
            <button onClick={logout}>Log out</button> <br></br>
            <button onClick={deleteAccount}>Delete account</button>
        </div>
    )
}


export default ProfileUser;