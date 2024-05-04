import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetInfoProject } from "../../requests/fetchPageProject";
import useCustomNavigate from "../../hooks/redirect";
import joinProject from "./joinLogic";


const InfoProject = () => {
    const redirectTo = useCustomNavigate();

    const { id } = useParams();
    const [infoProject, setInfoProject] = useState(null);
    const [responseJoin, setResponseJoin] = useState(null);

    useEffect(() => {
        const fetchInfoProject = async () => {
            try {
                const infoProjectData = await GetInfoProject(id);
                setInfoProject(infoProjectData);
            } catch (error) {
                console.error(`Error fetching info project: ${error}`);   
            }
        }
        fetchInfoProject();
    }, [id]);

    const fetchResponseJoin = () => {
        joinProject(id, setResponseJoin, redirectTo);
    }
    
    return (
        <>
            {infoProject && infoProject.map(infoProject => (
                <div key={infoProject.id}>
                    <h2>{infoProject.title}</h2>
                    <p>{infoProject.description}</p>
                    <p>Number of Members: {infoProject.number_of_members}</p>
                    <p>Active: {infoProject.active ? 'Yes' : 'No'}</p>
                    <p>Categories: {Object.values(infoProject.categories).filter(category => category)}</p>
                    <p>Date: {infoProject.date}</p>
                    
                    {responseJoin === 200 ? (
                        <p>Successfully sent request to join the project!</p>
                    ) : responseJoin === 401 ? (
                        <p>The user is already a participant in the project</p>
                    ) : (
                        <button onClick={fetchResponseJoin}>Join</button>
                    )}
                </div>
            ))}
        </>
    )
}


export default InfoProject;