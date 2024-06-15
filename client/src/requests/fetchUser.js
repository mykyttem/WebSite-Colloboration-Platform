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


export const UpdateUserData = async (username, email, currentPassword, newPassword, aboutInput, selectedCity) => {
    try {
        const response = await axios.post("/profile/update", {
            username,
            email,
            currentPassword,
            newPassword,
            aboutInput,
            selectedCity
        })
        return response.status;
    } catch (error) {   
        console.error(`Error update user data ${error}`);
        throw error;
    };
};

export const UpdatePhoto = async (formData) => {
    try {
        await axios.post("/profile/upload-photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    } catch (error) {
        console.error(`Error update photo ${error}`);
        throw error;
    };
}

export const logout = async () => {
    try {
        await axios.post("/profile/log-out");
        window.location.reload();
    } catch (error) {    
        console.error(`Error logouut account ${error}`);
        throw error;
    };
};

export const deleteAccount = async () => {
    try {
        await axios.post("/profile/del-account");
        window.location.reload();
    } catch (error) {
        console.error(`Error delete account ${error}`);
        throw error;
    };
}

export const deactivateAccount = async () => {
    try {
        await axios.post("/profile/deactivate-account");
        window.location.reload();
    } catch (error) {
        console.error(`Error deactivate account ${error}`);
    };
}