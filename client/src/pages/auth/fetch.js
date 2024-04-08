import axios from "axios";


export const postUserData = async (username, email, password) => {
    try {
        await axios.post("/auth/sign-up", {
            username,
            email,
            password
        });
    } catch (error) {
        console.error(`Error signing up: ${error}`);
    }
};