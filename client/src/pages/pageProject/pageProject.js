import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetInfoProject } from "../../requests/fetchPageProject";
import { dataPublicProfileUser } from "../../requests/fetchPublicProfile";
import useCustomNavigate from "../../hooks/redirect";
import joinProject from "./joinLogic";
import "./styles/page_project.css"; 


const InfoProject = () => {
    const { id } = useParams();
    const redirectTo = useCustomNavigate();

    const [infoProject, setInfoProject] = useState(null);
    const [responseJoin, setResponseJoin] = useState(null);
    const [authorData, setAuthorData] = useState(null);
    const pathAvatar = "http://localhost:5000/public-profile/";


    useEffect(() => {
        const fetchInfoProject = async () => {
            try {
                const infoProjectData = await GetInfoProject(id);
                setInfoProject(infoProjectData);

                if (infoProjectData && infoProjectData.length > 0) {
                    const userId = infoProjectData[0].user_id;
                    const data = await dataPublicProfileUser(userId);
                    setAuthorData(data.data);
                }
            } catch (error) {
                console.error(`Error fetching info project: ${error}`);
            }
        };

        fetchInfoProject();
    }, [id]);

    const fetchResponseJoin = () => {
        joinProject(id, setResponseJoin, redirectTo);
    };

    return (
        <>
            {infoProject && infoProject.length > 0 ? (
                infoProject.map((project) => (
                    <div className="project-menu-page" key={project.id}>
                        <div className="project-page">
                            <div className="project-up">
                                <img
                                    src={`${pathAvatar}${project.user_id}/avatar`}
                                    className="avatar-project"
                                    alt="Project Avatar"
                                />
                                <p className="author-name">{authorData ? authorData.username : "Loading..."}</p>
                            </div>
                            <div className="project-name">{project.title}</div>
                            <div className="project-description">
                                <p>{project.description}</p>
                            </div>
                            <div className="project-down">
                                <div className="project-tags">
                                    {project.categories.filter((category) => category).map((category, index) => (
                                        <div className="project-tag" key={index}>
                                            #{category}
                                        </div>
                                    ))}
                                </div>
                                <div className="project-join">
                                    {responseJoin === 200 ? (
                                        <p>Successfully sent request to join the project!</p>
                                    ) : responseJoin === 401 ? (
                                        <p>The user is already a participant in the project</p>
                                    ) : (
                                        <button className="project-join-button" onClick={fetchResponseJoin}>
                                            Join
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="project-bottom">
                                <div className="contact">
                                    <p className="author-name">{authorData ? authorData.email : "Loading..."}</p>
                                </div>
                                <div className="project-post-time">{project.date}</div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading project information...</p>
            )}

        </>
    );
};


export default InfoProject;