import { useEffect, useState } from "react";
import { GetProjectsUser } from "./fetch";

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
        }
        fetchData();
    }, []);

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
                </div>
            ))}
        </>
    )
}


export default ProjectsUser;