import { useEffect, useState } from "react";
import { get_user_data } from "./fetch";


const useFetchUserData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get_user_data();
                setUserData(data);
            } catch(error) {
                console.error(`Error fetching user data, ${error}`);
            }
        }
        fetchData();
    }, []);

    return userData;
}


export default useFetchUserData;