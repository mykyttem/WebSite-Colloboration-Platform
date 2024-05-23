import React, { useEffect, useState } from "react";
import { getProjects } from "../../requests/fetchProjects" 
import { sortProjectsByDate, sortProjectsByMembers } from "./sort/sortUtils";
import useCustomNavigate from "../../hooks/redirect";
import BarProjects from "./components/barProjects";
import "./styles/projects.css";

const ProjectsPage = () => {
    const redirectTo = useCustomNavigate();
    
    // data about project
    const [projects, setProjects] = useState(null);
    const [sortedByDate, setSortedByDate] = useState(false);
    const [sortedByMembers, setSortedByMembers] = useState(false);
    const [originalProjects, setOriginalProjects] = useState(null);
    
    const fetchProjects = async () => {
        try {
            const dataProjects = await getProjects();

            // Add user_id to each project
            const projectsWithUserId = dataProjects.map(project => ({ ...project, userId: project.user_id }));
            setProjects(projectsWithUserId);
            setOriginalProjects(projectsWithUserId);
        } catch (error) {
            console.error(`Error fetching projects, ${error}`);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const sortProjectsByDateHandler = () => {
        const sortedProjects = sortProjectsByDate(projects, originalProjects, sortedByDate);
        setProjects(sortedProjects);
        setSortedByDate(!sortedByDate);

        // reset
        setSortedByMembers(false); 
    };

    const sortProjectsByMembersHandler = () => {
        const sortedProjects = sortProjectsByMembers(projects, originalProjects, sortedByMembers);
        setProjects(sortedProjects);
        setSortedByMembers(!sortedByMembers);

        // reset
        setSortedByDate(false); 
    };

    const handleClickProject = (id) => {
        redirectTo(`/project/${id}`)
    };

    return (
        <div className="projects-page-bg">
            <BarProjects
                sortDateHandler={sortProjectsByDateHandler} 
                sortMembersHandler={sortProjectsByMembersHandler} 
                sortedByDate={sortedByDate} 
                sortedByMembers={sortedByMembers} 
                fetchProjects={fetchProjects}
            />

            <div className="projects">
                {projects && projects.map(project => (
                    <div key={project.id} className="project" onClick={() => handleClickProject(project.id)}>
                        <div className="project-title">
                            {project.title}
                            <img className="avatar-mini" src={`http://localhost:5000/public-profile/${project.userId}/avatar`} alt={`Avatar of user ${project.userId}`}/>
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
                ))}
            </div>
        </div>
    );
};


export default ProjectsPage;