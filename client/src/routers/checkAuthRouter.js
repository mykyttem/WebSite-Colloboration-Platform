import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CheckAuth } from "../requests/fetchAuth";


const CheckAuthRoute = ({component: Component, ...rest }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCheckAuth = await CheckAuth();
                if (responseCheckAuth.status === 200) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
                setAuthChecked(true);
            } catch (error) {
                console.error("Error checking authentication:", error);
                setLoggedIn(false);
                setAuthChecked(true);
            }
        };
        fetchData();
    }, []); 
    
    if (!authChecked) {
        return null;
    }

    if (!loggedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <Component {...rest}/>
    );
};


export default CheckAuthRoute;