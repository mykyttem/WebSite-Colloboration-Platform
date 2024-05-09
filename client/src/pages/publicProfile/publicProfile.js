import { useEffect, useState } from "react";
import { dataPublicProfileUser } from "../../requests/fetchPublicProfile";
import { useParams } from "react-router-dom";


const PublicProfile = () => {
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const avatar = `http://localhost:5000/public-profile/${id}/avatar`;

    useEffect(() => {
        const fetchDataProfile = async () => {
            try {
                const data = await dataPublicProfileUser(id);
                setProfileData(data.data);   
            } catch (error) {
                console.error(`Error fetch data profile ${error}`);
            }
        }
        fetchDataProfile();
    }, [id]);


    return (
        <div>
            {profileData ? (
                <>
                    <h1>{profileData.username}</h1>
                    <p>Email: {profileData.email}</p>
                    <img src={avatar} alt="avatar" style={{ width: "100px", height: "100px" }}/>
                    <h2>Projects:</h2>
                    <ul>
                        {profileData.projects.map(project => (
                            <li key={project.id}>
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                                <p>Number of Members: {project.number_of_members}</p>
                                <p>Members: {project.members}</p>
                                <p>Active: {project.active ? 'Yes' : 'No'}</p>
                                <p>Categories: {Object.values(project.categories).filter(category => category)}</p>
                                <p>Date: {project.date}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Account deactivated</p>
            )}
        </div>
    );      
};


export default PublicProfile;