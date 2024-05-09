import axios from "axios";


export const dataPublicProfileUser = async (id) => {
    try {
        const response = await axios.get(`/public-profile/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(`Error getting data public profile: ${error}`);
        throw error;
    }
};