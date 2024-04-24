import axios from "axios";


export const getProjects = async () => {
    try {
        const response = await axios.get("/projects");
        return response.data;
    } catch (error) {
        console.error(`Error getting projects: ${error}`);
    }
};