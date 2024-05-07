import axios from "axios";


export const SaveUser = async (username, email, password, selectedAvatar) => {
    try {    
        await axios.post("/auth/sign-up", {
            username,
            email,
            password, 
            selectedAvatar, 
        });
    } catch (error) {
        console.error(`Error signing up: ${error}`);
        throw error;
    }
};


export const SignInCheck = async (email, password) => {
    try {
        await axios.post("/auth/sign-in", {
            email,
            password
        });
    } catch (error) {
        console.error(`Error sign in: ${error}`);
  }
};

export const CheckAuth = async () => {
    try {
        const responseCheckAuth = await axios.post("/auth/check-auth");
        return responseCheckAuth;
    } catch (error) {
        console.error(`Error check auth: ${error}`);
        throw error;
    }
};