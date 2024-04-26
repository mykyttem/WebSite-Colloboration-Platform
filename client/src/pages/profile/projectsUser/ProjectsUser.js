import { useEffect, useState } from "react";
import { GetProjectsUser, DeleteProjectsUser } from "../../../requests/fetchProjectsUser";


const ProjectsUser = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataProjects = await GetProjectsUser();
                setProjects(dataProjects);
            } catch (error) {
                console.error(`Error fetching projects user, ${error}`);
            }
        };
        fetchData();
    }, []);

    const handleDeleteProject = async (id) => {
        try {
            await DeleteProjectsUser(id);

            // гpdate the state by removing a project from the array
            setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
        } catch (error) {
            console.error(`Error deleting project, ${error}`);
        }
    };

    return (
        <>
            <h1>Your projects</h1>
            {projects && projects.map(project => (
                <div key={project.id}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <p>Number of Members: {project.number_of_members}</p>
                    <p>Active: {project.active ? 'Yes' : 'No'}</p>
                    <p>Categories: {Object.values(project.categories).filter(category => category)}</p>
                    <p>Date: {project.date}</p>

                    <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                </div>
            ))}
        </>
    );
};


export default ProjectsUser;