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