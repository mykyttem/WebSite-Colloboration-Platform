import { useEffect, useState } from "react";
import { GetProjectsUser, DeleteProjectsUser } from "../../../requests/fetchProjectsUser";

const ProjectsUser = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataProjects = await GetProjectsUser();
                setProjects(dataProjects.projects); // Оновлено: dataProjects.projects
            } catch (error) {
                console.error(`Error fetching projects user, ${error}`);
            }
        };
        fetchData();
    }, []);

    const handleDeleteProject = async (id) => {
        try {
            await DeleteProjectsUser(id);
            setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
        } catch (error) {
            console.error(`Error deleting project, ${error}`);
        }
    };

    return (
        <>
            <h1>Your projects</h1>
            {(projects && projects.length === 0) || !projects ? (
                <p>Your not have created projects, or not members</p>
            ) : (
                projects.map(project => (
                    <div key={project.id}>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <p>Number of Members: {project.number_of_members}</p>
                        <p>Members: {project.members}</p>
                        <p>Active: {project.active ? 'Yes' : 'No'}</p>
                        <p>Categories: {Object.values(project.categories).filter(category => category)}</p>
                        <p>Date: {project.date}</p>
                        
                        <h2>Mail box project</h2>
                        <p>Requests to join: {projects.requests_join && projects.requests_join.join(", ")}</p> 
                        
                        <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                    </div>
                ))
            )}
        </>
    );
};


export default ProjectsUser;