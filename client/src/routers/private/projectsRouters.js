import PrivatePageProject from "../../pages/privatePageProject/priavtePageProject"
import CheckAuthRoute from "../checkAuthRouter";


const privatePageProject = [
    {
        path: 'private-project/:id',
        element: <CheckAuthRoute component={PrivatePageProject}/>
    },
]


export default privatePageProject;