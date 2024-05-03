import axios from "axios";


export const GetInfoProject = async (id) => {
    try {
        const response = await axios.get(`/project/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error getting info about project ${error}`);
    }
};