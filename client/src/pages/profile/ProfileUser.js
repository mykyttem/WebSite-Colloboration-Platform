import React from "react";
import useCustomNavigate from "../../hooks/redirect";
import { logout, deleteAccount, deactivateAccount} from "../../requests/fetchUser";
import useFetchUserData from "../../components/useUserData"; 


const ProfileUser = () => {
    const redirectTo = useCustomNavigate();
    const userData = useFetchUserData();    
    const userAvatar = "http://localhost:5000/profile/avatar";


    return (
        <div>
            <h1>Profile</h1>

            {userData && (
                <div>
                    <p>ID: {userData.id}</p>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    
                    <img src={userAvatar} alt="User Avatar" style={{ width: "100px", height: "100px" }}/>
                </div>
            )}

            <button onClick={() => redirectTo("/profile/create-project")}>Create project</button> <br></br>
            <button onClick={() => redirectTo("/profile/projects")}>My projects</button> <br></br>
            <button onClick={() => redirectTo("/profile/update")}>Update</button> <br></br>
            <button onClick={logout}>Log out</button> <br></br>
            <button onClick={deleteAccount}>Delete account</button> <br></br>
            <button onClick={deactivateAccount}>Deactivate account</button>
        </div>
    )
}


export default ProfileUser;