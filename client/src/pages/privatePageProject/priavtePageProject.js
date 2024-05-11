import { useParams } from "react-router-dom";
import { GetDataPrivateProject } from "../../requests/fetchPrivateProject";
import { useEffect, useState } from "react";
import InfoPrivateProject from "./data/infoProject";
import RequestsJoin from "./data/mailBox/requestsJoin";

const PrivatePageProject = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [requestsJoin, setRequestsJoin] = useState(null);
    const [displayMode, setDisplayMode] = useState("info");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataProjects = await GetDataPrivateProject(id);
                setProject(dataProjects.project);
                setRequestsJoin(dataProjects.requests_join);
            } catch (error) {
                console.error(`Error fetching projects user, ${error}`);
            }
        };
        fetchData();
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    const handleInfoButtonClick = () => {
        setDisplayMode("info");
    };

    const handleMailboxButtonClick = () => {
        setDisplayMode("mailbox"); 
    };

    return (
        <>
            <button onClick={handleInfoButtonClick}>Info project</button>
            <button onClick={handleMailboxButtonClick}>Mail box</button>

            {displayMode === "info" && (
                <InfoPrivateProject
                    project={project}
                />
            )}
            {displayMode === "mailbox" && (
                <RequestsJoin
                    requestsJoin={requestsJoin}
                    id={id}
                />
            )}
        </>
    );
};


export default PrivatePageProject;