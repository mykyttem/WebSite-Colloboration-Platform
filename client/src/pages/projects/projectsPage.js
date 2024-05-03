import React, { useEffect, useState } from "react";
import { getProjects } from "../../requests/fetchProjects" 
import SortProjects from "./sort/sortProjects";
import { sortProjectsByDate, sortProjectsByMembers } from "./sort/sortUtils";
import useCustomNavigate from "../../hooks/redirect";


const ProjectsPage = () => {
    const redirectTo = useCustomNavigate();

    const [projects, setProjects] = useState(null);
    const [sortedByDate, setSortedByDate] = useState(false);
    const [sortedByMembers, setSortedByMembers] = useState(false);
    const [originalProjects, setOriginalProjects] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const dataProjects = await getProjects();
                setProjects(dataProjects);
                setOriginalProjects(dataProjects);
            } catch (error) {
                console.error(`Error fetching projects, ${error}`);
            }
        };
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
        <>
            <h1>Projects</h1>
            <SortProjects 
                sortDateHandler={sortProjectsByDateHandler} 
                sortMembersHandler={sortProjectsByMembersHandler} 
                sortedByDate={sortedByDate} 
                sortedByMembers={sortedByMembers} 
            />

            {projects && projects.map(project => (
                <div key={project.id}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <p>Number of Members: {project.number_of_members}</p>
                    <p>Active: {project.active ? 'Yes' : 'No'}</p>
                    <p>Categories: {Object.values(project.categories).filter(category => category)}</p>
                    <p>Date: {project.date}</p>

                    <button onClick={() => handleClickProject(project.id)}>Click</button>
                </div>
            ))}
        </>
    );
};


export default ProjectsPage;