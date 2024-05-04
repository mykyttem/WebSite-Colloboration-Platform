import { JoinToProject } from "../../requests/fetchPageProject";


const joinProject = async (id, setResponseJoin, redirectTo) => { 
    try {
        const responseStatus = await JoinToProject(id);
        setResponseJoin(responseStatus);
    } catch (error) {
        if (error.response && error.response.status === 403) {
            redirectTo("/sign-in");
        } else if (error.response.status === 401) {
            setResponseJoin(error.response.status);
        } else {
            console.error(`Error joining project: ${error}`); 
        }
    }
}


export default joinProject;