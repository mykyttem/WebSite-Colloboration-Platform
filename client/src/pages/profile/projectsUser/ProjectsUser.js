import { useEffect, useState } from "react";
import { GetProjectsUser, DeleteProjectsUser, LoguoutProjects } from "../../../requests/fetchProjectsUser";
import useCustomNavigate from "../../../hooks/redirect";
import "../styles/profile.css";


const ProjectsUser = () => {
    const redirectTo = useCustomNavigate();

    const [projects, setProjects] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

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
            setModalVisible(false);
        } catch (error) {
            console.error(`Error deleting project, ${error}`);
        }
    };

    const handleRightClick = (event, project) => {
        event.preventDefault();
        setSelectedProject(project);

        const projectRect = event.currentTarget.getBoundingClientRect();
        const modalWidth = 200; 
        const modalHeight = 100; 

        let x = event.clientX - projectRect.left;
        let y = event.clientY - projectRect.top;

        if (x + modalWidth > projectRect.width) {
            x = projectRect.width - modalWidth;
        }
        if (y + modalHeight > projectRect.height) {
            y = projectRect.height - modalHeight;
        }

        setModalPosition({ x, y });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleExitProject = async (id) => {
        try {
            await LoguoutProjects(id);
            setModalVisible(false);
        } catch (error) {
            console.error(`Error exiting project, ${error}`);
        }
    };

    const handleDoubleClickRight = (event) => {
        event.preventDefault();
        closeModal();
    };

    return (
        <div className="projects">
            {projects && projects.map(project => (
                <div 
                    key={project.id} 
                    className="project" 
                    onClick={() => redirectTo(`/project/${project.id}`)}
                    onContextMenu={(e) => handleRightClick(e, project)}
                    onDoubleClick={handleDoubleClickRight}
                    style={{ position: 'relative' }}
                >
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
                    {modalVisible && selectedProject && selectedProject.id === project.id && (
                        <div 
                            className="modal" 
                            style={{ top: modalPosition.y, left: modalPosition.x }}
                        >
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(selectedProject.id); }}>Delete</button>
                            <button onClick={(e) => { e.stopPropagation(); handleExitProject(selectedProject.id); }}>Exit</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


export default ProjectsUser;