import profileRouters from "./private/profileRouters";
import privatePageProject from "./private/projectsRouters";


const privateRouters = [
    ...profileRouters,    
    ...privatePageProject,
];


export default privateRouters;