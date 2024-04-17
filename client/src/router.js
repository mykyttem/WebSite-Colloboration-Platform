import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage"; 
import SignUp from "./pages/auth/sign_up";
import SignIn from "./pages/auth/sign_in";
import ProfileUser from "./pages/profile/ProfileUser";
import CreateProject from "./pages/profile/CreateProject";
import UpdateProfile from "./pages/profile/UpdateUser";


const Router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
        errorElement: <NotFoundPage/>
    },
    {
        path: 'sign-up',  
        element: <SignUp/>,
    },
    {
        path: 'sign-in',  
        element: <SignIn/>,
    },
    {
        path: 'profile',  
        element: <ProfileUser/>,
    },
    {
        path: 'profile/create-project',  
        element: <CreateProject/>,
    },
    {
        path: 'profile/update',  
        element: <UpdateProfile/>,
    },
    {
        path: 'not-found',  
        element: <NotFoundPage/>
    },
    {
        path: '*',
        element: <Navigate to='not-found' replace />
    }
]);


export default Router;