import axios from "axios";


export const SaveUser = async (username, email, password) => {
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