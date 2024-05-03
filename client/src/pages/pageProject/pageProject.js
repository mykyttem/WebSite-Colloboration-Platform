import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetInfoProject } from "../../requests/fetchPageProject";


const InfoProject = () => {
    const { id } = useParams();
    const [infoProject, setInfoProject] = useState(null);

    useEffect(() => {
        const fetchInfoProject = async () => {
            try {
                const infoProject = await GetInfoProject(id);
                setInfoProject(infoProject);
            } catch (error) {
                console.error(`Error fetch info project ${error}`);   
            }
        }
        fetchInfoProject();
    }, [id]);

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
                </div>
            ))}
        </>
    )
} 


export default InfoProject;