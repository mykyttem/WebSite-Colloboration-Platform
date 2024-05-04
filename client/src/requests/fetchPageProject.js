import axios from "axios";


export const GetInfoProject = async (id) => {
    try {
        const response = await axios.get(`/project/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error getting info about project ${error}`);
    }
};

export const JoinToProject = async (id) => {
    try {
        const response = await axios.post(`/project/${id}/join`);
        return response.status;
    } catch (error) {
        console.error(`Error join to project ${error}`);
        throw error;
    }
};