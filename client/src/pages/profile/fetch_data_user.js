import axios from "axios";


export const get_user_data = async () => {
    try {
        const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const response = await axios.post("/profile", {"user_id": user_id});

        return response.data;
    } catch (error) {
        console.error(`Error getting data user: ${error}`);
        throw error;
    }
};