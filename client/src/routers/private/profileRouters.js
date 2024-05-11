import ProfileUser from "../../pages/profile/ProfileUser";
import CreateProject from "../../pages/profile/projectsUser/CreateProject";
import UpdateProfile from "../../pages/profile/dataUser/UpdateUser";
import CheckAuthRoute from "../checkAuthRouter";
import ProjectsUser from "../../pages/profile/projectsUser/ProjectsUser";


const profileRouters = [
    {
        path: 'profile',
        element: <CheckAuthRoute component={ProfileUser} />,
    },
    {
        path: 'profile/create-project',
        element: <CheckAuthRoute component={CreateProject} />,
    },
    {
        path: 'profile/update',
        element: <CheckAuthRoute component={UpdateProfile} />,
    },
    {
        path: 'profile/projects',
        element: <CheckAuthRoute component={ProjectsUser} />,
    },
    {
        path: 'profile/projects',
        element: <CheckAuthRoute component={ProjectsUser} />,
    },
];


export default profileRouters;