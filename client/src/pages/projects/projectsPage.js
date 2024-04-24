import React, { useEffect, useState } from "react";
import { getProjects } from "./fetch";
import SortProjects from "./sort/sortProjects";
import { sortProjectsByDate } from "./sort/sortUtils";


const ProjectsPage = () => {
    const [projects, setProjects] = useState(null);
    const [sorted, setSorted] = useState(false);
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

    const sortProjects = () => {
        const sortedProjects = sortProjectsByDate(projects, originalProjects, sorted);
        setProjects(sortedProjects);
        setSorted(!sorted);
    };

    return (
        <>
            <h1>Projects</h1>
            <SortProjects sortHandler={sortProjects} sorted={sorted} />

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
    );
};


export default ProjectsPage;