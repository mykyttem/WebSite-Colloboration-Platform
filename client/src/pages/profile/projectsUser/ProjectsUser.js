import { useEffect, useState } from "react";
import { GetProjectsUser, DeleteProjectsUser } from "../../../requests/fetchProjectsUser";
import useCustomNavigate from "../../../hooks/redirect";

const ProjectsUser = () => {
    const redirectTo = useCustomNavigate();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataProjects = await GetProjectsUser();
                setProjects(dataProjects.projects);
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
        <div className="projects">
            {projects && projects.map(project => (
                <>
                    <div key={project.id} className="project" onClick={() => redirectTo(`/project/${project.id}`)}>
                        <div className="project-title">
                            {project.title}
                        </div>
                        <div className="post-time">
                            {project.date}
                        </div>
                        <div className="tegs">
                            {project.categories.map(category => (
                                <div className="teg" key={category}>
                                    {category}
                                </div>
                            ))}
                        </div>
                        <div className="description">
                            {project.description}
                        </div>
                        
                        <p>Number of Members: {project.number_of_members}</p>
                        <p>Active: {project.active ? 'Yes' : 'No'}</p>
                    </div>

                    <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                </>
            ))}
        </div>
    );
};


export default ProjectsUser;