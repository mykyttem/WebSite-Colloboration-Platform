import axios from "axios";


export const GetDataPrivateProject = async (id) => {
    try {
        const response = await axios.get(`/private-project/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting data project ${error}`);
    };
};