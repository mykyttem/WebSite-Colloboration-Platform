import UnknownPage from "../pages/unknownPage/unknownPage";
import HomePage from "../pages/home/HomePage"; 
import SignUp from "../pages/auth/sign_up";
import SignIn from "../pages/auth/sign_in";
import ProjectsPage from "../pages/projects/projectsPage";
import PublicProfile from "../pages/publicProfile/publicProfile";
import InfoProject from "../pages/pageProject/pageProject";


const publicRouters = [
    {
        path: '/',
        element: <HomePage/>,
        errorElement: <UnknownPage/>
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
        path: 'projects',
        element: <ProjectsPage/>,
    },
    {
        path: 'project/:id',
        element: <InfoProject/>,
    },
    {
        path: 'public-profile/:id',
        element: <PublicProfile/>,
    },
    {
        path: 'not-found',  
        element: <UnknownPage/>
    },
]


export default publicRouters;