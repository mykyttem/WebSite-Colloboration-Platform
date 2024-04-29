import axios from "axios";


export const dataPublicProfileUser = async (id) => {
    try {
        const response = await axios.get(`/public-profile/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error getting data public profile: ${error}`);
        throw error;
    }
};