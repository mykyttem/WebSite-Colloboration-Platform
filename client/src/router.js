import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage"; 
import SignUp from "./pages/auth/sign_up";
import SignIn from "./pages/auth/sign_in";


const Router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
        errorElement: <NotFoundPage/>
    },
    {
        path: '/sign-up',  
        element: <SignUp/>,
    },
    {
        path: '/sign-in',  
        element: <SignIn/>,
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