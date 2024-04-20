import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage"; 
import SignUp from "../pages/auth/sign_up";
import SignIn from "../pages/auth/sign_in";


const publicRouters = [
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
        path: 'not-found',  
        element: <NotFoundPage/>
    },
]


export default publicRouters;