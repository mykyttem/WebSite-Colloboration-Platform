import axios from "axios";


export const get_user_data = async () => {
    try {
        const response = await axios.get("/profile");
        return response.data;
    } catch (error) {
        console.error(`Error getting data user: ${error}`);
        throw error;
    }
};


export const SaveProject = async (title, description, members, isActive, categories) => {
    try {
        await axios.post("/profile/create-project", {
            title,
            description,
            members,
            isActive,
            categories
        });
    } catch (error) {
        console.error(`Error save project ${error}`);
    };
};


export const UpdateUserData = async (username, email, currentPassword, newPassword) => {
    try {
        const response = await axios.post("/profile/update", {
            username,
            email,
            currentPassword,
            newPassword
        })
        return response.status;
    } catch (error) {   
        console.error(`Error update user data ${error}`);
        throw error;
    };
};


export const logout = async () => {
    try {
        await axios.post("/profile/log-out");
        window.location.reload();
    } catch (error) {    
        console.log(`Error logouut account ${error}`);
    };
};