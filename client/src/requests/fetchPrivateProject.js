import axios from "axios";


export const GetDataPrivateProject = async (id) => {
    try {
        const response = await axios.get(`/private-project/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting data project ${error}`);
    };
};

export const AcceptUser = async (id, idUser) => {
    try {
        const response = await axios.post(`/private-project/${id}/accept-user/${idUser}`);
        return response.status;
    } catch (error) {
        console.error(`Error accept user to project ${error}`);
    };
} 