import axios from "axios";


export const postUserData = async (username, email, password) => {
    try {
        const response = await axios.post("/auth/user/sign-up", {
            username,
            email,
            password
        });
    } catch (error) {
        console.error(`Error signing up: ${error}`);
    }
};