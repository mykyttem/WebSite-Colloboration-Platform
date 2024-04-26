import axios from "axios";


export const SaveProject = async (title, description, members, isActive, categories) => {
    try {
        await axios.post("/profile/create-project", {
            title,
            description,
            members,
            isActive,
            categories
        });
    } catch (error) {
        console.error(`Error save project ${error}`);
    };
};

export const GetProjectsUser = async () => {
    try {
        const respone = await axios.get("/profile/projects");
        return respone.data;
    } catch (error) {
        console.error(`Error getting projects user ${error}`);
    };
};

export const DeleteProjectsUser = async (id_project) => {
    try {
        const respone = await axios.delete(`/profile/delete-projects/${id_project}`);
        return respone.status;
    } catch (error) {   
        console.error(`Error delete projects ${error}`);
    };
}